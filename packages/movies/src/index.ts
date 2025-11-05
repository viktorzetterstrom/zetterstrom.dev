import { app } from "./app"

const port = process.env.PORT ? parseInt(process.env.PORT) : 7000

app.listen(port, () => {
  console.log(`movies listening on ${port}`)
})
