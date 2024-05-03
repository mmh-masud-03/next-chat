import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import User from "@/models/User";
import { connectToDb } from "@/mongodb";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        // Define your credentials configuration here (e.g., fields like email and password)
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid username or password");
        }
        await connectToDb();
        const user = await User.findOne({ email: credentials.email });
        if (!user || !user?.password) {
          throw new Error("Invalid username or password");
        }
        const isMatched = await compare(credentials.password, user?.password);
        if (!isMatched) {
          throw new Error("Invalid username or password");
        }
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      if (!session.user) {
        throw new Error("User session is undefined");
      }
      const mongodbUser = await User.findOne({ email: session.user.email });
      //   session.user.id = mongodbUser._id.toString();
      session.user = { ...session.user, ...mongodbUser._doc };

      console.log(session);

      return session;
    },
  },
});

export { handler as GET, handler as POST };
