# 🕵️ GROQ & Dagger | Cyber-Noir Investigation Desk

**GROQ & Dagger** is an interactive detective investigation board built with **Next.js** and **Sanity CMS**, specifically created for the **DEV.to x Sanity Challenge (Path 2: GROQ & Schema Architecture)**.

The application models a complex investigation web where **Suspects**, **Evidence**, **Timeline Events**, and **Contradictions** are stored as interconnected schemas in Sanity and queried using advanced GROQ dereferencing (`->`).

---

## ⚡ Key Technical Highlights (Path 2 Focus)

- **Deep Relational Dereferencing (`->`):** Fetches contradictions and expands nested connected evidence and suspect details in a single GROQ request.
- **Relational Schema Modeling:** Uses `reference` arrays to connect evidence items to suspect profiles.
- **Interactive Detective UI:** Allows users to click on any suspect to filter linked evidence, inspect alibis, and reveal case-breaking contradictions in real-time.
- **Chronological Case Timeline:** Displays verified events in a visual step-by-step timeline view.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router, Server Components)
- **Content Platform:** Sanity Studio (Sanity v3)
- **Query Language:** GROQ (Graph Relational Object Queries)
- **Styling:** Tailwind CSS (Cyber-Noir Theme)
- **Deployment Ready:** Vercel & Sanity Content Lake

---

## 📁 Schema Architecture

| Schema | Purpose | Primary Fields |
| :--- | :--- | :--- |
| `suspect` | Core suspect identity | Name, Alias, Status, Alibi, Notes |
| `evidence` | Physical or digital evidence | Title, Type, Location, `connectedSuspects[]` (References) |
| `timelineEvent` | Chronological case order | Title, Timestamp, Description, Verified Flag |
| `contradiction` | Case discrepancies | Severity, `suspectInvolved` (Ref), `evidenceInvolved[]` (Refs) |

---

## 🔍 Featured GROQ Query

```groq
*[_type == "contradiction"] {
  _id,
  title,
  description,
  severity,
  evidenceInvolved[]-> {
    _id,
    title,
    type
  },
  suspectInvolved-> {
    _id,
    name,
    alias,
    status
  }
}