import { motion, useAnimate } from "motion/react"
import { RSVPForm } from "./components/rsvp-form"

const CARD_WIDTH = 800

function App() {
  const [scope, animate] = useAnimate()

  const handleStampClick = async () => {
    const randomRotation = Math.random() * 40 - 20

    await animate(
      scope.current,
      {
        rotate: randomRotation,
        scale: 1.2,
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

  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-x-hidden px-0 pb-32 lg:pt-32 lg:pb-64">
      <div
        className={`relative flex w-full flex-col overflow-hidden rounded-none border-y border-stone-200 bg-stone-50 p-16 pt-0 pb-0 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3),0_10px_20px_-10px_rgba(0,0,0,0.2)] lg:w-[800px] lg:rounded-lg lg:border lg:p-32 lg:pt-0 lg:pb-0`}
      >
        <img width={0} alt="Viktor och Hanna" src="/ribbon.png" className="absolute top-0" />

        <div
          className="-mx-16 bg-cover bg-center p-16 pt-32 lg:-mx-32 lg:p-64"
          style={{ backgroundImage: "url(/tapet.jpg)" }}
        >
          <div className="flex justify-center">
            <img
              width={CARD_WIDTH}
              alt="Viktor och Hanna"
              src="/viktor-och-hanna-2.png"
              className="w-full rounded-[50%] object-cover"
            />
          </div>
        </div>

        <div className="h-16" />

        <h2>Nu blir det bröllop!</h2>

        <div className="h-16" />
        <p>
          En högerswipe på Tinder mitt i Corona-pandemin var startskottet. En första dejt på Bitza
          vid Hornstull strand och några glas vin senare …. När chocken lagt sig att Hanna inte
          bodde i Stockholm gick flyttlasset rätt raskt till Eskilstuna. Efter boende, barn och bil
          gör vi nu slag i saken och gifter oss!
        </p>
        <div className="h-16" />
        <p>
          Välkomna att fira med oss den 8e augusti på Kvarnfallet vid Hjälmare kanal. Denna hemsida
          uppdateras löpande med all information ni behöver inför bröllopet!
        </p>
        <div className="h-16" />
        <p>
          Vi hoppas att ni vill fira kärleken tillsammans med oss med en sommarhelg vi sent ska
          glömma!
        </p>
        <div className="h-16" />

        <div className="-mx-16 shadow-md lg:-mx-32">
          <img width={CARD_WIDTH} alt="Kvarnfallet" src="/kvarnfallet.jpg" className="w-full" />
        </div>

        <div className="h-16" />

        <h2>Vigsel</h2>
        <div className="h-16" />
        <p>
          Vid Kvarnfallet, längs hjälmare kanal, säger vi ja till varandra. Bara några steg bort
          väntar därefter brudskålen och starten på sommarens bästa kväll! ??
        </p>

        <div className="h-16" />
        <p>Plats/adress: Kvarnfallet, Hällby 307, Arboga Tid: 15:00</p>
        <div className="h-16" />

        <div
          className="-mx-16 bg-cover bg-center p-32 lg:-mx-32 lg:p-64"
          style={{ backgroundImage: "url(/tapet.jpg)" }}
        >
          <div className="bg-stone-50 p-24 shadow-lg lg:p-32">
            <h2>Middag och fest</h2>

            <div className="h-16" />
            <p>
              Efter vigsel och mingel längs vattnet bjuder vi in till middag på restaurang
              Kvarnfallet. Eventuella allergier eller kostpreferenser meddelar ni när ni OSA:r.
            </p>
            <div className="h-16" />

            <p>
              Vi hoppas på en kväll fylld av kärlek, skratt och gemenskap. Om ni önskar förgylla
              middagen med ett tal eller annat inslag, ta kontakt med våra toastmasters. Se vidare
              information under Toastmasters, längre ned på denna sida.
            </p>
            <div className="h-16" />

            <p>
              Lagom till att middagen är avrundad och solen gått ned höjer vi volymen och slår
              klackarna i taket!
            </p>
          </div>
        </div>

        <div className="h-16" />

        <div
          className="-mx-16 bg-cover bg-center p-16 lg:-mx-32 lg:p-64"
          style={{ backgroundImage: "url(/hortensia.jpg)" }}
        >
          <div className="bg-stone-50 p-24 shadow-lg lg:p-32">
            <h2>Transport</h2>
          </div>

          <div className="h-16" />

          <div className="bg-stone-50 p-24 shadow-lg lg:p-32">
            <h3>Till Kvarnfallet</h3>
            <div className="h-16" />

            <p>
              Det kommer att gå buss från centrala Eskilstuna som tar er direkt till Kvarnfallet.
            </p>
            <div className="h-16" />

            <p>Plats: Elite Hotell Stadshotellet, Hamngatan 11, Eskilstuna</p>
            <p>Tid: 14:00</p>
            <div className="h-16" />

            <p>
              Vårt värdpar för kvällen kommer att möta upp er vid bussen och se till så ni kommer på
              ordentligt. Kom gärna en stund innan utsatt avgångstid för att säkerställa att ni inte
              missar bussen!
            </p>
            <div className="h-16" />

            <p>
              För er som utgår från en annan ort än Eskilstuna rekommenderar vi taxi eller
              alternativ skjuts ut till Kvarnfallet. Parkeringsmöjligheter finns utanför
              restaurangen.
            </p>
          </div>

          <div className="h-16" />

          <div className="bg-stone-50 p-24 shadow-lg lg:p-32">
            <h3>Från Kvarnfallet</h3>
            <div className="h-16" />

            <p>
              Busstransporter kommer att avgå från Kvarnfallet till Eskilstuna vid två olika
              tidpunkter under kvällen. Bussen kommer att stanna vid Elite Stadshoteller i
              Eskilstuna.{" "}
            </p>
            <div className="h-16" />

            <p>
              Baren stänger kl 01:30 och kvällen börjar då lida mot sitt slut. Vi önskar såklart att
              ni vill sjunga i kör till kvällens sista låt på dansgolvet tillsammans med oss, men
              vill man av någon anledning komma i säng något tidigare finns även en tidigare buss
              att åka med.
            </p>
            <div className="h-16" />

            <p>
              <strong>Alternativ 1:</strong>
            </p>
            <p>Avgångstid kl 00:00</p>

            <div className="h-16" />
            <p>
              <strong>Alternativ 2:</strong>
            </p>
            <p>Avgångstid kl 02:00</p>
            <div className="h-16" />

            <p>
              Då vi behöver planera för antal bussar under dagen och kvällen önskar vi att ni uppger
              om ni önskar åka med i buss till Kvarnfallet samt vilken tid ni vill åka hem på
              lördagsnatten när ni OSA:r..
            </p>
          </div>
        </div>

        <div className="h-16" />

        <h2>Fredag</h2>
        <div className="h-16" />
        <p>
          När vi äntligen får tillfälle att träffa er, varför inte förlänga gemenskapen till
          ytterligare en dag?! Därför vore det fantastiskt roligt om ni kan komma och hänga med oss
          en stund även dan före bröllopsdan!
        </p>
        <div className="h-16" />
        <p>
          Vi bjuder därmed in enklare mat, dryck och trevligt häng i vår trädgård på fredagskvällen
          - både för långväga gäster och vänner i närområdet. Denna kväll är även barn varmt
          välkomna.
        </p>
        <div className="h-16" />
        <p>
          <strong>Plats:</strong> Örlingsgatan 12, Eskilstuna
        </p>
        <p>
          <strong>Tid:</strong> Kl 17:00 - 20:00
        </p>
        <div className="h-16" />
        <p>Därefter behöver i alla fall brudparet förbereda sig inför morgondagen!</p>

        <div className="h-16" />

        <div className="flex flex-col gap-16 lg:flex-row lg:gap-32">
          <div className="order-1 flex-1">
            <h2>Toastmaster</h2>
            <div className="h-16" />
            <p>
              För att guida oss genom middagen och se till att kvällen fylls av skratt, glädje och
              kanske en och annan anekdot, har vi äran att ha vårt fantastiska toastpar Filip och
              Stina! Detta radarpar… bla bla bla
            </p>
            <div className="h-16" />
            <p>
              Om ni vill hålla tal, bjuda på ett spex eller överaska oss på något annat sätt under
              middagen, vänligen kontakta Filip och Stina senast 20e juni så att de kan pussla ihop
              kvällens program.
            </p>
            <div className="h-16" />
            <p>Ni når toastmasters på "xxx" eller "070.."</p>
          </div>

          <div className="order-2 flex-shrink-0 lg:w-[300px]">
            <img
              src="/toast.JPG"
              alt="Toastmaster"
              className="h-full w-full object-cover shadow-md"
            />
          </div>
        </div>

        <div className="h-32" />

        <div
          className="-mx-16 bg-cover bg-center p-16 lg:-mx-32 lg:p-64"
          style={{ backgroundImage: "url(/tyg.png)" }}
        >
          <div className="bg-stone-50 p-24 shadow-lg lg:p-32">
            <div className="flex flex-col gap-16 lg:flex-row lg:gap-32">
              <div className="order-2 flex-shrink-0 lg:order-1 lg:w-[300px]">
                <img
                  src="/vardpar.JPG"
                  alt="Värdpar"
                  className="h-full w-full object-cover shadow-md"
                />
              </div>

              <div className="order-1 flex-1 lg:order-2">
                <h2>Värdpar</h2>
                <div className="h-16" />
                <p>
                  Helgens värdpar Marie och Frida är två kvinnor med järnkoll. Detta radarpar kommer
                  att finnas på plats under busstransporten till Kvarnfallet och hjälpa er komma
                  till rätt plats. Det är även Marie och Frida ni kontaktar om ni har frågor
                  generellt om bröllopet. Bröllopsgåva?
                </p>
                <div className="h-16" />
                <p>Ni når vårt värdpar på "mail" eller "070"</p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-16" />

        <h2>Klädsel</h2>
        <div className="h-16" />
        <p>Klädkod för bröllopet är KAVAJ.</p>
        <div className="h-16" />
        <p>Då vigseln sker utomhus .. kläder efter väder.. paraply, varmare till kvällen.</p>

        <div className="h-16" />

        <h2>Boende</h2>
        <div className="h-16" />
        <p>
          Det finns ett flertal boendealternativ i centrala Eskilstuna. Vi kommer att bo på Elite
          Stadshotellet och skulle bli väldigt glada om även ni gjorde så, för att tillsammans äta
          frukost och prata om gårdagens höjdpunkter på söndagsmorgon. Det är även härifrån den
          abonnerade bussen kommer att utgå. Boka gärna ert rum i god tid via nedanstående länk.
        </p>
        <div className="h-16" />
        <p>Bokningslänk</p>
        <div className="h-16" />
        <p>Med gruppkoden VIKTORHANNA2026 får ni 20% rabatt på boende under bröllopshelgen.</p>
        <div className="h-16" />
        <p>Vana Spa</p>

        <div className="h-16" />

        <h2>Present</h2>
        <div className="h-16" />
        <p>
          Den allra finaste presenten vi kan få är er närvaro, och vi är så glada om ni vill vara
          med och dela denna helg med oss! Om ni ändå vill ge oss en gåva skulle vi bli jätteglada
          för ett litet bidrag till vår bröllopsresa.
        </p>
        <div className="h-16" />
        <p>Swish till vilket nr? Vem kontaktas? Marie?</p>

        <div className="h-16" />

        <div className="flex flex-col gap-16 lg:flex-row lg:gap-32">
          <div className="order-2 flex-shrink-0 lg:order-1 lg:w-[300px]">
            <img src="/barnen.jpeg" alt="Barn" className="h-full w-full object-cover shadow-md" />
          </div>

          <div className="order-1 flex-1 lg:order-2">
            <h2>Barn</h2>
            <div className="h-16" />
            <p>
              Vi älskar barn, både våra egna och era! Men just denna dag vill vi skapa en kväll
              fylld av kärlek, fest och avkoppling för de vuxna. Därför ber vi er att lämna de små
              hemma och istället njuta av en barnfri kväll tillsammans med oss (med undantag för
              ammande barn som givetvis är varmt välkomna).
            </p>
            <div className="h-16" />
            <p>På fredagskvällen hänger vi dock gärna med er och era barn!</p>
          </div>
        </div>

        <div className="h-32 lg:h-40" />

        <div className="relative -mx-16 border-t-2 border-dashed border-stone-400 bg-stone-50 pt-32 pb-32 lg:-mx-32 lg:px-32">
          <motion.img
            src="/sax-stone.png"
            alt="Scissors"
            className="absolute -top-16 right-16 w-32 lg:right-32"
            initial={{ rotate: 9, scaleX: -1 }}
            whileHover={{
              rotate: 12,
              filter: "brightness(0)",
              transition: { duration: 0.2 },
            }}
            style={{ scaleX: -1 }}
          />

          <div className="flex items-start justify-between">
            <h3 className="font-mono text-3xl tracking-wide text-stone-700 uppercase lg:text-4xl">
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

          <RSVPForm />
        </div>
      </div>
    </div>
  )
}

export default App
