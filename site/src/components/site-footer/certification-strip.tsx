export type CertificationRecord = {
  id: string
  displayName: string
  issuer: string
  holder: string
  scope: string
  evidenceRef: string
  approvedForPublic: boolean
  validUntil?: string
  evidenceUrl?: string
  mark?: { src: string; width: number; height: number; rightsRef: string }
}

function isPublicCertification(record: CertificationRecord, applicableScope: string): boolean {
  if (!record.approvedForPublic || !record.displayName.trim() || !record.issuer.trim() ||
    !record.holder.trim() || !record.evidenceRef.trim() || record.scope !== applicableScope) return false
  if (record.validUntil && (!Number.isFinite(Date.parse(record.validUntil)) || Date.parse(record.validUntil) < Date.now())) return false
  if (record.mark && (!record.mark.rightsRef.trim() || !record.mark.src || record.mark.width <= 0 || record.mark.height <= 0)) return false
  return true
}

function approvedEvidenceUrl(value?: string): string | null {
  if (!value) return null
  try {
    const url = new URL(value)
    return url.protocol === 'https:' ? url.href : null
  } catch {
    return null
  }
}

export function CertificationStrip({ records, renderMode, applicableScope = 'site' }: {
  records: readonly CertificationRecord[]
  renderMode: 'preview' | 'public'
  applicableScope?: string
}) {
  const publicRecords = records.filter((record) => isPublicCertification(record, applicableScope))
  if (!publicRecords.length && renderMode === 'public') return null

  return (
    <section aria-label="Certifications" className="border-t border-card/20">
      <div className="mx-auto w-full max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
        {publicRecords.length ? (
          <ul className="flex flex-wrap gap-8">
            {publicRecords.map((record) => {
              const evidenceUrl = approvedEvidenceUrl(record.evidenceUrl)
              return (
                <li key={record.id} className="max-w-sm text-sm leading-6">
                  {record.mark ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={record.mark.src} width={record.mark.width} height={record.mark.height} alt="" loading="lazy" className="mb-3 max-h-12 w-auto" />
                  ) : null}
                  <strong className="block font-semibold">{record.displayName}</strong>
                  <span className="block text-card/85">{record.issuer} · {record.holder} · {record.scope}</span>
                  {evidenceUrl ? <a href={evidenceUrl} target="_blank" rel="noopener noreferrer" className="inline-block rounded-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-card">View evidence</a> : null}
                </li>
              )
            })}
          </ul>
        ) : <p className="text-sm text-card/85">Pending verification — preview only</p>}
      </div>
    </section>
  )
}
