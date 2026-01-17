"use client";

import { useEffect, useState } from "react";

export default function InstallPWA() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault(); // Mencegah browser memunculkan prompt otomatis yang membosankan
      setSupportsPWA(true); // Menandakan browser support install
      setPromptInstall(e); // Simpan event ini untuk dipanggil nanti
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const onClick = (evt: any) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    // Pemicu prompt install asli browser
    promptInstall.prompt();
  };

  // Jika browser tidak support atau sudah di-install, tombol tidak muncul
  if (!supportsPWA) {
    return null;
  }

  return (
    <button
      className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg font-semibold z-50 hover:bg-blue-700 transition"
      id="setup_button"
      aria-label="Install app"
      title="Install App"
      onClick={onClick}
    >
      📲 Install Aplikasi
    </button>
  );
}