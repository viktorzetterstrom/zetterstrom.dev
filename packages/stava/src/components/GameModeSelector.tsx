export type GameMode = "spelling" | "pronunciation" | "music"

interface GameModeSelectorProps {
  onSelectMode: (mode: GameMode) => void
}

export const GameModeSelector = ({ onSelectMode }: GameModeSelectorProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-8">
      <div className="w-full max-w-2xl">
        <h1 className="mb-8 text-center text-6xl font-bold text-white drop-shadow-lg">Stava</h1>
        <div className="rounded-3xl bg-white p-8 shadow-2xl">
          <h2 className="mb-6 text-center text-3xl font-bold text-purple-600">Välj spelläge</h2>
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => onSelectMode("spelling")}
              className="rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-12 py-8 text-3xl font-bold text-white shadow-lg transition-transform hover:scale-105"
            >
              Stavningsövning
            </button>
            <button
              onClick={() => onSelectMode("pronunciation")}
              className="rounded-2xl bg-gradient-to-r from-blue-500 to-green-500 px-12 py-8 text-3xl font-bold text-white shadow-lg transition-transform hover:scale-105"
            >
              Bokstavsuttal
            </button>
            <button
              onClick={() => onSelectMode("music")}
              className="rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-12 py-8 text-3xl font-bold text-white shadow-lg transition-transform hover:scale-105"
            >
              Musikläge
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
