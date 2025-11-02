import { useState } from "react"
import { GameModeSelector, GameMode } from "./components/GameModeSelector"
import { SpellingMode } from "./modes/SpellingMode"
import { PronunciationMode } from "./modes/PronunciationMode"
import { MusicMode } from "./modes/MusicMode"

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
