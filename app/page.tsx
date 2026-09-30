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
    <main className="min-h-screen bg-neutral-950 text-amber-50 font-mono">
      {/* Yellow Crime Caution Tape Banner */}
      <div className="bg-amber-500 text-neutral-950 font-black text-[11px] py-1 px-4 tracking-widest uppercase overflow-hidden whitespace-nowrap shadow-md">
        ⚠️ CRIME SCENE DO NOT CROSS // RESTRICTED ACCESS // SANITY CMS GROQ GRAPH ENGINE LIVE // CASE FILE #1094-GROQ ⚠️
      </div>

      <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-8">
        <header className="border-b-2 border-amber-500/30 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase">
              PATH 2: SANITY + GROQ CHALLENGE
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-amber-400 tracking-tight mt-2">
              GROQ & DAGGER <span className="text-neutral-500 text-xl font-normal">| Case Desk</span>
            </h1>
          </div>
          <div className="text-left md:text-right bg-neutral-900 border border-neutral-800 p-3 rounded-lg">
            <p className="text-[10px] text-neutral-400 tracking-wider">ACTIVE ENGINE</p>
            <p className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              GROQ GRAPH DEREFERENCING ONLINE
            </p>
          </div>
        </header>

        <InteractiveBoard
          suspects={suspects}
          evidenceList={evidenceList}
          contradictions={contradictions}
          timelineEvents={timelineEvents}
        />
      </div>
    </main>
  )
}