import { client } from '../lib/client'
import {
  SUSPECTS_QUERY,
  EVIDENCE_QUERY,
  CONTRADICTIONS_QUERY,
  TIMELINE_QUERY,
} from '../lib/queries'
import InteractiveBoard from '../components/InteractiveBoard'

export const revalidate = 0

export default async function DetectiveBoard() {
  const [suspects, evidenceList, contradictions, timelineEvents] =
    await Promise.all([
      client.fetch(SUSPECTS_QUERY),
      client.fetch(EVIDENCE_QUERY),
      client.fetch(CONTRADICTIONS_QUERY),
      client.fetch(TIMELINE_QUERY),
    ])

  return (
    <main className="min-h-screen bg-neutral-950 text-amber-50 p-6 md:p-12 font-mono">
      <header className="border-b-2 border-amber-500/30 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded text-xs tracking-widest uppercase">
            PATH 2: SANITY + GROQ CHALLENGE
          </span>
          <h1 className="text-4xl font-black text-amber-400 tracking-tight mt-2">
            GROQ & DAGGER <span className="text-neutral-500 text-2xl font-normal">| Case Desk</span>
          </h1>
        </div>
        <div className="text-right">
          <p className="text-xs text-neutral-400">ACTIVE ENGINE</p>
          <p className="text-sm font-bold text-emerald-400">GROQ GRAPH DEREFERENCING LIVE</p>
        </div>
      </header>

      <InteractiveBoard
        suspects={suspects}
        evidenceList={evidenceList}
        contradictions={contradictions}
        timelineEvents={timelineEvents}
      />
    </main>
  )
}