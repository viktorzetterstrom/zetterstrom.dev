const PlaceHolderImage: React.FC = () => {
  return (
    <div className="flex min-h-50 min-w-50 items-center justify-center rounded-3xl border border-sky-950 shadow-lg">
      placeholder
    </div>
  )
}

export const Images: React.FC = () => {
  const images = Array.from({ length: 10 })

  return (
    <div className="flex w-full gap-8 overflow-x-scroll overflow-y-hidden">
      {images.map(() => (
        <PlaceHolderImage />
      ))}
    </div>
  )
}
