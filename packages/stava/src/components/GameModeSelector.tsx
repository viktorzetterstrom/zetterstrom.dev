export type GameMode = "spelling" | "pronunciation" | "music"

interface GameModeSelectorProps {
  onSelectMode: (mode: GameMode) => void
}

export const GameModeSelector = ({ onSelectMode }: GameModeSelectorProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-6xl font-bold text-white text-center mb-8 drop-shadow-lg">Stava</h1>
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">Välj spelläge</h2>
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => onSelectMode("spelling")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-3xl font-bold py-8 px-12 rounded-2xl hover:scale-105 transition-transform shadow-lg"
            >
              Stavningsövning
            </button>
            <button
              onClick={() => onSelectMode("pronunciation")}
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white text-3xl font-bold py-8 px-12 rounded-2xl hover:scale-105 transition-transform shadow-lg"
            >
              Bokstavsuttal
            </button>
            <button
              onClick={() => onSelectMode("music")}
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
