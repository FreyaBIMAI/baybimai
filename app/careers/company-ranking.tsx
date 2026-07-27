"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { CompanyProfile } from "./careers-content";
import styles from "./careers.module.css";

type RankingCopy = {
  sortLabel: string;
  revenueSort: string;
  valuationSort: string;
  revenueMetric: string;
  valuationMetric: string;
  bayAreaSignal: string;
  targetRoles: string;
  hrFocus: string;
  careersCta: string;
  evidence: string;
  revenueSource: string;
  marketSource: string;
  presenceSource: string;
  visaFocus: string;
  visaSourceLabel: string;
  privateRank: string;
  asOf: string;
};

export default function CompanyRanking({
  companies,
  copy,
}: {
  companies: CompanyProfile[];
  copy: RankingCopy;
}) {
  const [sort, setSort] = useState<"revenue" | "valuation">("revenue");

  const sortedCompanies = useMemo(
    () =>
      [...companies].sort((a, b) => {
        if (sort === "revenue") {
          return b.revenueUsd - a.revenueUsd;
        }

        if (a.marketCapUsd === null && b.marketCapUsd === null) {
          return b.revenueUsd - a.revenueUsd;
        }
        if (a.marketCapUsd === null) return 1;
        if (b.marketCapUsd === null) return -1;
        return b.marketCapUsd - a.marketCapUsd;
      }),
    [companies, sort],
  );

  return (
    <>
      <div className={styles.sortBar}>
        <div
          className={styles.sortButtons}
          role="group"
          aria-label={copy.sortLabel}
        >
          <button
            type="button"
            aria-pressed={sort === "revenue"}
            onClick={() => setSort("revenue")}
          >
            {copy.revenueSort}
          </button>
          <button
            type="button"
            aria-pressed={sort === "valuation"}
            onClick={() => setSort("valuation")}
          >
            {copy.valuationSort}
          </button>
        </div>
        <p aria-live="polite">
          {sort === "revenue" ? copy.revenueSort : copy.valuationSort} ·{" "}
          {copy.asOf}
        </p>
      </div>

      <div className={styles.companyList}>
        {sortedCompanies.map((company, index) => {
          const hasPublicRank =
            sort === "revenue" || company.marketCapUsd !== null;
          const rank = hasPublicRank
            ? String(index + 1).padStart(2, "0")
            : "—";

          return (
            <article className={styles.companyCard} key={company.id}>
              <div className={styles.companyIdentity}>
                <span className={styles.rank} aria-label={`Rank ${rank}`}>
                  {rank}
                </span>
                <div className={styles.logoTile}>
                  <Image
                    src={company.icon}
                    alt=""
                    width={56}
                    height={56}
                    sizes="56px"
                  />
                </div>
                <div>
                  <p className={styles.companyType}>{company.type}</p>
                  <h3>{company.name}</h3>
                </div>
              </div>

              <div className={styles.metrics}>
                <div>
                  <span>{copy.revenueMetric}</span>
                  <strong>{company.revenue}</strong>
                  <small>{company.revenuePeriod}</small>
                </div>
                <div>
                  <span>{copy.valuationMetric}</span>
                  <strong>{company.valuation}</strong>
                  <small>
                    {company.marketCapUsd === null
                      ? copy.privateRank
                      : copy.asOf}
                  </small>
                </div>
              </div>

              <div className={styles.companyBody}>
                <p className={styles.summary}>{company.summary}</p>
                <div className={styles.signal}>
                  <span>{copy.bayAreaSignal}</span>
                  <p>{company.location}</p>
                </div>
                <div className={styles.roles}>
                  <span>{copy.targetRoles}</span>
                  <div>
                    {company.roles.map((role) => (
                      <span key={role}>{role}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.hrFocus}>
                  <span>{copy.hrFocus}</span>
                  <p>{company.hrFocus}</p>
                </div>
              </div>

              <div className={styles.companyActions}>
                <a
                  className={styles.careersLink}
                  href={company.careersUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {copy.careersCta}
                  <span aria-hidden="true">↗</span>
                </a>
                <details>
                  <summary>{copy.evidence}</summary>
                  <div>
                    <a
                      href={company.revenueSource}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {copy.revenueSource}
                    </a>
                    {company.marketSource ? (
                      <a
                        href={company.marketSource}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {copy.marketSource}
                      </a>
                    ) : null}
                    <a
                      href={company.presenceUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {copy.presenceSource}
                    </a>
                    {company.visaSummary ? (
                      <p className={styles.visaNote}>
                        <strong>{copy.visaFocus}</strong> {company.visaSummary}
                        {company.visaSource ? (
                          <>
                            {" "}
                            <a
                              href={company.visaSource}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {copy.visaSourceLabel}
                            </a>
                          </>
                        ) : null}
                      </p>
                    ) : null}
                  </div>
                </details>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
