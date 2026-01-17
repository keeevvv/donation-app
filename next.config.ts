// next.config.mjs
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",       // Folder output service worker
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  
  
  disable: false, // Matikan PWA saat mode dev biar nggak ganggu
  workboxOptions: {
    disableDevLogs: true,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Konfigurasi next.js lainnya di sini
};

export default withPWA(nextConfig);