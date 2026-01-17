import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // --- SIMULASI MOCK BACKEND UNTUK CREDENTIALS ---
        console.log("Mock: Mencoba login dengan", credentials.email);

        // Simulasi delay jaringan
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (credentials.email === "test@example.com" && credentials.password === "password123") {
          return {
            id: "u-001",
            name: "Budi Mock",
            email: "test@example.com",
            accessToken: "mock_jwt_token_from_backend_credentials", // Token buatan
          };
        }
        
        // Jika salah, return null
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        // --- SIMULASI MOCK BACKEND UNTUK GOOGLE ---
        console.log("Mock: Mengecek email Google di database backend...", user.email);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        // SKENARIO 1: User sudah terdaftar (Gunakan email ini untuk tes login berhasil)
        if (user.email === "lulus@gmail.com") {
          (user as any).accessToken = "mock_jwt_token_from_google_existing";
          return true;
        }

        // SKENARIO 2: User belum ada di DB backend
        // Redirect ke halaman registrasi tambahan
        return false;
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      session.sessionToken = token.accessToken as string;
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  
  session: { strategy: "jwt" },
})