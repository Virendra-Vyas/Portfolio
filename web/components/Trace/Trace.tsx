"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import Link from "next/link";
import type { HomePage } from "@/content/schema";
import { kindLabels, monthName, type SpanKind, type Trace as TraceData } from "@/lib/trace";
import styles from "./Trace.module.css";

type TraceProps = {
  trace: TraceData;
  copy: HomePage["trace"];
  /** The span shown in the detail panel before anyone picks one. */
  initialId: string;
};

const KINDS: SpanKind[] = ["employment", "company", "freelance"];

/**
 * The career drawn as a request trace: one span per role on a shared month axis. Rows are buttons
 * that open the role's details below; the hover crosshair (a pointer-only extra) reads out the month
 * and which roles were running then. Everything it shows is also in the rows and the detail panel.
 */
export function Trace({ trace, copy, initialId }: TraceProps) {
  const [selectedId, setSelectedId] = useState(initialId);
  const [hover, setHover] = useState<{ month: number; x: number } | null>(null);
  const trackRef = useRef<HTMLSpanElement>(null);

  const selected = trace.spans.find((span) => span.id === selectedId) ?? trace.spans[0];
  const lastMonth = trace.months - 2;
  const pct = (month: number) => `${(month / trace.months) * 100}%`;

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const track = trackRef.current?.getBoundingClientRect();
    if (!track || event.pointerType === "touch") return;
    const ratio = (event.clientX - track.left) / track.width;
    if (ratio < 0 || ratio > 1) {
      setHover(null);
      return;
    }
    const month = Math.min(lastMonth, Math.floor(ratio * trace.months));
    setHover({ month, x: ((month + 0.5) / trace.months) * 100 });
  }

  const running = hover ? trace.spans.filter((span) => span.start <= hover.month && hover.month < span.end) : [];

  return (
    <figure className={styles.trace} aria-labelledby="trace-heading">
      <figcaption className={styles.head}>
        <div>
          <h2 id="trace-heading" className={styles.heading}>
            {copy.heading}
          </h2>
          <p className={styles.caption}>{copy.caption}</p>
        </div>
        <ul className={styles.legend} aria-label={copy.legendLabel}>
          {KINDS.map((kind) => (
            <li key={kind} className={styles[kind]}>
              <span className={styles.swatch} aria-hidden="true" />
              {kindLabels[kind]}
            </li>
          ))}
        </ul>
      </figcaption>

      <div
        className={styles.chart}
        style={{ "--months": trace.months } as CSSProperties}
        onPointerMove={onPointerMove}
        onPointerLeave={() => setHover(null)}
      >
        <div className={styles.axis} aria-hidden="true">
          <span className={styles.axisTrack}>
            {trace.years.map((year, index) => (
              <span key={year} className={styles.year} style={{ left: pct(index * 12) }}>
                {year}
              </span>
            ))}
          </span>
        </div>

        <ol className={styles.rows}>
          {trace.spans.map((span, index) => (
            <li key={span.id} style={{ "--i": index } as CSSProperties}>
              <button
                type="button"
                className={`${styles.row} ${styles[span.kind]}`}
                aria-pressed={span.id === selected.id}
                aria-controls="trace-detail"
                onClick={() => setSelectedId(span.id)}
              >
                <span className={styles.label}>
                  <span className={styles.org}>{span.organisation}</span>
                  <span className={styles.role}>{span.role}</span>
                </span>
                <span className={styles.duration}>
                  <span className={styles.visuallyHidden}>
                    {kindLabels[span.kind]}, {span.period},{" "}
                  </span>
                  <span aria-hidden="true">{span.durationShort}</span>
                </span>
                <span className={styles.track} ref={index === 0 ? trackRef : undefined} aria-hidden="true">
                  <span
                    className={`${styles.bar} ${span.current ? styles.current : ""}`}
                    style={{ left: pct(span.start), width: pct(span.end - span.start) }}
                  />
                </span>
              </button>
            </li>
          ))}
        </ol>

        {hover ? (
          <div className={styles.crosshair} style={{ "--x": hover.x / 100 } as CSSProperties} aria-hidden="true">
            <span className={`${styles.readout} ${hover.x > 60 ? styles.flip : ""}`}>
              <strong>{monthName(hover.month, trace.originYear)}</strong>
              {running.length === 0 ? (
                <span>{copy.gapNote}</span>
              ) : (
                running.map((span) => (
                  <span key={span.id} className={styles[span.kind]}>
                    <span className={styles.swatch} />
                    {span.organisation}
                  </span>
                ))
              )}
            </span>
          </div>
        ) : null}
      </div>

      <div id="trace-detail" className={`${styles.detail} ${styles[selected.kind]}`} aria-live="polite">
        <div className={styles.detailHead}>
          <p className={styles.detailKind}>
            <span className={styles.swatch} aria-hidden="true" />
            {kindLabels[selected.kind]}
          </p>
          <h3 className={styles.detailTitle}>
            {selected.role}, {selected.organisation}
          </h3>
        </div>
        <dl className={styles.detailFacts}>
          <div>
            <dt>{copy.periodLabel}</dt>
            <dd>{selected.period}</dd>
          </div>
          <div>
            <dt>{copy.durationLabel}</dt>
            <dd>{selected.current ? `${selected.duration} ${copy.soFar}` : selected.duration}</dd>
          </div>
        </dl>
        <p className={styles.detailSummary}>{selected.summary}</p>
        {selected.caseStudy ? (
          <Link href={selected.caseStudy} className={styles.detailLink}>
            {copy.caseStudyLink}
          </Link>
        ) : null}
      </div>
    </figure>
  );
}
