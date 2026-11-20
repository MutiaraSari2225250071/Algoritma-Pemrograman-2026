// Service worker Pasar Pintar: menyimpan file aplikasi agar bisa dipakai tanpa internet.
// Naikkan VERSI setiap kali index.html diubah, supaya HP siswa mengambil versi baru.
const VERSI = 'pasar-pintar-v0.2.0';
const FILE_INTI = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSI).then((c) => c.addAll(FILE_INTI)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSI).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Halaman: coba jaringan dulu (agar dapat versi terbaru), kalau offline pakai simpanan.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => { const salin = res.clone(); caches.open(VERSI).then((c) => c.put('./index.html', salin)); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // File lain (ikon, font): pakai simpanan dulu, kalau belum ada ambil dari jaringan lalu simpan.
  event.respondWith(
    caches.match(req).then((tersimpan) => tersimpan || fetch(req).then((res) => {
      if (res && (res.ok || res.type === 'opaque')) {
        const salin = res.clone();
        caches.open(VERSI).then((c) => c.put(req, salin));
      }
      return res;
    }).catch(() => tersimpan))
  );
});
