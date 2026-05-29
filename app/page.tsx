import { Header } from './components/Header'
import { TipForm } from './components/TipForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-base-dark flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
            Live on Base
          </div>
          <h1 className="font-extrabold text-4xl sm:text-5xl text-base-text leading-tight">
            Tip anyone,<br />
            <span className="text-base-blue">onchain.</span>
          </h1>
          <p className="text-base-sub text-sm mt-4 max-w-xs mx-auto leading-relaxed">
            Send ETH to any wallet on Base. No middlemen. No accounts. Permissionless.
          </p>
        </div>

        <div className="w-full max-w-md bg-base-card border border-base-border rounded-2xl p-6 shadow-2xl">
          <TipForm />
        </div>

        <p className="mt-8 text-xs text-base-muted text-center">
          Transactions are final. Always verify the recipient address.<br />
          <a href="https://base.org" target="_blank" rel="noopener noreferrer"
            className="text-blue-500/60 hover:text-blue-400 transition-colors">
            Powered by Base ↗
          </a>
        </p>
      </div>
    </main>
  )
}
