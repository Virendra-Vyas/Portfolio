"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import type { ContactForm as Copy } from "@/content/schema";
import styles from "./ContactForm.module.css";

type Field = "name" | "email" | "message";
type FieldErrors = Partial<Record<Field, string>>;
type Service = "checking" | "ready" | "unreachable";
type Outcome =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "invalid"; errors: FieldErrors }
  | { kind: "rateLimited" }
  | { kind: "failed" };

// Free hosting can take up to a minute to wake, so allow for it on both calls.
const WAKE_TIMEOUT_MS = 70_000;

type ContactFormProps = { copy: Copy; apiUrl: string; email: string };

export function ContactForm({ copy, apiUrl, email }: ContactFormProps) {
  const [service, setService] = useState<Service>("checking");
  const [outcome, setOutcome] = useState<Outcome>({ kind: "idle" });
  const [values, setValues] = useState({ name: "", email: "", message: "", website: "" });
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const id = useId();

  // Wake the API as soon as the page opens, so it is ready by the time the message is written.
  useEffect(() => {
    let left = false;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), WAKE_TIMEOUT_MS);
    fetch(`${apiUrl}/health`, { signal: controller.signal })
      .then((response) => !left && setService(response.ok ? "ready" : "unreachable"))
      .catch(() => !left && setService("unreachable"))
      .finally(() => clearTimeout(timer));
    return () => {
      left = true;
      clearTimeout(timer);
      controller.abort();
    };
  }, [apiUrl]);

  useEffect(() => {
    if (outcome.kind === "invalid") summaryRef.current?.focus();
    if (outcome.kind === "sent" || outcome.kind === "failed" || outcome.kind === "rateLimited") resultRef.current?.focus();
  }, [outcome]);

  const errors = outcome.kind === "invalid" ? outcome.errors : {};
  const mailto = `mailto:${email}?subject=${encodeURIComponent(copy.fallbackSubject)}&body=${encodeURIComponent(
    values.message ? `${values.message}\n\n${values.name}` : "",
  )}`;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOutcome({ kind: "sending" });
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), WAKE_TIMEOUT_MS);
    try {
      const response = await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        signal: controller.signal,
      });
      if (response.status === 202) {
        setOutcome({ kind: "sent" });
        return;
      }
      if (response.status === 400) {
        // ASP.NET Core validation problem details: { errors: { field: [message] } }.
        const problem = (await response.json()) as { errors?: Record<string, string[]> };
        const fieldErrors: FieldErrors = {};
        for (const field of ["name", "email", "message"] as const) {
          const message = problem.errors?.[field]?.[0];
          if (message) fieldErrors[field] = message;
        }
        setOutcome(Object.keys(fieldErrors).length ? { kind: "invalid", errors: fieldErrors } : { kind: "failed" });
        return;
      }
      setOutcome(response.status === 429 ? { kind: "rateLimited" } : { kind: "failed" });
    } catch {
      setOutcome({ kind: "failed" });
    } finally {
      clearTimeout(timer);
    }
  }

  if (outcome.kind === "sent") {
    return (
      <div className={styles.sent} ref={resultRef} tabIndex={-1} role="status">
        <h3 className={styles.sentHeading}>{copy.sent.heading}</h3>
        <p>{copy.sent.body}</p>
      </div>
    );
  }

  const field = (name: Field) => ({
    id: `${id}-${name}`,
    name,
    value: values[name],
    onChange: (event: { target: { value: string } }) => setValues((current) => ({ ...current, [name]: event.target.value })),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": [errors[name] ? `${id}-${name}-error` : "", name !== "name" ? `${id}-${name}-hint` : ""]
      .filter(Boolean)
      .join(" ") || undefined,
  });

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      {outcome.kind === "invalid" ? (
        <div className={styles.summary} ref={summaryRef} tabIndex={-1} role="alert">
          <p>{copy.errorSummary}</p>
          <ul>
            {(Object.entries(errors) as [Field, string][]).map(([name, message]) => (
              <li key={name}>
                <a href={`#${id}-${name}`}>{message}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className={styles.field}>
        <label htmlFor={`${id}-name`}>{copy.fields.name}</label>
        {errors.name ? <p id={`${id}-name-error`} className={styles.error}>{errors.name}</p> : null}
        <input type="text" autoComplete="name" maxLength={100} required {...field("name")} />
      </div>

      <div className={styles.field}>
        <label htmlFor={`${id}-email`}>{copy.fields.email}</label>
        <p id={`${id}-email-hint`} className={styles.hint}>{copy.hints.email}</p>
        {errors.email ? <p id={`${id}-email-error`} className={styles.error}>{errors.email}</p> : null}
        <input type="email" autoComplete="email" maxLength={254} required {...field("email")} />
      </div>

      <div className={styles.field}>
        <label htmlFor={`${id}-message`}>{copy.fields.message}</label>
        <p id={`${id}-message-hint`} className={styles.hint}>{copy.hints.message}</p>
        {errors.message ? <p id={`${id}-message-error`} className={styles.error}>{errors.message}</p> : null}
        <textarea rows={7} maxLength={5000} required {...field("message")} />
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots that fill it are dropped by the API. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={`${id}-website`}>{copy.fields.honeypot}</label>
        <input
          id={`${id}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => setValues((current) => ({ ...current, website: event.target.value }))}
        />
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.submit} disabled={outcome.kind === "sending"}>
          {outcome.kind === "sending" ? copy.sending : copy.submit}
        </button>
        <p className={`${styles.service} ${styles[service]}`}>{copy.service[service]}</p>
      </div>

      {outcome.kind === "failed" || outcome.kind === "rateLimited" ? (
        <div className={styles.problem} ref={resultRef} tabIndex={-1} role="alert">
          <p>{outcome.kind === "failed" ? copy.failed : copy.rateLimited}</p>
          <a href={mailto} className={styles.fallback}>
            {copy.fallbackLink}
          </a>
        </div>
      ) : null}

      <p className={styles.privacy}>{copy.privacy}</p>
    </form>
  );
}
