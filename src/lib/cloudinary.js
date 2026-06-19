/* ============================================================
   Cloudinary — delivery helpers.

   For a frontend (delivery only) you need just the CLOUD NAME,
   which is public and safe to ship. The API key / secret are for
   UPLOADING and must never live in client code — upload via the
   Cloudinary dashboard or a server/local script instead.

   Usage:
     import { cldVideo, cldImage } from '../lib/cloudinary'
     <video src={cldVideo('homepage-bg')} ... />
     <img   src={cldImage('some-photo')} ... />

   `publicId` is whatever you name the asset in Cloudinary (it can
   include folders, e.g. 'aurelio/home-bg'). f_auto + q_auto let
   Cloudinary pick the best format (webm/mp4/avif…) and quality per
   browser automatically.
   ============================================================ */

export const CLOUD_NAME = 'dmova2hvu'

const BASE = `https://res.cloudinary.com/${CLOUD_NAME}`

/** Build a delivery URL. resource: 'video' | 'image'. */
export function cldUrl(publicId, { resource = 'image', transforms = 'f_auto,q_auto' } = {}) {
  if (!publicId) return ''
  const t = transforms ? `${transforms}/` : ''
  return `${BASE}/${resource}/upload/${t}${publicId}`
}

/** Optimised video delivery URL. Delivers an H.264 .mp4 (universally
    playable in a single <video src>) at automatic quality. */
export const cldVideo = (publicId, transforms = 'q_auto') => {
  if (!publicId) return ''
  const t = transforms ? `${transforms}/` : ''
  return `${BASE}/video/upload/${t}${publicId}.mp4`
}

/** Optimised image delivery URL (auto format + quality). */
export const cldImage = (publicId, transforms = 'f_auto,q_auto') =>
  cldUrl(publicId, { resource: 'image', transforms })

/** Poster/first-frame still for a video (handy as a <video poster>). */
export const cldVideoPoster = (publicId) =>
  `${BASE}/video/upload/f_auto,q_auto,so_0/${publicId}.jpg`
