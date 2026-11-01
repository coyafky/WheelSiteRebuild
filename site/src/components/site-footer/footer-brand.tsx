export type FooterBrandContent = {
  name: string
  evidenceRef: string
  approvedForPublic: boolean
}

export function FooterBrand({ renderMode, brand }: { renderMode: 'preview' | 'public'; brand?: FooterBrandContent }) {
  const approvedName = brand?.approvedForPublic && brand.evidenceRef.trim() && brand.name.trim()
    ? brand.name.trim() : null
  if (!approvedName && renderMode === 'public') return null

  return (
    <div className="mx-auto w-full max-w-[1500px] px-5 pt-12 sm:px-8 lg:px-10">
      <p className="text-lg font-semibold">{approvedName ?? 'Brand preview · pending approval'}</p>
    </div>
  )
}
