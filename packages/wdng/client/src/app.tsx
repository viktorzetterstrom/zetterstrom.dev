import { useMutation } from "@tanstack/react-query"
import { motion, useAnimate } from "motion/react"

const CARD_WIDTH = 800
const IMAGE_HEIGHT = 300

const colors = [
  "rgb(239,68,68)", // red
  "rgb(249,115,22)", // orange
  "rgb(234,179,8)", // yellow
  "rgb(34,197,94)", // green
  "rgb(59,130,246)", // blue
  "rgb(168,85,247)", // purple
]

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

function App() {
  const [scope, animate] = useAnimate()

  const mutation = useMutation({
    mutationFn: submitRsvp,
  })

  const handleStampClick = async () => {
    const randomRotation = Math.random() * 40 - 20
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    await animate(
      scope.current,
      {
        rotate: randomRotation,
        scale: 1.2,
        borderColor: randomColor,
      },
      { duration: 0.1 },
    )

    await animate(
      scope.current,
      {
        rotate: 6,
        scale: 1,
        borderColor: "rgb(95,162,226)",
      },
      {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    )
  }

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

  type MenuItem = "top" | "i-korthet" | "boende" | "osa"

  const handleMenuClick = (item: MenuItem) => {
    const element = document.getElementById(item)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div
      id="top"
      className="relative flex min-h-screen flex-col items-center overflow-x-hidden px-0 pt-16 pb-32 lg:px-16 lg:pt-32 lg:pb-64"
    >
      <nav className="fixed top-32 left-16 hidden lg:block">
        <ul className="space-y-8">
          <li>
            <button
              onClick={() => handleMenuClick("i-korthet")}
              className="cursor-pointer font-mono text-sm text-stone-600 transition-colors hover:text-stone-900"
            >
              I korthet
            </button>
          </li>
          <li>
            <button
              onClick={() => handleMenuClick("boende")}
              className="cursor-pointer font-mono text-sm text-stone-600 transition-colors hover:text-stone-900"
            >
              Boende
            </button>
          </li>
          <li>
            <button
              onClick={() => handleMenuClick("osa")}
              className="cursor-pointer font-mono text-sm text-stone-600 transition-colors hover:text-stone-900"
            >
              O.S.A.
            </button>
          </li>
        </ul>
      </nav>
      <div
        className={`relative flex w-full flex-col overflow-hidden rounded-none border-y border-stone-200 bg-amber-50 p-16 pb-0 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3),0_10px_20px_-10px_rgba(0,0,0,0.2)] lg:w-[800px] lg:rounded-lg lg:border lg:p-32 lg:pb-0`}
      >
        <img width={0} alt="Viktor och Hanna" src="/ribbon.png" className="absolute top-0" />

        <h1 className="self-center text-5xl lg:text-7xl">Vi ska gifta oss!</h1>

        <div className="h-16 lg:h-24" />

        <div className="-mx-16 shadow-md lg:-mx-32">
          <img
            width={CARD_WIDTH}
            alt="Viktor och Hanna"
            src="/viktor-och-hanna.jpeg"
            className="h-[350px] w-full object-cover"
          />
        </div>

        <div className="h-16 lg:h-24" />

        <div className="flex items-center justify-between">
          <div>
            <h2 id="i-korthet">I korthet</h2>

            <ul>
              <li>
                <p>
                  <span className="font-bold">Plats:</span> Kvarnfallet
                </p>
              </li>
              <li>
                <p>
                  <span className="font-bold">Adress:</span> Hällby 307, 73294 Arboga
                </p>
              </li>
              <li>
                <p>
                  <span className="font-bold">Datum:</span> 8 agusti 2025
                </p>
              </li>
              <li>
                <p>
                  <span className="font-bold">Klockan:</span> 12:30
                </p>
              </li>
              <li>
                <p>
                  <span className="font-bold">Klädsel:</span> Kostym
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-16 lg:h-24" />

        <div className="-mx-16 lg:-mx-32">
          <img width={CARD_WIDTH} src="/heart-line.png" className="w-full" />
        </div>

        <div className="h-16 lg:h-24" />

        <div className="-mx-16 shadow-md lg:-mx-32">
          <img width={CARD_WIDTH} alt="Kvarnfallet" src="/kvarnfallet.jpg" className="w-full" />
        </div>

        <div className="h-16 lg:h-24" />

        <div>
          <h2 id="boende">Boende</h2>
          <p>
            Vi har fixat boende på <strong>[hotellnamn]</strong>, ni kan få rabatt om ni vid bokning
            anger rabattkoden:
            <strong>[...]</strong>
          </p>
          <p>
            Vi har ordnat med buss ut till Kvarnfallet för vigseln samt två bussar tillbaka efter
            festen.
          </p>
        </div>

        <div className="h-32 lg:h-40" />

        <div className="relative -mx-16 border-t-2 border-dashed border-stone-400 bg-stone-50 pt-32 pb-32 lg:-mx-32 lg:px-32">
          <img
            src="/sax-stone.png"
            alt="Scissors"
            className="absolute -top-16 right-16 w-32 lg:right-32"
            style={{ transform: "rotate(-10deg) scaleX(-1)" }}
          />

          <div className="flex items-start justify-between">
            <h3
              id="osa"
              className="font-mono text-3xl tracking-wide text-stone-700 uppercase lg:text-4xl"
            >
              O.S.A.
            </h3>
            <motion.div
              ref={scope}
              onClick={handleStampClick}
              className="cursor-pointer border-2 border-dashed bg-white p-12 shadow-sm"
              initial={{
                rotate: 6,
                scale: 1,
                borderColor: "rgb(95,162,226)",
              }}
              whileHover={{
                rotate: 9,
                transition: { duration: 0.15 },
              }}
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(95,162,226,0.05) 8px, rgba(95,162,226,0.05) 12px)",
              }}
            >
              <img width={80} src="/glasses.png" alt="Coupon decoration" />
            </motion.div>
          </div>

          <form className="flex flex-col gap-20" onSubmit={handleSubmit}>
            <div className="flex items-center gap-12">
              <input
                type="checkbox"
                name="attending"
                id="attending"
                checked
                disabled
                readOnly
                className="h-18 w-18 rounded border-stone-400 text-stone-700 focus:ring-stone-500"
              />
              <label htmlFor="attending" className="flex-1 font-mono text-sm leading-relaxed">
                Ja, vi kommer till bröllopet!
              </label>
            </div>

            <div>
              <label htmlFor="guests" className="mb-2 block font-mono text-sm text-stone-600">
                Namn på gäster
              </label>
              <input
                type="text"
                id="guests"
                name="guests"
                required
                className="w-full border-0 border-b-2 border-dashed border-stone-300 bg-transparent px-0 py-4 font-mono focus:border-stone-600 focus:ring-0 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block font-mono text-sm text-stone-600">
                E-post
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full border-0 border-b-2 border-dashed border-stone-300 bg-transparent px-0 py-4 font-mono focus:border-stone-600 focus:ring-0 focus:outline-none"
              />
            </div>

            {/* Honeypot field - hidden from real users, visible to bots */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="space-y-12">
              <div className="flex items-center gap-12">
                <input
                  type="checkbox"
                  name="rideToVenue"
                  id="rideToVenue"
                  className="h-18 w-18 rounded border-stone-400 text-stone-700 focus:ring-stone-500"
                />
                <label htmlFor="rideToVenue" className="flex-1 font-mono text-sm leading-relaxed">
                  Vi vill ha skjuts till Kvarnfallet från Eskilstuna kl 13.00
                </label>
              </div>

              <div className="flex items-center gap-12">
                <input
                  type="checkbox"
                  name="rideFromVenue"
                  id="rideFromVenue"
                  className="h-18 w-18 rounded border-stone-400 text-stone-700 focus:ring-stone-500"
                />
                <label htmlFor="rideFromVenue" className="flex-1 font-mono text-sm leading-relaxed">
                  Vi vill ha skjuts till Eskilstuna från Kvarnfallet kl 02.00
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="requirements" className="mb-2 block font-mono text-sm text-stone-600">
                Allergier eller andra önskemål
              </label>
              <textarea
                id="requirements"
                name="requirements"
                rows={1}
                className="w-full resize-none border-0 border-b-2 border-dashed border-stone-300 bg-transparent px-0 py-4 font-mono focus:border-stone-600 focus:ring-0 focus:outline-none"
              />
            </div>

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
        </div>
      </div>
    </div>
  )
}

export default App
