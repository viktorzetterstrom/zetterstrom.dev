import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useState } from "react"

const UpIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18v-6H5l7-7 7 7h-4v6H9z"></path>
    </svg>
  )
}

export const Chat: React.FC = () => {
  const [input, setInput] = useState("")

  const chat = useChat({
    transport: new DefaultChatTransport({
      api: "http://localhost:3005/chat",
    }),
  })

  console.log({ chat })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {chat.messages.map((message) => (
          <div
            key={message.id}
            className={`rounded-lg p-4 ${
              message.role === "user" ? "ml-auto bg-blue-100" : "mr-auto bg-gray-100"
            }`}
          >
            <p className="text-sm font-semibold">{message.role === "user" ? "You" : "AI"}</p>
            <p>
              {message.parts.map((part, index) =>
                part.type === "text" ? <span key={index}>{part.text}</span> : null,
              )}
            </p>
          </div>
        ))}
        {chat.status !== "ready" && (
          <div className="mr-auto rounded-lg bg-gray-100 p-4">
            <p className="text-sm text-gray-500">Thinking...</p>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          void chat.sendMessage({ text: input })
          setInput("")
        }}
        className="relative"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
          }}
          disabled={chat.status !== "ready"}
          placeholder="Type your message..."
          className="w-full rounded-[16px] border border-gray-700 px-12 py-8 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={chat.status !== "ready" || !input.trim()}
          className="absolute top-6 right-6 w-fit rounded-[50%] border border-gray-700 bg-gray-100 p-2 shadow-md hover:border-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <UpIcon />
        </button>
      </form>
    </div>
  )
}
