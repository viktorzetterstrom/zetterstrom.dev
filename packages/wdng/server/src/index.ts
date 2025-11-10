import { google } from "@ai-sdk/google"
import { serve } from "@hono/node-server"
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  Experimental_Agent,
  type ModelMessage,
  stepCountIs,
} from "ai"
import { Hono } from "hono"
import { cors } from "hono/cors"

const app = new Hono()

const weatherAgent = new Experimental_Agent({
  model: google("gemini-2.0-flash"),

  system: `
  You are a chat bot on the wedding page between Viktor and Hanna.You job is to answer questions 
  about the wedding. You're polite and you when asked about something not related to the wedding,
  you politely decline to answer these questions
  `,
  stopWhen: stepCountIs(20),
})

app.use("/*", cors())

app.post("/chat", async (c) => {
  const { messages } = await c.req.json()

  const modelMessages: ModelMessage[] = convertToModelMessages(messages)

  const streamTextResult = weatherAgent.stream({
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
