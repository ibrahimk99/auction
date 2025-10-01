// "use server";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/models/User";
import connectDB from "@/app/lib/connectDB";
import ActiveSession from "@/app/models/ActiveSession";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        await connectDB();

        const activeUser = await ActiveSession.findOne();
        if (activeUser) {
          throw new Error("Another user is already logged in. Logout first.");
        }
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("User not found");

        const isValid = await user.comparePassword(credentials.password);
        if (!isValid) throw new Error("Invalid password");
        // Save active session in DB
        await ActiveSession.create({ userId: user._id });

        return {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.active = true;
      }
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  // 👇 Add events hook here
  events: {
    async signOut({ token }) {
      await connectDB();
      if (token?.id) {
        await ActiveSession.deleteOne({ userId: token.id });
        console.log(`Active session removed for user: ${token.id}`);
      }
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
