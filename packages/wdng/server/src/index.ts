import { google } from "@ai-sdk/google"
import { serve } from "@hono/node-server"
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  type ModelMessage,
  streamText,
} from "ai"
import { Hono } from "hono"
import { cors } from "hono/cors"

const app = new Hono()

app.use("/*", cors())

app.post("/chat", async (c) => {
  const { messages } = await c.req.json()

  const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  console.log({ key })

  const modelMessages: ModelMessage[] = convertToModelMessages(messages)

  const streamTextResult = streamText({
    model: google("gemini-2.0-flash"),
    messages: modelMessages,
  })

  const stream = streamTextResult.toUIMessageStream()

  return createUIMessageStreamResponse({
    stream,
  })
})

serve(
  {
    fetch: app.fetch,
    port: 3005,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  },
)
