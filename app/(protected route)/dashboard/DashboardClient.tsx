"use client";

import { requestNotificationPermission } from "@/lib/fcm";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DashboardClient({ session }: { session: any }) {

    const [token, setToken] = useState<String | null>(null);
  useEffect(() => {
    requestNotificationPermission().then(setToken);
  }, []);

  return (
    <div>
      <h1>Halaman Dashboard</h1>
      <p>Selamat datang, {session.user?.name}</p>
      <p>FCM Token: {token}</p>

      <pre>{JSON.stringify(session, null, 2)}</pre>

      <button
        onClick={() => signOut()}
        className="w-full py-3 px-6 text-white font-medium bg-red-600 hover:bg-red-700 rounded-lg"
      >
        Log out
      </button>
    </div>
  );
}
