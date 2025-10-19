import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, profile }) {
      (token as any).role = (token as any).role || 'VISITOR';
      const ownerEmail = process.env.OWNER_EMAIL?.toLowerCase();
      if (profile && (profile as any).email && ownerEmail &&
          (profile as any).email.toLowerCase() === ownerEmail) {
        (token as any).role = 'OWNER';
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).role = (token as any).role || 'VISITOR';
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
