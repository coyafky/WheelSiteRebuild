export type ContactMethod = {
  kind: 'phone' | 'email' | 'address'
  displayValue: string
  value: string
  evidenceRef: string
  approvedForPublic: boolean
  destination?: string
}

function publicDestination(method: ContactMethod): string | null {
  if (!method.approvedForPublic || !method.evidenceRef.trim() || !method.displayValue.trim()) return null

  if (method.kind === 'phone') {
    const number = method.value.replace(/[\s().-]/g, '')
    return /^\+?\d{5,15}$/.test(number) ? `tel:${number}` : null
  }
  if (method.kind === 'email') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(method.value) ? `mailto:${method.value}` : null
  }
  if (!method.destination) return ''
  try {
    const url = new URL(method.destination)
    return url.protocol === 'https:' ? url.href : null
  } catch {
    return null
  }
}

export function FooterContact({ methods }: { methods: readonly ContactMethod[] }) {
  const publicMethods = methods.flatMap((method) => {
    const href = publicDestination(method)
    return href === null ? [] : [{ method, href }]
  })
  if (!publicMethods.length) return null

  return (
    <section aria-labelledby="footer-contact" className="min-w-0">
      <h2 id="footer-contact" className="mb-5 text-base font-semibold">Contact</h2>
      <ul className="space-y-3">
        {publicMethods.map(({ method, href }) => (
          <li key={`${method.kind}:${method.value}`}>
            {href ? (
              <a href={href} className="inline-block max-w-full break-words rounded-sm text-sm leading-6 text-card/85 underline-offset-4 hover:text-card hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-card">
                {method.displayValue}
              </a>
            ) : <span className="break-words text-sm leading-6 text-card/85">{method.displayValue}</span>}
          </li>
        ))}
      </ul>
    </section>
  )
}
