import { useState } from "react"

export const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    canAttend: "",
    transportToKvarnfallet: false,
    transportFrom00: false,
    transportFrom02: false,
    fridayHangout: false,
    allergies: "",
    songRequests: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("https://formspree.io/f/xgoroepb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          name: "",
          email: "",
          canAttend: "",
          transportToKvarnfallet: false,
          transportFrom00: false,
          transportFrom02: false,
          fridayHangout: false,
          allergies: "",
          songRequests: "",
        })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="mt-32 space-y-24">
      <div>
        <label htmlFor="name" className="mb-8 block font-semibold">
          Namn <span className="text-red-600">*</span>
        </label>
        <p id="name-description" className="mb-16 text-sm text-neutral-600 italic">
          Det går bra att ange flera namn i samma inskick.
        </p>

        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          aria-describedby="name-description"
          className="w-full border border-stone-300 bg-white px-16 py-12 font-serif text-neutral-700 shadow-sm transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-8 block font-semibold">
          Email <span className="text-red-600">*</span>
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-stone-300 bg-white px-16 py-12 pr-40 font-serif text-neutral-700 shadow-sm transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
          <span className="absolute top-1/2 right-16 -translate-y-1/2 text-stone-400">@</span>
        </div>
      </div>

      <div>
        <label className="mb-12 block font-semibold">
          Kan du/ni komma? <span className="text-red-600">*</span>
        </label>
        <div className="space-y-12">
          <label className="flex cursor-pointer items-center gap-12 border border-stone-300 bg-stone-50 p-16 transition-all hover:border-stone-400 hover:shadow-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-400 has-[:focus-visible]:ring-offset-2">
            <input
              type="radio"
              name="canAttend"
              value="yes"
              checked={formData.canAttend === "yes"}
              onChange={handleChange}
              required
              className="h-20 w-20 cursor-pointer accent-blue-600 focus-visible:outline-none"
            />
            <span className="flex-1">Ja, absolut!</span>
          </label>

          <label className="flex cursor-pointer items-center gap-12 border border-stone-300 bg-stone-50 p-16 transition-all hover:border-stone-400 hover:shadow-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-400 has-[:focus-visible]:ring-offset-2">
            <input
              type="radio"
              name="canAttend"
              value="no"
              checked={formData.canAttend === "no"}
              onChange={handleChange}
              required
              className="h-20 w-20 cursor-pointer accent-blue-600 focus-visible:outline-none"
            />
            <span className="flex-1">Nej, jag/vi kan tyvärr inte komma</span>
          </label>
        </div>
      </div>

      <div>
        <label className="mb-12 block font-semibold">Transport</label>
        <div className="space-y-12 border border-stone-200 bg-stone-50 p-16">
          <p id="transport-description" className="mb-16 text-sm text-neutral-600 italic">
            För att vi ska kunna planera bokning av transporter behöver vi veta redan nu om ni vill
            åka med bokad buss till och/eller från Kvarnfallet.
          </p>

          <label className="-m-8 flex cursor-pointer items-start gap-12 rounded-md p-8 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-400 has-[:focus-visible]:ring-offset-2">
            <input
              type="checkbox"
              name="transportToKvarnfallet"
              checked={formData.transportToKvarnfallet}
              onChange={handleChange}
              aria-describedby="transport-description"
              className="mt-4 h-20 w-20 cursor-pointer rounded-none accent-blue-600 focus-visible:outline-none"
            />
            <span>Till Kvarnfallet från Eskilstuna</span>
          </label>

          <label className="-m-8 flex cursor-pointer items-start gap-12 rounded-md p-8 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-400 has-[:focus-visible]:ring-offset-2">
            <input
              type="checkbox"
              name="transportFrom00"
              checked={formData.transportFrom00}
              onChange={handleChange}
              aria-describedby="transport-description"
              className="mt-4 h-20 w-20 cursor-pointer rounded-none accent-blue-600 focus-visible:outline-none"
            />
            <span>Till Eskilstuna från Kvarnfallet kl 23:30</span>
          </label>

          <label className="-m-8 flex cursor-pointer items-start gap-12 rounded-md p-8 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-400 has-[:focus-visible]:ring-offset-2">
            <input
              type="checkbox"
              name="transportFrom02"
              checked={formData.transportFrom02}
              onChange={handleChange}
              aria-describedby="transport-description"
              className="mt-4 h-20 w-20 cursor-pointer rounded-none accent-blue-600 focus-visible:outline-none"
            />
            <span>Till Eskilstuna från Kvarnfallet kl 01:30</span>
          </label>
        </div>
      </div>

      <div>
        <label className="mb-12 block font-semibold">Fredagshäng</label>
        <div className="border border-stone-200 bg-stone-50 p-16">
          <label className="-m-8 flex cursor-pointer items-start gap-12 rounded-md p-8 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-400 has-[:focus-visible]:ring-offset-2">
            <input
              type="checkbox"
              name="fridayHangout"
              checked={formData.fridayHangout}
              onChange={handleChange}
              className="mt-4 h-20 w-20 cursor-pointer rounded-none accent-blue-600 focus-visible:outline-none"
            />
            <span>Ja, vi kommer på fredagshäng i Eskilstuna!</span>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="allergies" className="mb-8 block font-semibold">
          Allergier eller andra matpreferenser
        </label>
        <textarea
          id="allergies"
          name="allergies"
          value={formData.allergies}
          onChange={handleChange}
          rows={4}
          className="w-full resize-none border border-stone-300 bg-white px-16 py-12 font-serif text-neutral-700 shadow-sm transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="songRequests" className="mb-8 block font-semibold">
          Vilka låtar kan du inte vara utan på festen?
        </label>
        <textarea
          id="songRequests"
          name="songRequests"
          value={formData.songRequests}
          onChange={handleChange}
          rows={4}
          className="w-full resize-none border border-stone-300 bg-white px-16 py-12 font-serif text-neutral-700 shadow-sm transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none"
        />
      </div>

      <div className="pt-16">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 px-32 py-16 font-semibold text-white shadow-md transition-all hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Skickar..." : "Skicka O.S.A"}
        </button>
      </div>

      {submitStatus === "success" && (
        <div className="rounded-lg bg-green-50 p-16 text-center text-green-800">
          Tack för ditt svar! Vi ser fram emot att fira med er!
        </div>
      )}

      {submitStatus === "error" && (
        <div className="rounded-lg bg-red-50 p-16 text-center text-red-800">
          Något gick fel. Försök igen eller kontakta oss direkt.
        </div>
      )}
    </form>
  )
}
