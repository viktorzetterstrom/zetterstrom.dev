import { ReactNode } from "react"

interface PageLayoutProps {
  title: string
  onBack: () => void
  gradientFrom?: string
  gradientVia?: string
  gradientTo?: string
  maxWidth?: "2xl" | "5xl"
  children: ReactNode
}

export const PageLayout = ({
  title,
  onBack,
  gradientFrom = "blue-400",
  gradientVia = "purple-400",
  gradientTo = "pink-400",
  maxWidth = "5xl",
  children,
}: PageLayoutProps) => {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-${gradientFrom} via-${gradientVia} to-${gradientTo} flex flex-col items-center justify-center p-8`}
    >
      <div className={`max-w-${maxWidth} w-full`}>
        <div className="mb-8 flex items-center justify-between">
          <button onClick={onBack} className="text-xl font-semibold text-white hover:underline">
            ← Tillbaka
          </button>
          <h1 className="text-center text-6xl font-bold text-white drop-shadow-lg">{title}</h1>
          <div className="w-48"></div>
        </div>
        {children}
      </div>
    </div>
  )
}
