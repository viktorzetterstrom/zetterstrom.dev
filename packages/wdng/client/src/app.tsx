import { Chat } from "./chat.tsx"

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center pt-32">
      <div className="flex w-[600px] flex-col">
        <img width={300} alt="Kvarnfallet" src="/kvarnfallet-outline.png" className="self-center" />
        <h1 className="self-center">Välkomna till fest</h1>

        <h2>I korthet</h2>

        <ul>
          <li>
            <p>
              <span className="font-bold">Plats:</span> Kvarnfallet
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

        <div className="h-16" />

        <h2>Ställ frågor</h2>

        <Chat />

        {/*<h2>Plats</h2>*/}

        {/*<div className="w-fit overflow-hidden rounded-2xl border border-amber-200 shadow-lg">*/}
        {/*  <iframe*/}
        {/*    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2851.6200343397527!2d15.941805756834496!3d59.37503743798731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465e9db1e5d5d25b%3A0xe23bb96f51ec7c27!2sKvarnfallet%20Arboga!5e0!3m2!1sen!2sse!4v1762505036248!5m2!1sen!2sse"*/}
        {/*    width="600"*/}
        {/*    height="200"*/}
        {/*    allowFullScreen={false}*/}
        {/*    loading="lazy"*/}
        {/*    referrerPolicy="no-referrer-when-downgrade"*/}
        {/*  ></iframe>*/}
        {/*</div>*/}
      </div>
    </div>
  )
}

export default App
