// Contract test for the static JSON API. Run after `next build`.
// Validates every built response in out/api against the schema the OpenAPI document declares
// for its path, and fails if a documented path has no file or a file has no documented path.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const OUT = new URL("../out/", import.meta.url).pathname;
const read = (path) => JSON.parse(readFileSync(join(OUT, path), "utf8"));

const spec = read("api/openapi.json");
if (spec.openapi !== "3.1.0") throw new Error(`Unexpected OpenAPI version ${spec.openapi}`);

// OpenAPI 3.1 schemas are JSON Schema 2020-12; expose components as $defs so $refs resolve.
const rewrite = (value) =>
  JSON.parse(JSON.stringify(value).replaceAll("#/components/schemas/", "#/$defs/"));
const defs = rewrite(spec.components.schemas);

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}

// Expand templated paths ({slug}) using the parameter's enum.
const expected = new Map();
for (const [path, item] of Object.entries(spec.paths)) {
  const op = item.get;
  const schema = op.responses["200"].content["application/json"].schema;
  const param = op.parameters?.find((p) => p.in === "path");
  const concrete = param ? param.schema.enum.map((v) => path.replace(`{${param.name}}`, v)) : [path];
  for (const p of concrete) expected.set(p, { operationId: op.operationId, schema });
}

const built = new Set(
  files(join(OUT, "api/v1")).map((file) => `/${relative(OUT, file)}`),
);

let failures = 0;
const fail = (message) => {
  failures++;
  console.error(`✗ ${message}`);
};

for (const [path, { operationId, schema }] of expected) {
  if (!built.has(path)) {
    fail(`${path} (${operationId}) is documented but was not built`);
    continue;
  }
  const validate = ajv.compile({ ...rewrite(schema), $defs: defs });
  if (validate(read(path.slice(1)))) {
    console.log(`✓ ${path}`);
  } else {
    for (const error of validate.errors) fail(`${path} ${error.instancePath || "/"} ${error.message}`);
  }
}

for (const path of built) {
  if (!expected.has(path)) fail(`${path} was built but is not in the OpenAPI document`);
}

if (failures > 0) {
  console.error(`\n${failures} contract failure(s).`);
  process.exit(1);
}
console.log(`\nAll ${expected.size} responses match the OpenAPI document.`);
