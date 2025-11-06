import { useState } from "react"
import { GameMode, GameModeSelector } from "./components/GameModeSelector"
import { MusicMode } from "./modes/MusicMode"
import { PronunciationMode } from "./modes/PronunciationMode"
import { SpellingMode } from "./modes/SpellingMode"

function App() {
  const [gameMode, setGameMode] = useState<GameMode | null>(null)

  const handleBackToMenu = () => {
    setGameMode(null)
  }

  if (gameMode === null) {
    return <GameModeSelector onSelectMode={setGameMode} />
  }

  if (gameMode === "spelling") {
    return <SpellingMode onBack={handleBackToMenu} />
  }

  if (gameMode === "pronunciation") {
    return <PronunciationMode onBack={handleBackToMenu} />
  }

  if (gameMode === "music") {
    return <MusicMode onBack={handleBackToMenu} />
  }

  return null
}

export default App
