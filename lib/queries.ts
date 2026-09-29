import { defineQuery } from 'next-sanity'

export const SUSPECTS_QUERY = defineQuery(`
  *[_type == "suspect"] | order(name asc) {
    _id,
    name,
    alias,
    status,
    alibi,
    notes,
    "photoUrl": photo.asset->url
  }
`)

export const EVIDENCE_QUERY = defineQuery(`
  *[_type == "evidence"] | order(_createdAt desc) {
    _id,
    title,
    type,
    description,
    locationFound,
    "imageUrl": image.asset->url,
    connectedSuspects[]-> {
      _id,
      name,
      alias
    }
  }
`)

export const CONTRADICTIONS_QUERY = defineQuery(`
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
`)

export const TIMELINE_QUERY = defineQuery(`
  *[_type == "timelineEvent"] | order(timestamp asc) {
    _id,
    title,
    timestamp,
    description,
    verified,
    relatedSuspects[]-> {
      _id,
      name
    }
  }
`)