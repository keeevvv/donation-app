import { auth } from "@/lib/auth"

export default auth((req) => {
    const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth
  const isRootPage = pathname === "/"
  const isAuthPage = pathname.startsWith("/auth")
  const isProtectedRoute = pathname.startsWith("/dashboard")


  console.log("Middleware dijalankan untuk path:", pathname)
  // Jika user belum login dan mencoba akses dashboard
  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL("/", req.nextUrl))
  }

  // Jika user sudah login tapi mencoba ke halaman login lagi
  if (isLoggedIn && isRootPage) {
    return Response.redirect(new URL("/dashboard", req.nextUrl))
  }
})

// Tentukan halaman mana saja yang ingin diproteksi oleh middleware
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/"],
}