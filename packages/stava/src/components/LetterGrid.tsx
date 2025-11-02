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
          className={`bg-gradient-to-br from-${buttonColorFrom} to-${buttonColorTo} text-white text-4xl font-bold py-8 rounded-2xl hover:scale-110 hover:shadow-2xl transition-all duration-200 active:scale-95`}
        >
          {letter}
        </button>
      ))}
    </div>
  )
}
