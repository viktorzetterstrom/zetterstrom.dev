import { useState, useEffect, useRef } from "react"
import confetti from "canvas-confetti"

type GameState = "input" | "playing" | "word-complete"

function App() {
  const [gameState, setGameState] = useState<GameState>("input")
  const [words, setWords] = useState<string[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const [shake, setShake] = useState(false)

  const currentWord = words[currentWordIndex]?.toUpperCase() || ""
  const inputRef = useRef<HTMLTextAreaElement>(null)

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
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <h1 className="text-6xl font-bold text-white text-center mb-8 drop-shadow-lg">Stava</h1>
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <label className="block text-2xl font-semibold text-purple-600 mb-4">
              Enter words to practice:
            </label>
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyPress}
              placeholder="Enter words (one per line or comma-separated)&#10;Example:&#10;CAT&#10;DOG&#10;HOUSE"
              className="w-full h-64 text-2xl p-4 border-4 border-purple-200 rounded-xl focus:border-purple-400 focus:outline-none resize-none font-mono"
            />
            <button
              onClick={handleStartGame}
              className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-3xl font-bold py-6 px-12 rounded-full hover:scale-105 transition-transform shadow-lg disabled:opacity-50 disabled:hover:scale-100"
              disabled={inputValue.trim().length === 0}
            >
              Start Game
            </button>
            <p className="text-center text-gray-500 mt-4">Tip: Press Ctrl+Enter to start</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-8 flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <div className="text-white text-2xl font-semibold drop-shadow">
          Word {currentWordIndex + 1} of {words.length}
        </div>
      </div>

      <div className={`transition-transform ${shake ? "animate-shake" : ""}`}>
        <div className="flex gap-3 mb-8">
          {currentWord.split("").map((letter, index) => {
            const isComplete = index < currentLetterIndex
            const isCurrent = index === currentLetterIndex
            const isPending = index > currentLetterIndex

            return (
              <div
                key={index}
                className={`
                  w-24 h-32 rounded-2xl shadow-2xl flex items-center justify-center text-6xl font-bold
                  transition-all duration-300
                  ${isComplete ? "bg-green-500 text-white scale-95" : ""}
                  ${isCurrent ? "bg-white text-purple-600 ring-8 ring-yellow-400 scale-110" : ""}
                  ${isPending ? "bg-white text-gray-300" : ""}
                  ${gameState === "word-complete" ? "bg-green-500 text-white animate-bounce" : ""}
                `}
              >
                {letter}
              </div>
            )
          })}
        </div>
      </div>

      {gameState === "word-complete" && (
        <div className="text-6xl font-bold text-white drop-shadow-lg animate-bounce">
          Great job!
        </div>
      )}

      {gameState === "playing" && (
        <div className="text-2xl text-white font-semibold drop-shadow text-center mt-8">
          Type the letters on your keyboard
        </div>
      )}
    </div>
  )
}

export default App
