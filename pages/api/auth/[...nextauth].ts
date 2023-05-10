import cookie from "cookie";
import NextAuth from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import GoogleProvider from "next-auth/providers/google";
import LinkedinProvider from "next-auth/providers/linkedin";
import clientPromise from "@/utils/mongodb";

const SERVER_ERR_MSG = "Something went wrong in a server."

export const authOptions: any = {
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
}

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
    },
    callbacks: {
      async session({ session }: any) {
        if (session) {
          try {
            const client = await clientPromise;
            const db = client.db("turtleboat-dev");
            const result = await db
              .collection("users")
              .find({ email: session.user.email })
              .toArray();
            if (!result.length) {
              return Promise.reject(new Error("Couldn't find your account on DB!"));
            }
            session.user.role = result[0].role;
            session.user.isNewUser = result[0].isNewUser;
          } catch (err: any) {
            return Promise.reject(err);
          }
          return Promise.resolve(session);
        }
        return Promise.reject(new Error("Your session has expired!"));
      },
      async signIn({ user }: any) {
        try {
          const client = await clientPromise;
          const db = client.db("turtleboat-dev");

          const verifiedUsers = await db
            .collection("users")
            .find({ email: user.email })
            .toArray();
          if (verifiedUsers.length > 0) {
            return Promise.resolve(true);
          } else {
            const inviteId = req.cookies.hasValidInvite;

            const removeCookie = cookie.serialize("hasValidInvite", "", {
              path: "/",
              httpOnly: true,
            });
            res.setHeader("Set-Cookie", removeCookie);

            if (!inviteId) {
              return Promise.reject(new Error("You have no account on Turtle Boat."));
            } else {
              const verifiedInvites = await db
                .collection("invites")
                .find({ inviteId: inviteId, isExpired: false })
                .toArray();
              if (!verifiedInvites.length) {
                return Promise.reject(new Error("Your invite url is invalid or expired!"));
              } else {
                let result = await db
                  .collection("invites")
                  .updateOne({ inviteId: inviteId }, { $set: { isExpired: true } });
                if (!result.matchedCount) {
                  return Promise.reject(new Error(SERVER_ERR_MSG));
                } else {
                  result = await db
                    .collection("users")
                    .insertOne({ ...user, role: "member", isNewUser: true });
                  if (!result.acknowledged) {
                    return Promise.reject(new Error(SERVER_ERR_MSG));
                  } else {
                    return Promise.resolve(true);
                  }
                }
              }
            }
          }
        } catch (err) {
          return Promise.reject(new Error(SERVER_ERR_MSG));
        }
      },
    },
  };
  return await NextAuth(req, res, authOptions);
}
