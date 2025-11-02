import { useEffect } from "react"
import { PageLayout } from "../components/PageLayout"
import { LetterGrid } from "../components/LetterGrid"
import { useAudio } from "../hooks/useAudio"
import { SWEDISH_ALPHABET } from "../constants/alphabet"

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
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <p className="text-2xl text-center text-purple-600 mb-6 font-semibold">
          Klicka på en bokstav eller tryck på tangentbordet för att höra hur den uttalas
        </p>
        <LetterGrid onLetterClick={playLetterAudio} buttonColorFrom="purple-400" buttonColorTo="pink-400" />
      </div>
    </PageLayout>
  )
}
