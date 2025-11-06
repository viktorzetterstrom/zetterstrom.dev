import { SWEDISH_ALPHABET } from "../constants/alphabet"

interface LetterGridProps {
  onLetterClick: (letter: string) => void
  buttonColorFrom?: string
  buttonColorTo?: string
}

export const LetterGrid = ({
  onLetterClick,
  buttonColorFrom = "purple-400",
  buttonColorTo = "pink-400",
}: LetterGridProps) => {
  return (
    <div className="grid grid-cols-7 gap-4">
      {SWEDISH_ALPHABET.map((letter) => (
        <button
          key={letter}
          onClick={() => onLetterClick(letter)}
          className={`bg-gradient-to-br from-${buttonColorFrom} to-${buttonColorTo} rounded-2xl py-8 text-4xl font-bold text-white transition-all duration-200 hover:scale-110 hover:shadow-2xl active:scale-95`}
        >
          {letter}
        </button>
      ))}
    </div>
  )
}
