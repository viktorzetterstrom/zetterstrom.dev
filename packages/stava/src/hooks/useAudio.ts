import { useRef } from "react"

const getAudioFileName = (letter: string): string => {
  if (letter === "Å") return "AU"
  if (letter === "Ä") return "AE"
  if (letter === "Ö") return "EU"
  return letter
}

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

export const useAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  const playLetterAudio = (letter: string) => {
    const fileName = getAudioFileName(letter)
    if (audioRef.current) {
      audioRef.current.pause()
    }
    audioRef.current = new Audio(`/audio/${fileName}.m4a`)
    audioRef.current.play().catch((err) => console.error("Error playing audio:", err))
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

  return { playLetterAudio, playMusicalNote }
}
