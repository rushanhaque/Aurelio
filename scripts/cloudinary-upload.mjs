/* ============================================================
   Cloudinary upload helper — run LOCALLY to push videos/images
   into Cloudinary and get back their public IDs + URLs.

   SECURITY: this file contains NO secret. Credentials are read
   from the CLOUDINARY_URL environment variable at runtime, so the
   secret never lives in the repo (and can't be pushed to GitHub).
   Get CLOUDINARY_URL from:
     https://console.cloudinary.com/app/settings/api-keys

   One-time:  npm i -D cloudinary

   Run (bash):
     CLOUDINARY_URL="cloudinary://<API_KEY>:<API_SECRET>@dmova2hvu" \
       node scripts/cloudinary-upload.mjs ./assets/HomePage/HomePageBG.mp4 aurelio/home-bg

   Run (PowerShell):
     $env:CLOUDINARY_URL="cloudinary://<API_KEY>:<API_SECRET>@dmova2hvu"
     node scripts/cloudinary-upload.mjs ./assets/HomePage/HomePageBG.mp4 aurelio/home-bg

   Then copy the printed public ID into HERO_VIDEO_ID (src/components/
   sections/Hero.jsx) or pass it to cldVideo()/cldImage().
   ============================================================ */
import { existsSync } from 'node:fs'

if (!process.env.CLOUDINARY_URL) {
  console.error('✗ Set the CLOUDINARY_URL env var first (see the header of this file).')
  process.exit(1)
}

const [file, publicId] = process.argv.slice(2)
if (!file) {
  console.error('Usage: node scripts/cloudinary-upload.mjs <file> [publicId]')
  process.exit(1)
}
if (!existsSync(file)) {
  console.error(`✗ File not found: ${file}`)
  process.exit(1)
}

let cloudinary
try {
  ;({ v2: cloudinary } = await import('cloudinary'))
} catch {
  console.error('✗ The cloudinary SDK is not installed. Run:  npm i -D cloudinary')
  process.exit(1)
}

// cloudinary.config() auto-reads CLOUDINARY_URL from the environment.
cloudinary.config({ secure: true })

const isVideo = /\.(mp4|mov|webm|m4v|avi|mkv)$/i.test(file)

console.log(`Uploading ${file}${publicId ? ` as "${publicId}"` : ''} …`)
try {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: isVideo ? 'video' : 'image',
    public_id: publicId || undefined,
    overwrite: true,
  })
  console.log('\n✓ Uploaded')
  console.log('  public_id :', res.public_id)
  console.log('  format    :', res.format)
  console.log('  bytes     :', res.bytes)
  console.log('  secure_url:', res.secure_url)
  console.log(`\nUse in code: cld${isVideo ? 'Video' : 'Image'}('${res.public_id}')`)
} catch (err) {
  console.error('✗ Upload failed:', err?.message || err)
  process.exit(1)
}
