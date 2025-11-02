import { useState, useEffect, useRef } from "react"
import confetti from "canvas-confetti"
import { twMerge } from "tailwind-merge"

type GameMode = "spelling" | "pronunciation" | "music"
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
  const audioContextRef = useRef<AudioContext | null>(null)

  // Swedish alphabet including special characters
  const swedishAlphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "Å",
    "Ä",
    "Ö",
  ]

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
    audioRef.current.play().catch((err) => console.error("Error playing audio:", err))
  }

  // Music mode: Map letters to musical notes (chromatic scale starting from C4)
  const getFrequency = (letter: string): number => {
    const noteMap: { [key: string]: number } = {
      A: 261.63, // C4
      B: 277.18, // C#4
      C: 293.66, // D4
      D: 311.13, // D#4
      E: 329.63, // E4
      F: 349.23, // F4
      G: 369.99, // F#4
      H: 392.0, // G4
      I: 415.3, // G#4
      J: 440.0, // A4
      K: 466.16, // A#4
      L: 493.88, // B4
      M: 523.25, // C5
      N: 554.37, // C#5
      O: 587.33, // D5
      P: 622.25, // D#5
      Q: 659.25, // E5
      R: 698.46, // F5
      S: 739.99, // F#5
      T: 783.99, // G5
      U: 830.61, // G#5
      V: 880.0, // A5
      W: 932.33, // A#5
      X: 987.77, // B5
      Y: 1046.5, // C6
      Z: 1108.73, // C#6
      Å: 1174.66, // D6
      Ä: 1244.51, // D#6
      Ö: 1318.51, // E6
    }
    return noteMap[letter] || 440.0
  }

  const playMusicalNote = (letter: string) => {
    // Create AudioContext only once and reuse it
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    const audioContext = audioContextRef.current
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = getFrequency(letter)
    oscillator.type = "sine"

    // Envelope for smoother sound
    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
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

  // Music mode keyboard handler
  useEffect(() => {
    if (gameMode !== "music") return

    const handleMusicKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase()

      // Check if it's a valid Swedish alphabet letter
      if (swedishAlphabet.includes(key)) {
        playMusicalNote(key)
      }
    }

    window.addEventListener("keydown", handleMusicKeyPress)
    return () => window.removeEventListener("keydown", handleMusicKeyPress)
  }, [gameMode])

  // Pronunciation mode keyboard handler
  useEffect(() => {
    if (gameMode !== "pronunciation") return

    const handlePronunciationKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase()

      // Check if it's a valid Swedish alphabet letter
      if (swedishAlphabet.includes(key)) {
        playLetterAudio(key)
      }
    }

    window.addEventListener("keydown", handlePronunciationKeyPress)
    return () => window.removeEventListener("keydown", handlePronunciationKeyPress)
  }, [gameMode])

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
              <button
                onClick={() => setGameMode("music")}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-3xl font-bold py-8 px-12 rounded-2xl hover:scale-105 transition-transform shadow-lg"
              >
                Musikläge
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
              ← Tillbaka
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
              placeholder="Skriv in ord (ett per rad eller kommaseparerat)"
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
              ← Tillbaka
            </button>
            <h1 className="text-6xl font-bold text-white text-center drop-shadow-lg">
              Bokstavsuttal
            </h1>
            <div className="w-48"></div>
          </div>
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <p className="text-2xl text-center text-purple-600 mb-6 font-semibold">
              Klicka på en bokstav eller tryck på tangentbordet för att höra hur den uttalas
            </p>
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

  if (gameState === "input" && gameMode === "music") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 p-8 flex flex-col items-center justify-center">
        <div className="max-w-5xl w-full">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setGameMode(null)}
              className="text-white text-xl font-semibold hover:underline"
            >
              ← Tillbaka
            </button>
            <h1 className="text-6xl font-bold text-white text-center drop-shadow-lg">Musikläge</h1>
            <div className="w-48"></div>
          </div>
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <p className="text-2xl text-center text-orange-600 mb-6 font-semibold">
              Klicka på en tangent eller tryck på tangentbordet för att spela musik!
            </p>
            <div className="grid grid-cols-7 gap-4">
              {swedishAlphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => playMusicalNote(letter)}
                  className="bg-gradient-to-br from-orange-400 to-red-400 text-white text-4xl font-bold py-8 rounded-2xl hover:scale-110 hover:shadow-2xl transition-all duration-200 active:scale-95"
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
