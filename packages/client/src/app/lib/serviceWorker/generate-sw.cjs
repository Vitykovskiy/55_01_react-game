const { injectManifest } = require('workbox-build')

const MAX_FILE_SIZE_CACHE = 5242880

const build = async () => {
  const { count, size } = await injectManifest({
    swSrc: './src/app/lib/serviceWorker/sw-template.js',
    swDest: './dist/client/sw.js',
    globDirectory: './dist',
    globPatterns: ['**/*.{js,css,html,png,svg,jpg,ico}'],
    maximumFileSizeToCacheInBytes: MAX_FILE_SIZE_CACHE, // 5MB
  })

  console.log(`✅ Generated SW: ${count} files, ${size} bytes`)
}

build()
