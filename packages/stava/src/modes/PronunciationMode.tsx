import { useEffect } from "react"
import { LetterGrid } from "../components/LetterGrid"
import { PageLayout } from "../components/PageLayout"
import { SWEDISH_ALPHABET } from "../constants/alphabet"
import { useAudio } from "../hooks/useAudio"

interface PronunciationModeProps {
  onBack: () => void
}

export const PronunciationMode = ({ onBack }: PronunciationModeProps) => {
  const { playLetterAudio } = useAudio()

  useEffect(() => {
    const handlePronunciationKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase()

      // Check if it's a valid Swedish alphabet letter
      if (SWEDISH_ALPHABET.includes(key as any)) {
        playLetterAudio(key)
      }
    }

    window.addEventListener("keydown", handlePronunciationKeyPress)
    return () => window.removeEventListener("keydown", handlePronunciationKeyPress)
  }, [playLetterAudio])

  return (
    <PageLayout title="Bokstavsuttal" onBack={onBack}>
      <div className="rounded-3xl bg-white p-8 shadow-2xl">
        <p className="mb-6 text-center text-2xl font-semibold text-purple-600">
          Klicka på en bokstav eller tryck på tangentbordet för att höra hur den uttalas
        </p>
        <LetterGrid
          onLetterClick={playLetterAudio}
          buttonColorFrom="purple-400"
          buttonColorTo="pink-400"
        />
      </div>
    </PageLayout>
  )
}
