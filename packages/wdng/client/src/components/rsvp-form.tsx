import { useMutation } from "@tanstack/react-query"
import { motion } from "motion/react"
import { FormInput } from "./form-input"
import { FormTextarea } from "./form-textarea"
import { FormCheckbox } from "./form-checkbox"

interface RsvpData {
  guests: string
  email: string
  attending: boolean
  rideToVenue: boolean
  rideFromVenue: boolean
  requirements?: string
  website?: string
}

async function submitRsvp(data: RsvpData) {
  const response = await fetch("http://localhost:3005/rsvp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Något gick fel")
  }

  return response.json()
}

export function RSVPForm() {
  const mutation = useMutation({
    mutationFn: submitRsvp,
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const data: RsvpData = {
      guests: formData.get("guests") as string,
      email: formData.get("email") as string,
      attending: formData.get("attending") === "on",
      rideToVenue: formData.get("rideToVenue") === "on",
      rideFromVenue: formData.get("rideFromVenue") === "on",
      requirements: formData.get("requirements") as string,
      website: formData.get("website") as string, // honeypot
    }

    mutation.mutate(data, {
      onSuccess: () => {
        e.currentTarget.reset()
      },
    })
  }

  return (
    <form className="flex flex-col gap-20" onSubmit={handleSubmit}>
      <FormCheckbox
        id="attending"
        name="attending"
        label="Ja, vi kommer till bröllopet!"
        checked
        disabled
        readOnly
      />

      <FormInput id="guests" name="guests" label="Namn på gäster" required />

      <FormInput id="email" name="email" type="email" label="E-post" required />

      {/* Honeypot field - hidden from real users, visible to bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-12">
        <FormCheckbox
          id="rideToVenue"
          name="rideToVenue"
          label="Vi vill ha skjuts till Kvarnfallet från Eskilstuna kl 13.00"
        />

        <FormCheckbox
          id="rideFromVenue"
          name="rideFromVenue"
          label="Vi vill ha skjuts till Eskilstuna från Kvarnfallet kl 02.00"
        />
      </div>

      <FormTextarea
        id="requirements"
        name="requirements"
        label="Vet du några låtar vill du höra på festen?"
      />

      <FormTextarea
        id="requirements"
        name="requirements"
        label="Allergier eller andra önskemål"
      />

      <div className="space-y-12">
        <motion.button
          type="submit"
          disabled={mutation.isPending}
          className="relative cursor-pointer border-2 border-dashed border-stone-500 bg-white px-24 py-10 font-mono text-sm tracking-wider text-stone-700 uppercase shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
          whileHover={
            !mutation.isPending
              ? {
                  rotate: -2,
                  scale: 1.05,
                  transition: { duration: 0.15 },
                }
              : {}
          }
          style={{
            background:
              "repeating-linear-gradient(90deg, white 0px, white 8px, transparent 8px, transparent 12px)",
            backgroundSize: "12px 100%",
          }}
        >
          <span className="relative z-10 bg-white px-8">
            {mutation.isPending ? "Skickar..." : "Skicka"}
          </span>
        </motion.button>

        {mutation.isSuccess && (
          <p className="font-mono text-sm text-green-700">
            Tack för din OSA! Vi ser fram emot att fira med er.
          </p>
        )}

        {mutation.isError && (
          <p className="font-mono text-sm text-red-700">
            {mutation.error instanceof Error
              ? mutation.error.message
              : "Något gick fel. Vänligen försök igen."}
          </p>
        )}
      </div>
    </form>
  )
}
