"use client";
import InstallPWA from "@/components/InstallPWA";
import Image from "next/image";
import { signIn } from "next-auth/react"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <button
      onClick={() => signIn()}
      className="w-full py-3 px-6 text-white font-medium bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg transition duration-200 shadow-md flex items-center justify-center gap-2"
    >
      Masuk ke Akun
    </button>
        <InstallPWA />
      </main>
    </div>
  );
}
