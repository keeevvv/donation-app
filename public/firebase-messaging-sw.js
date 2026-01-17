importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js")

firebase.initializeApp({
  apiKey:"AIzaSyD1w5XUbNs3qXY7tggWx4xnoGUqIzQkjm4",
  authDomain: "notification-16d05.firebaseapp.com",
  projectId: "notification-16d05",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456",
})

const messaging = firebase.messaging()

// 1. Menangani pesan saat background
messaging.onBackgroundMessage((payload) => {
  console.log("FCM background message received", payload);

  // Jika payload memiliki 'notification', SDK akan menampilkannya otomatis.
  if (payload.notification) {
    return; 
  }

  // Jika payload hanya 'data', kita buat notifikasi manual
  const title = payload.data?.title || "Notification";
  const notificationOptions = {
    body: payload.data?.body || "",
    icon: "/icon512_maskable.png",
    data: {
      // Pastikan URL disimpan di sini agar bisa diakses saat diklik
      url: payload.data?.click_action || payload.data?.url || "/"
    },
  };

  return self.registration.showNotification(title, notificationOptions);
});

// 2. LOGIKA BARU: Menangani klik pada notifikasi
self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // Tutup banner notifikasi

  // Ambil URL dari data yang dikirim
  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Jika tab aplikasi sudah terbuka, fokuskan ke tab tersebut
      for (let i = 0; i < windowClients.length; i++) {
        let client = windowClients[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // Jika belum terbuka, buka tab baru
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});