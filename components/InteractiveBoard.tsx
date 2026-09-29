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
    <div className="space-y-8">
      {/* Search & Filter Toolbar */}
      <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search suspects, evidence, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-sm text-neutral-200 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Tab Switching */}
        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('desk')}
            className={`px-4 py-2 text-xs font-bold rounded-lg border transition ${
              activeTab === 'desk'
                ? 'bg-amber-500 text-neutral-950 border-amber-500'
                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
            }`}
          >
            🕵️ EVIDENCE DESK
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 text-xs font-bold rounded-lg border transition ${
              activeTab === 'timeline'
                ? 'bg-amber-500 text-neutral-950 border-amber-500'
                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
            }`}
          >
            ⏳ TIMELINE VIEW
          </button>
        </div>
      </div>

      {/* Active Suspect Filter Banner */}
      {selectedSuspect && (
        <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg flex justify-between items-center text-xs">
          <p className="text-amber-400 font-bold">
            FILTERED BY SUSPECT: <span className="underline">{selectedSuspect.name}</span>
          </p>
          <button
            onClick={() => setSelectedSuspectId(null)}
            className="text-neutral-400 hover:text-white underline font-semibold"
          >
            Clear Filter ✖
          </button>
        </div>
      )}

      {/* VIEW 1: EVIDENCE DESK */}
      {activeTab === 'desk' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Suspects Column */}
          <section className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-amber-400 border-b border-neutral-800 pb-3 mb-4 flex items-center justify-between">
              <span>🕵️ SUSPECTS</span>
              <span className="text-xs bg-neutral-800 text-neutral-300 px-2.5 py-1 rounded-full">
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
                    className={`cursor-pointer bg-neutral-950/80 border p-4 rounded-lg transition ${
                      isSelected
                        ? 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-950/10'
                        : 'border-neutral-800 hover:border-amber-500/50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-amber-200">{suspect.name}</h3>
                        <p className="text-xs text-neutral-400">AKA: "{suspect.alias}"</p>
                      </div>
                      <span className="text-xs bg-red-950 text-red-400 border border-red-800 px-2 py-0.5 rounded font-bold">
                        {suspect.status}
                      </span>
                    </div>
                    <div className="mt-3 text-xs text-neutral-300 space-y-1">
                      <p><strong className="text-neutral-500">ALIBI:</strong> {suspect.alibi}</p>
                      <p><strong className="text-neutral-500">NOTES:</strong> {suspect.notes}</p>
                    </div>
                    <p className="mt-3 text-[10px] text-amber-400/80 font-bold uppercase tracking-wider">
                      {isSelected ? '✓ Viewing Linked Evidence' : '👉 Click to inspect evidence'}
                    </p>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Evidence Locker */}
          <section className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-cyan-400 border-b border-neutral-800 pb-3 mb-4 flex items-center justify-between">
              <span>🔍 EVIDENCE LOCKER</span>
              <span className="text-xs bg-neutral-800 text-neutral-300 px-2.5 py-1 rounded-full">
                {filteredEvidence.length}
              </span>
            </h2>
            <div className="space-y-4">
              {filteredEvidence.map((item) => (
                <div key={item._id} className="bg-neutral-950/80 border border-neutral-800 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-cyan-200">{item.title}</h3>
                    <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800 px-2 py-0.5 rounded uppercase">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 mt-2">{item.description}</p>
                  <div className="mt-3 pt-2 border-t border-neutral-900 text-[11px] text-neutral-400 flex justify-between">
                    <span>📍 {item.locationFound}</span>
                    {item.connectedSuspects?.map((s: any) => (
                      <span key={s._id} className="text-amber-400 font-semibold">
                        Linked: {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contradictions */}
          <section className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-red-500 border-b border-neutral-800 pb-3 mb-4 flex items-center justify-between">
              <span>⚡ CONTRADICTIONS</span>
              <span className="text-xs bg-red-950 text-red-400 px-2.5 py-1 rounded-full font-bold">
                {filteredContradictions.length}
              </span>
            </h2>
            <div className="space-y-4">
              {filteredContradictions.map((c) => (
                <div key={c._id} className="bg-red-950/20 border border-red-900/60 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-red-300 text-sm uppercase">{c.title}</h3>
                    <span className="text-[10px] bg-red-900/40 text-red-400 px-2 py-0.5 rounded border border-red-800 font-bold">
                      {c.severity}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed mb-3">{c.description}</p>
                  <div className="bg-neutral-950 p-2.5 rounded text-[11px] space-y-1 border border-neutral-900">
                    <p className="text-amber-400">
                      <strong>Suspect Involved:</strong> {c.suspectInvolved?.name}
                    </p>
                    <p className="text-cyan-400">
                      <strong>Evidence Key:</strong> {c.evidenceInvolved?.map((e: any) => e.title).join(', ')}
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
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 shadow-2xl">
          <h2 className="text-xl font-bold text-amber-400 border-b border-neutral-800 pb-4 mb-6">
            ⏳ CRIME SCENE TIMELINE
          </h2>
          <div className="relative border-l-2 border-amber-500/30 ml-4 space-y-8 pl-6">
            {timelineEvents.map((evt) => (
              <div key={evt._id} className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 bg-amber-500 rounded-full border-4 border-neutral-950" />
                <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-lg max-w-2xl">
                  <span className="text-xs font-bold text-amber-400">
                    {new Date(evt.timestamp).toLocaleString()}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">{evt.title}</h3>
                  <p className="text-xs text-neutral-300 mt-2">{evt.description}</p>
                  {evt.verified && (
                    <span className="inline-block mt-3 text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-bold">
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