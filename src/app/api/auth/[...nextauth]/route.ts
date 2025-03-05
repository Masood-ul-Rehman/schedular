import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || "";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;

      // Check if user exists in Supabase
      const { data: existingUser } = await supabase
        .from("users")
        .select("*")
        .eq("email", user.email)
        .single();

      if (!existingUser) {
        // Create new user in Supabase
        const { error } = await supabase.from("users").insert([
          {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar_url: user.image,
            token_identifier: account?.providerAccountId || "",
          },
        ]);

        if (error) {
          console.error("Error creating user in Supabase:", error);
          return false;
        }
      }

      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
});

export { handler as GET, handler as POST };
