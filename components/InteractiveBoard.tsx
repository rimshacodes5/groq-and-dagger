'use client'

import React, { useState } from 'react'

interface InteractiveBoardProps {
  suspects: any[]
  evidenceList: any[]
  contradictions: any[]
  timelineEvents: any[]
}

export default function InteractiveBoard({
  suspects,
  evidenceList,
  contradictions,
  timelineEvents,
}: InteractiveBoardProps) {
  const [selectedSuspectId, setSelectedSuspectId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [activeTab, setActiveTab] = useState<'desk' | 'timeline'>('desk')

  // Filter suspects based on search query
  const filteredSuspects = suspects.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.alias?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Filter evidence based on search & selected suspect
  const filteredEvidence = evidenceList.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())

    if (!selectedSuspectId) return matchesSearch

    const isConnected = item.connectedSuspects?.some(
      (s: any) => s._id === selectedSuspectId
    )
    return matchesSearch && isConnected
  })

  // Filter contradictions based on selected suspect
  const filteredContradictions = contradictions.filter((c) => {
    if (!selectedSuspectId) return true
    return c.suspectInvolved?._id === selectedSuspectId
  })

  const selectedSuspect = suspects.find((s) => s._id === selectedSuspectId)

  return (
    <div className="space-y-8 font-mono">
      {/* Dynamic Case Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-neutral-900/90 border-l-4 border-amber-500 border-y border-r border-neutral-800 p-4 rounded-r-lg">
          <p className="text-[10px] text-amber-500 font-bold uppercase tracking-wider">SUSPECTS ON FILE</p>
          <p className="text-2xl font-black text-amber-200 mt-1">{suspects.length}</p>
        </div>
        <div className="bg-neutral-900/90 border-l-4 border-cyan-500 border-y border-r border-neutral-800 p-4 rounded-r-lg">
          <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">EVIDENCE LOGGED</p>
          <p className="text-2xl font-black text-cyan-200 mt-1">{evidenceList.length}</p>
        </div>
        <div className="bg-neutral-900/90 border-l-4 border-red-500 border-y border-r border-neutral-800 p-4 rounded-r-lg">
          <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">CONTRADICTIONS</p>
          <p className="text-2xl font-black text-red-300 mt-1">{contradictions.length}</p>
        </div>
        <div className="bg-neutral-900/90 border-l-4 border-emerald-500 border-y border-r border-neutral-800 p-4 rounded-r-lg">
          <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">VERIFIED TIMELINE</p>
          <p className="text-2xl font-black text-emerald-200 mt-1">{timelineEvents.length}</p>
        </div>
      </div>

      {/* Cyber-Noir Search & Filter Toolbar */}
      <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="relative w-full md:w-96">
          <span className="absolute left-3 top-2.5 text-neutral-500 text-xs">🔍</span>
          <input
            type="text"
            placeholder="Search dossier, evidence, alias..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-4 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
          />
        </div>

        {/* Tab Switching */}
        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('desk')}
            className={`px-4 py-2 text-xs font-bold rounded-lg border transition tracking-wider ${
              activeTab === 'desk'
                ? 'bg-amber-500 text-neutral-950 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
            }`}
          >
            🕵️ EVIDENCE DESK
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 text-xs font-bold rounded-lg border transition tracking-wider ${
              activeTab === 'timeline'
                ? 'bg-amber-500 text-neutral-950 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
            }`}
          >
            ⏳ TIMELINE VIEW
          </button>
        </div>
      </div>

      {/* Active Suspect Filter Banner */}
      {selectedSuspect && (
        <div className="bg-amber-950/40 border border-amber-500/50 p-3 rounded-lg flex justify-between items-center text-xs animate-pulse">
          <p className="text-amber-400 font-bold tracking-wide">
            ⚠️ ISOLATING EVIDENCE FOR: <span className="underline uppercase">{selectedSuspect.name}</span> ({selectedSuspect.alias})
          </p>
          <button
            onClick={() => setSelectedSuspectId(null)}
            className="bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-black border border-amber-500/40 px-3 py-1 rounded text-[11px] font-bold transition"
          >
            CLEAR FILTER ✖
          </button>
        </div>
      )}

      {/* VIEW 1: EVIDENCE DESK */}
      {activeTab === 'desk' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Suspects Column */}
          <section className="bg-neutral-900/70 border border-neutral-800 rounded-xl p-5 shadow-2xl backdrop-blur">
            <h2 className="text-lg font-extrabold text-amber-400 border-b border-neutral-800 pb-3 mb-4 flex items-center justify-between tracking-wide">
              <span>🕵️ SUSPECT DOSSIERS</span>
              <span className="text-xs bg-amber-950/80 text-amber-400 border border-amber-800/60 px-2.5 py-0.5 rounded-full font-bold">
                {filteredSuspects.length}
              </span>
            </h2>
            <div className="space-y-4">
              {filteredSuspects.map((suspect) => {
                const isSelected = selectedSuspectId === suspect._id
                return (
                  <div
                    key={suspect._id}
                    onClick={() =>
                      setSelectedSuspectId(isSelected ? null : suspect._id)
                    }
                    className={`cursor-pointer bg-neutral-950 border p-4 rounded-lg transition-all transform hover:-translate-y-0.5 ${
                      isSelected
                        ? 'border-amber-500 ring-2 ring-amber-500/30 bg-amber-950/20 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                        : 'border-neutral-800 hover:border-amber-500/50 hover:bg-neutral-900/50'
                    }`}
                  >
                    <div className="flex gap-4 items-start">
                      {suspect.photoUrl ? (
                        <img
                          src={suspect.photoUrl}
                          alt={suspect.name}
                          className="w-14 h-14 rounded border border-amber-500/40 object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xl text-neutral-600 flex-shrink-0">
                          👤
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-base text-amber-200 truncate">{suspect.name}</h3>
                            <p className="text-[11px] text-neutral-400">AKA: "{suspect.alias || 'UNKNOWN'}"</p>
                          </div>
                          <span
                            className={`text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-wider border ${
                              suspect.status === 'prime_suspect'
                                ? 'bg-red-950/80 text-red-400 border-red-800'
                                : suspect.status === 'cleared'
                                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                                : 'bg-neutral-800 text-neutral-300 border-neutral-700'
                            }`}
                          >
                            {suspect.status || 'SUSPECT'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-neutral-300 space-y-1.5 border-t border-neutral-900 pt-2">
                      <p><strong className="text-neutral-500">ALIBI:</strong> {suspect.alibi}</p>
                      <p><strong className="text-neutral-500">NOTES:</strong> {suspect.notes}</p>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider pt-2 border-t border-neutral-900/60">
                      <span className={isSelected ? 'text-amber-400' : 'text-neutral-500'}>
                        {isSelected ? '● ACTIVE FILTER' : 'INSPECT EVIDENCE'}
                      </span>
                      <span className="text-amber-500">➜</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Evidence Locker */}
          <section className="bg-neutral-900/70 border border-neutral-800 rounded-xl p-5 shadow-2xl backdrop-blur">
            <h2 className="text-lg font-extrabold text-cyan-400 border-b border-neutral-800 pb-3 mb-4 flex items-center justify-between tracking-wide">
              <span>🔍 EVIDENCE LOCKER</span>
              <span className="text-xs bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 px-2.5 py-0.5 rounded-full font-bold">
                {filteredEvidence.length}
              </span>
            </h2>
            <div className="space-y-4">
              {filteredEvidence.map((item) => (
                <div key={item._id} className="bg-neutral-950 border border-neutral-800 p-4 rounded-lg hover:border-cyan-500/40 transition">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-32 object-cover rounded mb-3 border border-cyan-900/50"
                    />
                  )}
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-cyan-200 text-sm">{item.title}</h3>
                    <span className="text-[9px] bg-cyan-950/80 text-cyan-400 border border-cyan-800 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed">{item.description}</p>
                  <div className="mt-3 pt-2 border-t border-neutral-900 text-[11px] text-neutral-400 flex justify-between items-center">
                    <span>📍 {item.locationFound || 'CRIME SCENE'}</span>
                    {item.connectedSuspects?.map((s: any) => (
                      <span key={s._id} className="text-amber-400 font-bold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/60">
                        LINKED: {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contradictions */}
          <section className="bg-neutral-900/70 border border-neutral-800 rounded-xl p-5 shadow-2xl backdrop-blur">
            <h2 className="text-lg font-extrabold text-red-500 border-b border-neutral-800 pb-3 mb-4 flex items-center justify-between tracking-wide">
              <span>⚡ CONTRADICTIONS</span>
              <span className="text-xs bg-red-950/80 text-red-400 border border-red-800/60 px-2.5 py-0.5 rounded-full font-bold">
                {filteredContradictions.length}
              </span>
            </h2>
            <div className="space-y-4">
              {filteredContradictions.map((c) => (
                <div key={c._id} className="bg-red-950/20 border border-red-900/50 p-4 rounded-lg shadow-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-red-300 text-xs uppercase tracking-wider">{c.title}</h3>
                    <span className="text-[9px] bg-red-900/50 text-red-400 border border-red-800 px-2 py-0.5 rounded font-black uppercase tracking-widest">
                      {c.severity || 'CRITICAL'}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed mb-3">{c.description}</p>
                  <div className="bg-neutral-950 p-2.5 rounded text-[11px] space-y-1.5 border border-neutral-900">
                    <p className="text-amber-400">
                      <strong>SUSPECT:</strong> {c.suspectInvolved?.name || 'UNLINKED'}
                    </p>
                    <p className="text-cyan-400">
                      <strong>EVIDENCE KEY:</strong> {c.evidenceInvolved?.map((e: any) => e.title).join(', ') || 'N/A'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* VIEW 2: TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="bg-neutral-900/70 border border-neutral-800 rounded-xl p-6 shadow-2xl backdrop-blur">
          <h2 className="text-lg font-extrabold text-amber-400 border-b border-neutral-800 pb-4 mb-6 tracking-wide">
            ⏳ CRIME SCENE CHRONOLOGICAL TIMELINE
          </h2>
          <div className="relative border-l-2 border-amber-500/30 ml-4 space-y-8 pl-6">
            {timelineEvents.map((evt) => (
              <div key={evt._id} className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 bg-amber-500 rounded-full border-4 border-neutral-950 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-lg max-w-3xl">
                  <span className="text-xs font-bold text-amber-400 tracking-wider">
                    {new Date(evt.timestamp).toLocaleString()}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">{evt.title}</h3>
                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed">{evt.description}</p>
                  {evt.verified && (
                    <span className="inline-block mt-3 text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 px-2 py-0.5 rounded font-black tracking-wider">
                      ✓ VERIFIED FACT
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}