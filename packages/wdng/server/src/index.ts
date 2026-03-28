import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { z } from "zod"
import { saveRsvp } from "./db.js"

const app = new Hono()

app.use("/*", cors())

const rsvpSchema = z.object({
  guests: z.string().min(1, "Namn på gäster krävs").max(500),
  email: z.string().email("Ogiltig e-postadress").max(200),
  attending: z.boolean(),
  rideToVenue: z.boolean(),
  rideFromVenue: z.boolean(),
  requirements: z.string().max(2000).optional(),
  // Honeypot field - should be empty
  website: z.string().max(0).optional(),
})

app.post("/rsvp", async (c) => {
  try {
    const body = await c.req.json()

    if (body.website && body.website.length > 0) {
      console.log("Bot detected (honeypot filled):", body)
      return c.json({ success: true })
    }

    const validated = rsvpSchema.parse(body)

    const ip =
      c.req.header("x-forwarded-for")?.split(",")[0] || c.req.header("x-real-ip") || "unknown"
    const userAgent = c.req.header("user-agent") || "unknown"

    await saveRsvp({
      guests: validated.guests,
      email: validated.email,
      attending: validated.attending,
      ride_to_venue: validated.rideToVenue,
      ride_from_venue: validated.rideFromVenue,
      requirements: validated.requirements,
      ip_address: ip,
      user_agent: userAgent,
    })

    console.log("RSVP saved:", { email: validated.email, guests: validated.guests })

    return c.json({ success: true })
  } catch (error) {
    console.error("RSVP submission error:", error)

    if (error instanceof z.ZodError) {
      return c.json(
        {
          error: "Ogiltig data. Kontrollera att alla fält är korrekt ifyllda.",
          details: error,
        },
        400,
      )
    }

    return c.json(
      {
        error: "Ett fel uppstod. Vänligen försök igen.",
      },
      500,
    )
  }
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
