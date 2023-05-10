import type { NextApiRequest, NextApiResponse } from "next";
import sendgrid from "@sendgrid/mail";
import clientPromise from "@/utils/mongodb";
import { v4 as uuid } from "uuid";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY ?? "");

const SERVER_ERR_MSG = "Something went wrong in a server.";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let inviteIds: string[] = [];
  const { invitees } = req.body;
  // Get session from request
  const session: Session | null = await getServerSession(req, res, authOptions);
  // Send invite emails to invitees
  invitees.map(async (invitee: any, idx: any) => {
    const uniqueId: any = uuid();
    inviteIds.push(uniqueId);

    try {
      await sendgrid.send({
        to: invitee,
        from: "vicky@youthcities.org",
        subject: "Invite from Turtle Boat",
        templateId: "d-b1188b9523e949e3af6589ec3921efe0",
        dynamicTemplateData: {
          inviteAddress: `${process.env.HOME_URL}/invite?id=${uniqueId}`,
        },
        isMultiple: false,
      });
    } catch (err: any) {
      return res.status(500).json({ err: SERVER_ERR_MSG });
    }
  });
  // Prepare data to input into database
  let invites: Array<any> = [];
  invitees.map((invitee: any, idx: number) => {
    invites.push({
      inviteId: inviteIds[idx],
      from: session?.user?.name,
      image: session?.user?.image,
      to: invitee,
      time: new Date(),
      isExpired: false,
    });
  });
  // Access database and input invites data
  try {
    const client = await clientPromise;
    const db = client.db("turtleboat-dev");
    const result = await db
      .collection("invites")
      .insertMany(invites);
    if (result.acknowledged) {
      return res.status(200).json({});
    } else {
      return res.status(500).json({ err: SERVER_ERR_MSG });
    }
  } catch (err) {
    return res.status(500).json({ err: SERVER_ERR_MSG });
  }
}
