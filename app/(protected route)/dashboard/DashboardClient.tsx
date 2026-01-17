"use client"

import { signOut } from "next-auth/react"

export default function DashboardClient({ session }: { session: any }) {
  return (
    <div>
      <h1>Halaman Dashboard</h1>
      <p>Selamat datang, {session.user?.name}</p>

      <pre>{JSON.stringify(session, null, 2)}</pre>

      <button
        onClick={() => signOut()}
        className="w-full py-3 px-6 text-white font-medium bg-red-600 hover:bg-red-700 rounded-lg"
      >
        Log out
      </button>
    </div>
  )
}
