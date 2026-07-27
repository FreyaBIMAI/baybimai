"use client";

import { useMemo, useState } from "react";
import type { RadarEvent, RadarFilter } from "./radar-content";
import styles from "./radar.module.css";

type FilterCopy = Record<RadarFilter, string>;

export default function EventFilter({
  items,
  filters,
  confirmed,
  watch,
  official,
  empty,
}: {
  items: readonly RadarEvent[];
  filters: FilterCopy;
  confirmed: string;
  watch: string;
  official: string;
  empty: string;
}) {
  const [active, setActive] = useState<RadarFilter>("all");
  const visibleItems = useMemo(
    () =>
      active === "all"
        ? items
        : items.filter(
            (item) =>
              item.filter === active || item.secondaryFilter === active,
          ),
    [active, items],
  );

  return (
    <>
      <div className={styles.filters} aria-label="Event filters">
        {(Object.keys(filters) as RadarFilter[]).map((filter) => (
          <button
            key={filter}
            type="button"
            aria-pressed={active === filter}
            onClick={() => setActive(filter)}
          >
            {filters[filter]}
            <span>
              {filter === "all"
                ? items.length
                : items.filter(
                    (item) =>
                      item.filter === filter ||
                      item.secondaryFilter === filter,
                  ).length}
            </span>
          </button>
        ))}
      </div>

      {visibleItems.length > 0 ? (
        <div className={styles.eventGrid} aria-live="polite">
          {visibleItems.map((item) => (
            <article className={styles.eventCard} key={item.id}>
              <div className={styles.eventTop}>
                <p>{item.organizer}</p>
                <span data-status={item.status}>
                  {item.status === "confirmed" ? confirmed : watch}
                </span>
              </div>
              <p className={styles.eventDate}>{item.date}</p>
              <h3>{item.title}</h3>
              <p className={styles.eventLocation}>{item.location}</p>
              <p className={styles.eventSummary}>{item.summary}</p>
              <ul className={styles.tags} aria-label="Topics">
                {item.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <a
                className={styles.textLink}
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                {official}
                <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      ) : (
        <p className={styles.empty} aria-live="polite">
          {empty}
        </p>
      )}
    </>
  );
}

