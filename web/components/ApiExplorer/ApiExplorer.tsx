"use client";

import { useId, useState, useSyncExternalStore } from "react";
import type { ApiPageCopy } from "@/content/schema";
import styles from "./ApiExplorer.module.css";

export type ExplorerOperation = {
  operationId: string;
  path: string;
  summary: string;
  description: string;
};

type Result =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "error" }
  | { state: "done"; status: number; statusText: string; ms: number; type: string; bytes: number; body: string };

function Endpoint({
  operation,
  slugs,
  labels,
  origin,
}: {
  operation: ExplorerOperation;
  slugs: string[];
  labels: ApiPageCopy["labels"];
  origin: string;
}) {
  const templated = operation.path.includes("{slug}");
  const [slug, setSlug] = useState(slugs[0] ?? "");
  const [result, setResult] = useState<Result>({ state: "idle" });
  const [copied, setCopied] = useState(false);
  const selectId = useId();
  const path = templated ? operation.path.replace("{slug}", slug) : operation.path;
  const curl = `curl -s ${origin}${path}`;

  async function send() {
    setResult({ state: "loading" });
    const started = performance.now();
    try {
      const response = await fetch(path, { headers: { Accept: "application/json" } });
      const text = await response.text();
      const ms = Math.round(performance.now() - started);
      let body = text;
      try {
        body = JSON.stringify(JSON.parse(text), null, 2);
      } catch {
        // Not JSON: show as returned.
      }
      setResult({
        state: "done",
        status: response.status,
        statusText: response.statusText || (response.ok ? "OK" : ""),
        ms,
        type: response.headers.get("content-type") ?? "unknown",
        bytes: new Blob([text]).size,
        body,
      });
    } catch {
      setResult({ state: "error" });
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(curl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard blocked: the command is still visible to select by hand.
    }
  }

  return (
    <li className={styles.endpoint}>
      <div className={styles.head}>
        <span className={styles.method}>GET</span>
        <code className={styles.path}>{operation.path}</code>
      </div>
      <h3 className={styles.summary}>{operation.summary}</h3>
      <p className={styles.description}>{operation.description}</p>

      <div className={styles.controls}>
        {templated ? (
          <label className={styles.select} htmlFor={selectId}>
            <span>{labels.caseStudy}</span>
            <select id={selectId} value={slug} onChange={(event) => setSlug(event.target.value)}>
              {slugs.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        <button type="button" className={styles.send} onClick={send} disabled={result.state === "loading"}>
          {result.state === "loading" ? labels.sending : labels.send}
        </button>
        <button type="button" className={styles.copy} onClick={copy}>
          {copied ? labels.copied : labels.copy}
        </button>
      </div>

      <pre className={styles.curl} tabIndex={0} aria-label={`curl: ${path}`}>
        <code>{curl}</code>
      </pre>

      <div aria-live="polite">
        {result.state === "error" ? <p className={styles.error}>{labels.error}</p> : null}
        {result.state === "done" ? (
          <div className={styles.response}>
            <p className={styles.status}>
              <span className={result.status < 400 ? styles.ok : styles.bad}>
                {result.status} {result.statusText}
              </span>
              <span>{result.ms} ms</span>
              <span>{result.type}</span>
              <span>{(result.bytes / 1024).toFixed(1)} KB</span>
            </p>
            <pre className={styles.body} tabIndex={0} aria-label={`${labels.response}: ${path}`}>
              <code>{result.body}</code>
            </pre>
          </div>
        ) : null}
      </div>
    </li>
  );
}

const noopSubscribe = () => () => {};

export function ApiExplorer({
  operations,
  slugs,
  labels,
}: {
  operations: ExplorerOperation[];
  slugs: string[];
  labels: ApiPageCopy["labels"];
}) {
  // The origin is only known in the browser; the static HTML shows a relative path until hydration.
  const origin = useSyncExternalStore(
    noopSubscribe,
    () => window.location.origin,
    () => "",
  );

  return (
    <ul className={styles.list}>
      {operations.map((operation) => (
        <Endpoint key={operation.operationId} operation={operation} slugs={slugs} labels={labels} origin={origin} />
      ))}
    </ul>
  );
}
