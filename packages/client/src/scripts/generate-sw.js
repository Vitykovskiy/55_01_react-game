import { injectManifest } from 'workbox-build';

async function build() {
  const { count, size } = await injectManifest({
    swSrc: './src/sw-template.js',
    swDest: './dist/client/sw.js',
    globDirectory: './dist',
    globPatterns: [
      '**/*.{js,css,html,png,svg,jpg,ico}'
    ],
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
  });

  console.log(`✅ Generated SW: ${count} files, ${size} bytes`);
}

build();