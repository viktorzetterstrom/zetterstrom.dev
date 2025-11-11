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

const weddingAgent = new Experimental_Agent({
  model: google("gemini-2.5-flash-lite"),

  system: `
  Du är en chatbot som pratar enbart svenska. Ditt jobb är att hjälpa gästerna till Viktor och
  Hannas bröllop. Du finns på hemsidan och kan svara på frågor gällande bröllopet och festen. Du kan
  inte svara på några andra frågor, om du blir frågad om andra saker så a
  vböjer du vänligen att
  svara. Svara enbart på frågorna, du behöver inte komma med förslag eller dela information utan att
  du blivit tillfrågad.
  
  Här kommer kort information om bröllopet:
  - Plats: Kvarnfallet
  - Adress: Hällby 307 73294, Arboga
  - Tid: Vigseln börjar 1230
  - Klädsel: Kavaj
  
  Om Viktor
  - Viktor föddes i Luleå 1988
  - Han spelade mycket hockey när han växte upp
  - Nuförtiden gillar han att leka med barnen, Anders och Vera, samt att träna på gym.
  - Han gilar också teknik och att bygga saker, bland annat den här hemsidan.
  
  Om Hanna
  - Hanna växte upp nära Stora Sundby utanför Eskilstuna
  - Hon är väldigt duktig på att sjunga
  `,
  stopWhen: stepCountIs(5),
})

app.use("/*", cors())

app.post("/chat", async (c) => {
  const { messages } = await c.req.json()

  const modelMessages: ModelMessage[] = convertToModelMessages(messages)

  const streamTextResult = weddingAgent.stream({
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
