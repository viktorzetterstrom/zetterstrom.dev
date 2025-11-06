import { useEffect } from "react"
import { LetterGrid } from "../components/LetterGrid"
import { PageLayout } from "../components/PageLayout"
import { SWEDISH_ALPHABET } from "../constants/alphabet"
import { useAudio } from "../hooks/useAudio"

interface MusicModeProps {
  onBack: () => void
}

export const MusicMode = ({ onBack }: MusicModeProps) => {
  const { playMusicalNote } = useAudio()

  useEffect(() => {
    const handleMusicKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase()

      // Check if it's a valid Swedish alphabet letter
      if (SWEDISH_ALPHABET.includes(key as any)) {
        playMusicalNote(key)
      }
    }

    window.addEventListener("keydown", handleMusicKeyPress)
    return () => window.removeEventListener("keydown", handleMusicKeyPress)
  }, [playMusicalNote])

  return (
    <PageLayout
      title="Musikläge"
      onBack={onBack}
      gradientFrom="orange-400"
      gradientVia="red-400"
      gradientTo="pink-400"
    >
      <div className="rounded-3xl bg-white p-8 shadow-2xl">
        <p className="mb-6 text-center text-2xl font-semibold text-orange-600">
          Klicka på en tangent eller tryck på tangentbordet för att spela musik!
        </p>
        <LetterGrid
          onLetterClick={playMusicalNote}
          buttonColorFrom="orange-400"
          buttonColorTo="red-400"
        />
      </div>
    </PageLayout>
  )
}
