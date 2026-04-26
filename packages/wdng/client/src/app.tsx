import { Form } from "./components/form"

const CARD_WIDTH = 800

function App() {
  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-x-hidden px-0 pb-32 md:px-16 md:pt-32 md:pb-64">
      <div
        className={`relative flex w-full flex-col overflow-hidden rounded-none border-y border-stone-200 bg-stone-50 p-16 pt-0 pb-0 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3),0_10px_20px_-10px_rgba(0,0,0,0.2)] md:max-w-[1000px] md:rounded-lg md:border md:p-32 md:pt-0 md:pb-0`}
      >
        <div
          className="-mx-16 bg-cover bg-center p-16 pt-32 md:-mx-32 md:p-64"
          style={{ backgroundImage: "url(/tapet.webp)" }}
        >
          <div className="flex justify-center">
            <img
              width={CARD_WIDTH}
              alt="Viktor och Hanna"
              src="/viktor-och-hanna-2.webp"
              className="w-full rounded-[50%] object-cover"
            />
          </div>
        </div>

        <div className="h-16" />

        <div className="relative -mx-16 p-32 md:-mx-32 md:p-64">
          <div className="relative z-10">
            <h2>Nu blir det bröllop!</h2>

            <div className="h-16" />
            <p>
              En högerswipe på Tinder mitt i Corona-pandemin var startskottet. En första dejt på
              Bitza vid Hornstull strand och några glas vin senare kändes allt rätt. När chocken
              lagt sig att Hanna inte bodde i Stockholm gick flyttlasset rätt raskt till Eskilstuna.
              Efter boende, barn och bil gör vi nu slag i saken och gifter oss!
            </p>
            <div className="h-16" />
            <p>
              Välkomna att fira med oss den 8e augusti på Kvarnfallet vid Hjälmare kanal. På denna
              hemsida finner ni all information ni behöver inför bröllopet.
            </p>
            <div className="h-16" />
            <p>
              Vi hoppas att ni vill fira vår dag tillsammans med oss och att det blir en helg vi
              sent ska glömma!
            </p>
            <div className="h-64" />
            <p className="text-5xl" style={{ fontFamily: "var(--font-parisienne)" }}>
              Viktor & Hanna
            </p>
          </div>

          <img
            src="/ribbon.webp"
            className="pointer-events-none absolute right-0 bottom-0 z-0 w-70"
          />

          <div className="h-16" />
        </div>

        <div
          className="-mx-16 bg-cover p-32 shadow-md md:-mx-32 md:p-64"
          style={{ backgroundImage: "url(/kvarnfallet.webp)", backgroundPosition: "60% 50%" }}
        >
          <div className="w-[30%] min-w-[180px] bg-stone-50 p-8 text-center shadow-lg md:p-32">
            <h2>Vigsel</h2>
            <div className="h-16" />
            <p style={{ fontVariantCaps: "small-caps" }}>Lördag 8 augusti</p>
            <p style={{ fontVariantCaps: "small-caps" }}>14:00</p>
            <div className="h-8" />
            <p style={{ fontVariantCaps: "small-caps" }}>Kvarnfallet, Hällby 307, Arboga</p>
            <div className="h-16" />
          </div>
        </div>

        <div className="h-16" />

        <div
          className="-mx-16 bg-cover bg-center p-32 md:-mx-32 md:p-64"
          style={{ backgroundImage: "url(/tyg.webp)" }}
        >
          <div className="bg-stone-50 p-24 shadow-lg md:p-32">
            <h2>Middag och fest</h2>

            <div className="h-16" />
            <p>
              Efter vigsel och mingel längs vattnet bjuder vi in till middag på restaurang
              Kvarnfallet. Vi hoppas på en kväll fylld av kärlek, skratt och gemenskap. Är ni
              intresserade av att hålla tal, bjuda på ett spex eller överraska oss på något annat
              sätt? Hör av er till våra toastmasters.
            </p>
            <div className="h-16" />

            <p>
              Lagom till att middagen är avrundad och solen gått ned vrider vi upp volymen och slår
              klackarna i taket!
            </p>
          </div>
        </div>

        <div className="h-16" />

        <div className="-mx-16 bg-cover bg-center p-32 md:-mx-32 md:p-64">
          <h2>Transport</h2>
          <p>
            Kvarnfallet ligger 30 minuter väster om Eskilstuna. Ni tar er enkelt dit med vår
            abonnerade buss, med följande alternativ:
          </p>

          <div className="h-16" />

          <div className="border-1 border-blue-300 bg-stone-50 p-24 shadow-lg md:p-32">
            <h3>Till Kvarnfallet</h3>
            <div className="h-16" />

            <p>
              <strong>Plats:</strong> Elite Hotell Stadshotellet, Hamngatan 11, Eskilstuna
            </p>
            <p>
              <strong>Avgångstid:</strong> 13:00
            </p>
            <div className="h-16" />

            <p>
              Vårt värdpar för kvällen kommer att möta upp er vid bussen och se till så ni kommer på
              ordentligt. Kom gärna en stund innan utsatt avgångstid för att säkerställa att ni inte
              missar bussen.
            </p>
            <div className="h-16" />

            <p>
              För er som utgår från en annan ort än Eskilstuna rekommenderar vi taxi eller
              alternativ skjuts ut till Kvarnfallet. Parkeringsmöjligheter finns utanför
              restaurangen.
            </p>
          </div>

          <div className="h-16" />

          <div className="border-1 border-blue-300 bg-stone-50 p-24 shadow-lg md:p-32">
            <h3>Från Kvarnfallet</h3>
            <div className="h-16" />

            <p>
              Busstransporter kommer att avgå från Kvarnfallet till Eskilstuna vid två olika
              tidpunkter under kvällen. Bussen kommer att stanna vid Elite Stadshotellet i
              Eskilstuna.
            </p>
            <div className="h-16" />

            <p>
              Baren stänger kl 01:00 och kvällen börjar då lida mot sitt slut. Vi önskar såklart att
              ni vill sjunga i kör till "Stad i ljus" på dansgolvet tillsammans med oss, men vill
              man av någon anledning komma i säng något tidigare finns även en tidigare buss att åka
              med.
            </p>
            <div className="h-16" />

            <p>
              <strong>Alternativ 1:</strong> Avgångstid 23:30
            </p>

            <div className="h-16" />
            <p>
              <strong>Alternativ 2:</strong> Avgångstid 01:30
            </p>

            <div className="h-16" />

            <p>
              Då vi behöver planera för antal bussar under dagen och kvällen önskar vi att ni uppger
              om ni önskar åka med i buss till Kvarnfallet samt vilken tid ni vill åka hem på
              lördagsnatten när ni OSA:r.
            </p>
          </div>
        </div>

        <div className="h-16" />

        <div
          className="-mx-16 bg-cover bg-center p-32 md:-mx-32 md:p-64"
          style={{ backgroundImage: "url(/tapet.webp)" }}
        >
          <div className="bg-stone-50 p-24 shadow-lg md:p-32">
            <div className="flex flex-col gap-16 md:flex-row md:gap-32">
              <div className="order-2 flex-shrink-0 md:order-1 md:w-[300px]">
                <img
                  src="/huset.webp"
                  alt="Huset"
                  className="h-full w-full object-cover shadow-md"
                />
              </div>

              <div className="order-1 flex-1 md:order-2">
                <h2>Fredag</h2>
                <div className="h-16" />
                <p>
                  När vi äntligen får tillfälle att träffa er, varför inte förlänga gemenskapen till
                  ytterligare en dag?! Därför vore det fantastiskt roligt om ni kan komma och hänga
                  med oss en stund även dan före bröllopsdan!
                </p>
                <div className="h-16" />
                <p>
                  Vi bjuder in till enklare mat, dryck och trevligt häng i vår trädgård på
                  fredagskvällen - både för långväga gäster och vänner i närområdet. Denna kväll är
                  även barn varmt välkomna.
                </p>
                <div className="h-16" />
                <p>
                  <strong>Plats:</strong> Öhrlingsgatan 12, Eskilstuna
                </p>
                <p>
                  <strong>Tid:</strong> 17:00 - 20:00
                </p>
                <div className="h-16" />
                <p>Därefter behöver i alla fall brudparet förbereda sig inför morgondagen. :)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-16" />

        <div className="relative -mx-16 flex flex-col gap-16 p-32 md:-mx-32 md:flex-row md:gap-32 md:p-64">
          <div className="order-2 flex-shrink-0 md:order-1 md:w-[300px]">
            <img
              src="/toast.webp"
              alt="Toastmaster"
              className="h-full w-full object-cover shadow-md"
            />
          </div>

          <div className="order-1 flex-1 md:order-2">
            <div className="flex items-center gap-12">
              <h2>Toastmaster</h2>
              <img
                src="/hortensia.webp"
                alt=""
                className="pointer-events-none h-auto w-40 md:hidden"
              />
            </div>
            <div className="h-16" />
            <p>
              För att guida oss genom middagen och se till att kvällen fylls av skratt, glädje och
              kanske en och annan anekdot, har vi äran att ha vårt fantastiska toastpar Filip och
              Stina! Stina arbetar till vardags som kirurg, så hon förstår värdet av precision och
              att hålla huvudet kallt under press, precis som en toastmaster behöver. Filip, som har
              skjutit fler hjortar än antalet inbjudna gäster, är lika hemma i jaktmarken som vid
              festbordet och gör duon perfekt. Tillsammans är de ett radarpar som ser till att
              kvällen blir minnesvärd för alla rätt anledningar!
            </p>
            <div className="h-16" />
            <p>
              Om ni vill hålla tal, bjuda på ett spex eller överraska oss på något annat sätt under
              middagen, vänligen kontakta Filip och Stina senast 20:e juni så att de kan pussla ihop
              kvällens program.
            </p>
            <div className="h-16" />
            <p>
              Ni når toastmasters på hannaviktor2026@gmail.com eller på telefon{" "}
              <span className="whitespace-nowrap">072 - 718 14 18</span>.
            </p>
          </div>

          <img
            src="/hortensia.webp"
            alt=""
            className="pointer-events-none absolute right-[40px] -bottom-15 hidden w-42 opacity-30 md:block"
          />
        </div>

        <div className="h-16" />

        <div className="relative -mx-16 bg-cover bg-center p-32 md:-mx-32 md:p-64">
          <div className="flex flex-col gap-16 md:flex-row md:gap-32">
            <div className="flex-1">
              <div className="flex items-center gap-12">
                <h2>Värdpar</h2>
                <img
                  src="/hortensia.webp"
                  alt=""
                  className="pointer-events-none h-auto w-40 md:hidden"
                />
              </div>
              <div className="h-16" />
              <p>
                Helgens värdpar Marie och Frida är två kvinnor med järnkoll. Marie styr i
                klassrummet och Frida på regeringskansliet. Tillsammans besitter de alla kompetenser
                som behövs för att se till att dagen ska flyta på och kan lätt improvisera vid
                behov. De kommer att finnas på plats under busstransporten till Kvarnfallet och
                hjälpa er att vara på rätt plats vid rätt tid. Det är även de ni kontaktar om ni har
                frågor generellt om bröllopet.
              </p>
              <div className="h-16" />
              <p>
                Ni når vårt värdpar på mmariecarlsson@gmail.com eller på telefon{" "}
                <span className="whitespace-nowrap">073 - 560 60 04</span>.
              </p>
            </div>

            <div className="flex-shrink-0 md:w-[300px]">
              <img
                src="/vardpar.webp"
                alt="Värdpar"
                className="h-full w-full object-cover shadow-md"
              />
            </div>
          </div>

          <img
            src="/hortensia.webp"
            alt=""
            className="pointer-events-none absolute bottom-0 left-36 hidden w-42 scale-x-[-1] opacity-30 md:block"
          />
        </div>

        <div className="h-16" />

        <div
          style={{ backgroundImage: "url(/tyg.webp)" }}
          className="-mx-16 bg-cover bg-center p-32 md:-mx-32 md:p-64"
        >
          <div className="bg-stone-50 p-24 shadow-lg md:p-32">
            <h2>Klädsel</h2>
            <div className="h-16" />
            <p>
              Klädkoden för bröllopet är{" "}
              <a
                href="https://sv.wikipedia.org/wiki/Kl%C3%A4dkod#Kavaj"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 transition-all hover:text-blue-800 hover:underline focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                kavaj
              </a>
              . Då vigseln och mycket aktivitet kommer att ske utomhus kan det vara bra att planera
              lite för det och ta med ett paraply samt eventuellt något varmt att ta på sig om vi
              skulle ha otur med vädret. 🤞
            </p>
          </div>

          <div className="h-16" />

          <div className="bg-stone-50 p-24 shadow-lg md:p-32">
            <h2>Present</h2>
            <div className="h-16" />
            <p>
              Den allra finaste presenten vi kan få är er närvaro, och vi är så glada om ni vill
              vara med och dela denna helg med oss! Om ni ändå vill ge oss en gåva skulle vi bli
              jätteglada för ett bidrag till vår bröllopsresa.
            </p>
            <div className="h-16" />
            <p>
              Bidrag kan swishas till <span className="whitespace-nowrap">070 - 389 69 77</span>.
            </p>
          </div>
        </div>

        <div className="h-16" />

        <div className="-mx-16 p-32 md:-mx-32 md:p-64">
          <h2>Boende</h2>
          <div className="h-16" />
          <p>
            Det finns ett flertal boendealternativ i centrala Eskilstuna. Vi kommer att bo på Elite
            Stadshotellet och skulle bli väldigt glada om även ni gjorde så, för att tillsammans äta
            frukost och prata om gårdagens höjdpunkter på söndagsmorgon. Det är även härifrån den
            abonnerade bussen kommer att utgå. Boka gärna ert rum i god tid via nedanstående länk.
          </p>
          <div className="h-16" />
          <p>
            <a
              href="https://www.elite.se/hotell/eskilstuna/elite-stadshotellet-eskilstuna/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 transition-all hover:text-blue-800 hover:underline focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Elite Stadshotellet Eskilstuna
            </a>
          </p>
          <div className="h-16" />
          <p>Med gruppkoden VIKTORHANNA2026 får ni rabatt på boende under bröllopshelgen.</p>
        </div>

        <div className="h-16" />

        <div
          className="-mx-16 bg-cover bg-center p-32 md:-mx-32 md:p-64"
          style={{ backgroundImage: "url(/tapet.webp)" }}
        >
          <div className="bg-stone-50 p-24 shadow-lg md:p-32">
            <div className="flex flex-col gap-16 md:flex-row md:gap-32">
              <div className="flex-1">
                <h2>Barn</h2>
                <div className="h-16" />
                <p>
                  Vi älskar barn, både våra egna och era! Men just denna dag vill vi fira med våra
                  vuxna vänner. Därför ber vi er att lämna de små hemma och istället njuta av en
                  barnfri kväll tillsammans med oss, med undantag för ammande barn som givetvis är
                  välkomna.
                </p>
                <div className="h-16" />
                <p>På fredagskvällen hänger vi dock gärna med er och era barn!</p>
              </div>

              <div className="flex-shrink-0 md:w-[300px]">
                <img
                  src="/barnen.webp"
                  alt="Barn"
                  className="h-full w-full object-cover shadow-md"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative -mx-16 p-32 md:-mx-32 md:p-64">
          <h2>Kan du komma?</h2>
          <p id="name-description" className="mb-16 text-sm text-neutral-600 italic">
            Svara senast 31:a maj.
          </p>
          <Form />
        </div>
      </div>
    </div>
  )
}

export default App
