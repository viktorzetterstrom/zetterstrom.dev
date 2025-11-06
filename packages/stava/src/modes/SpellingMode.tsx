import confetti from "canvas-confetti"
import { useEffect, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"

type GameState = "input" | "playing" | "word-complete"

interface SpellingModeProps {
  onBack: () => void
}

export const SpellingMode = ({ onBack }: SpellingModeProps) => {
  const [gameState, setGameState] = useState<GameState>("input")
  const [words, setWords] = useState<string[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const [shake, setShake] = useState(false)

  const currentWord = words[currentWordIndex]?.toUpperCase() || ""
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const triggerConfetti = () => {
    const duration = 2000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#a855f7", "#ec4899", "#3b82f6", "#10b981"],
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#a855f7", "#ec4899", "#3b82f6", "#10b981"],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()
  }

  useEffect(() => {
    if (gameState !== "playing") return

    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase()
      const expectedLetter = currentWord[currentLetterIndex]

      if (!/^[A-Z]$/.test(key)) return

      if (key === expectedLetter) {
        const nextIndex = currentLetterIndex + 1

        if (nextIndex >= currentWord.length) {
          setGameState("word-complete")
          triggerConfetti()

          setTimeout(() => {
            if (currentWordIndex + 1 < words.length) {
              setCurrentWordIndex(currentWordIndex + 1)
              setCurrentLetterIndex(0)
              setGameState("playing")
            } else {
              setWords([])
              setCurrentWordIndex(0)
              setCurrentLetterIndex(0)
              setGameState("input")
            }
          }, 2000)
        } else {
          setCurrentLetterIndex(nextIndex)
        }
      } else {
        setShake(true)
        setTimeout(() => setShake(false), 500)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [gameState, currentWord, currentLetterIndex, currentWordIndex, words.length])

  const handleStartGame = () => {
    const wordList = inputValue
      .split(/[\n,]+/)
      .map((w) => w.trim())
      .filter((w) => w.length > 0)

    if (wordList.length > 0) {
      setWords(wordList)
      setCurrentWordIndex(0)
      setCurrentLetterIndex(0)
      setGameState("playing")
      setInputValue("")
    }
  }

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleStartGame()
    }
  }

  if (gameState === "input") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-8">
        <div className="w-full max-w-2xl">
          <div className="mb-8 flex items-center justify-between">
            <button onClick={onBack} className="text-xl font-semibold text-white hover:underline">
              ← Tillbaka
            </button>
            <h1 className="text-center text-6xl font-bold text-white drop-shadow-lg">Stava</h1>
            <div className="w-48"></div>
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-2xl">
            <label className="mb-4 block text-2xl font-semibold text-purple-600">
              Skriv in ord att öva på:
            </label>
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyPress}
              placeholder="Skriv in ord (ett per rad eller kommaseparerat)"
              className="h-64 w-full resize-none rounded-xl border-4 border-purple-200 p-4 font-mono text-2xl focus:border-purple-400 focus:outline-none"
            />
            <button
              onClick={handleStartGame}
              className="mt-6 w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-12 py-6 text-3xl font-bold text-white shadow-lg transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              disabled={inputValue.trim().length === 0}
            >
              Starta spelet
            </button>
            <p className="mt-4 text-center text-gray-500">Tips: Tryck Ctrl+Enter för att starta</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-8">
      <div className="mb-8 text-center">
        <div className="text-2xl font-semibold text-white drop-shadow">
          Ord {currentWordIndex + 1} av {words.length}
        </div>
      </div>

      <div className={`transition-transform ${shake ? "animate-shake" : ""}`}>
        <div className="mb-8 flex gap-4">
          {currentWord.split("").map((letter, index) => {
            const isComplete = index < currentLetterIndex
            const isCurrent = index === currentLetterIndex
            const isPending = index > currentLetterIndex

            return (
              <div
                key={index}
                className={twMerge(
                  "flex h-32 w-24 items-center justify-center rounded-2xl text-6xl font-bold shadow-2xl transition-all duration-300",
                  isComplete && "scale-95 bg-green-500 text-white",
                  isCurrent && "scale-110 bg-white text-purple-600 ring-8 ring-yellow-400",
                  isPending && "bg-white text-gray-300",
                  gameState === "word-complete" && "animate-bounce bg-green-500 text-white",
                )}
              >
                {letter}
              </div>
            )
          })}
        </div>
      </div>

      {gameState === "word-complete" && (
        <div className="animate-bounce text-6xl font-bold text-white drop-shadow-lg">
          Bra jobbat!
        </div>
      )}

      {gameState === "playing" && (
        <div className="mt-8 text-center text-2xl font-semibold text-white drop-shadow">
          Skriv bokstäverna på tangentbordet
        </div>
      )}
    </div>
  )
}
