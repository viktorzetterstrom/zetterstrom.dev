import { useState, useEffect, useRef } from "react"
import confetti from "canvas-confetti"
import { twMerge } from "tailwind-merge"

type GameMode = "spelling" | "pronunciation"
type GameState = "input" | "playing" | "word-complete"

function App() {
  const [gameMode, setGameMode] = useState<GameMode | null>(null)
  const [gameState, setGameState] = useState<GameState>("input")
  const [words, setWords] = useState<string[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const [shake, setShake] = useState(false)

  const currentWord = words[currentWordIndex]?.toUpperCase() || ""
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Swedish alphabet including special characters
  const swedishAlphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Å", "Ä", "Ö"]

  const getAudioFileName = (letter: string): string => {
    if (letter === "Å") return "AU"
    if (letter === "Ä") return "AE"
    if (letter === "Ö") return "EU"
    return letter
  }

  const playLetterAudio = (letter: string) => {
    const fileName = getAudioFileName(letter)
    if (audioRef.current) {
      audioRef.current.pause()
    }
    audioRef.current = new Audio(`/audio/${fileName}.m4a`)
    audioRef.current.play().catch(err => console.error("Error playing audio:", err))
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
    if (gameMode !== "spelling") return

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

  if (gameState === "input" && gameMode === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <h1 className="text-6xl font-bold text-white text-center mb-8 drop-shadow-lg">Stava</h1>
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">Välj spelläge</h2>
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => setGameMode("spelling")}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-3xl font-bold py-8 px-12 rounded-2xl hover:scale-105 transition-transform shadow-lg"
              >
                Stavningsövning
              </button>
              <button
                onClick={() => setGameMode("pronunciation")}
                className="bg-gradient-to-r from-blue-500 to-green-500 text-white text-3xl font-bold py-8 px-12 rounded-2xl hover:scale-105 transition-transform shadow-lg"
              >
                Bokstavsuttal
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (gameState === "input" && gameMode === "spelling") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setGameMode(null)}
              className="text-white text-xl font-semibold hover:underline"
            >
              ← Tillbaka till valet
            </button>
            <h1 className="text-6xl font-bold text-white text-center drop-shadow-lg">Stava</h1>
            <div className="w-48"></div>
          </div>
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <label className="block text-2xl font-semibold text-purple-600 mb-4">
              Skriv in ord att öva på:
            </label>
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyPress}
              placeholder="Skriv in ord (ett per rad eller kommaseparerat)&#10;Exempel:&#10;KATT&#10;HUND&#10;HUS"
              className="w-full h-64 text-2xl p-4 border-4 border-purple-200 rounded-xl focus:border-purple-400 focus:outline-none resize-none font-mono"
            />
            <button
              onClick={handleStartGame}
              className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-3xl font-bold py-6 px-12 rounded-full hover:scale-105 transition-transform shadow-lg disabled:opacity-50 disabled:hover:scale-100"
              disabled={inputValue.trim().length === 0}
            >
              Starta spelet
            </button>
            <p className="text-center text-gray-500 mt-4">Tips: Tryck Ctrl+Enter för att starta</p>
          </div>
        </div>
      </div>
    )
  }

  if (gameState === "input" && gameMode === "pronunciation") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-8 flex flex-col items-center justify-center">
        <div className="max-w-5xl w-full">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setGameMode(null)}
              className="text-white text-xl font-semibold hover:underline"
            >
              ← Tillbaka till valet
            </button>
            <h1 className="text-6xl font-bold text-white text-center drop-shadow-lg">Bokstavsuttal</h1>
            <div className="w-48"></div>
          </div>
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <p className="text-2xl text-center text-purple-600 mb-6 font-semibold">Klicka på en bokstav för att höra hur den uttalas</p>
            <div className="grid grid-cols-7 gap-4">
              {swedishAlphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => playLetterAudio(letter)}
                  className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-4xl font-bold py-8 rounded-2xl hover:scale-110 hover:shadow-2xl transition-all duration-200 active:scale-95"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-8 flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <div className="text-white text-2xl font-semibold drop-shadow">
          Ord {currentWordIndex + 1} av {words.length}
        </div>
      </div>

      <div className={`transition-transform ${shake ? "animate-shake" : ""}`}>
        <div className="flex gap-4 mb-8">
          {currentWord.split("").map((letter, index) => {
            const isComplete = index < currentLetterIndex
            const isCurrent = index === currentLetterIndex
            const isPending = index > currentLetterIndex

            return (
              <div
                key={index}
                className={twMerge(
                  "w-24 h-32 rounded-2xl shadow-2xl flex items-center justify-center text-6xl font-bold transition-all duration-300",
                  isComplete && "bg-green-500 text-white scale-95",
                  isCurrent && "bg-white text-purple-600 ring-8 ring-yellow-400 scale-110",
                  isPending && "bg-white text-gray-300",
                  gameState === "word-complete" && "bg-green-500 text-white animate-bounce",
                )}
              >
                {letter}
              </div>
            )
          })}
        </div>
      </div>

      {gameState === "word-complete" && (
        <div className="text-6xl font-bold text-white drop-shadow-lg animate-bounce">
          Bra jobbat!
        </div>
      )}

      {gameState === "playing" && (
        <div className="text-2xl text-white font-semibold drop-shadow text-center mt-8">
          Skriv bokstäverna på tangentbordet
        </div>
      )}
    </div>
  )
}

export default App
