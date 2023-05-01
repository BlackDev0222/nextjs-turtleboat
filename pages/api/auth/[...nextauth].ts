import NextAuth from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import GoogleProvider from "next-auth/providers/google";
import LinkedinProvider from "next-auth/providers/linkedin";
import connectdb from "@/utils/connectdb";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.inviteId) {
    const cookieValue: string = req.query.inviteId.toString();
    const inviteCookie = cookie.serialize("hasValidInvite", cookieValue, {
      path: "/",
      httpOnly: true,
    });
    res.setHeader("Set-Cookie", inviteCookie);
  }

  const authOptions: any = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      }),
      LinkedinProvider({
        clientId: process.env.LINKEDIN_CLIENT_ID ?? "",
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET ?? "",
      }),
    ],
    pages: {
      error: "/",
      signOut: "/",
      verifyRequest: "/auth/signin",
    },
    callbacks: {
      async session({ session }: any) {
        console.log(session);
        const db: any = await connectdb();
        const result = await db
          .collection("users")
          .find({ email: session.user.email })
          .toArray();
        session.user.role = result[0].role;
        return Promise.resolve(session);
      },
      async signIn({ user }: any) {
        const db: any = await connectdb();
        const verifiedUsers = await db
          .collection("users")
          .find({ email: user.email })
          .toArray();
        if (verifiedUsers.length > 0) {
          return true;
        }

        if (!req.cookies.hasValidInvite) {
          return false;
        }
        const inviteId = req.cookies.hasValidInvite;

        const verifiedInvites = await db
          .collection("invites")
          .find({ inviteId: inviteId })
          .toArray();
        if (!verifiedInvites.length) {
          return false;
        }

        let result = await db
          .collection("invites")
          .updateOne({ inviteId: inviteId }, { $set: { isVerified: true } });
        if (!result.matchedCount) {
          return false;
        }
        result = await db
          .collection("users")
          .insertOne({ ...user, role: "member" });
        if (!result.acknowledged) {
          return false;
        }
        return true;
      },
    },
    cookies: true,
  };
  return await NextAuth(req, res, authOptions);
}
