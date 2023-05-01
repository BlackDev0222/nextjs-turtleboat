import type { NextApiRequest, NextApiResponse } from "next";
import sendgrid from "@sendgrid/mail";
import connectdb from "@/utils/connectdb";
import { v4 as uuid } from "uuid";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY ?? "");

const ERROR_MSG = "Something went wrong in a server.";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let inviteIds: string[] = [];
  const { invitees } = req.body;

  invitees.map(async (invitee: any, idx: any) => {
    const uniqueId: any = uuid();
    inviteIds.push(uniqueId);

    try {
      await sendgrid.send({
        to: invitee,
        from: "vicky@youthcities.org",
        subject: "Welcome to yCITIES",
        text: "Hello",
        html: `<p>Welcome! You are invited to Turtle Boat!</p>
              <p>To continue, click <a href="${process.env.HOME_URL}/invite?id=${uniqueId}">Here!</a></p>`,
        isMultiple: false
      });
    } catch (err: any) {
      return res.status(500).json({ error: ERROR_MSG });
    }
  });

  let invites: Array<any> = [];
  invitees.map((invitee: any, idx: number) => {
    invites.push({
      inviteId: inviteIds[idx],
      from: "admin",
      to: invitee,
      time: new Date(),
      isVerified: false
    });
  });

  return await connectdb()
    .then(async (db: any) => {
      await db
        .collection("invites")
        .insertMany(invites)
        .then(() => res.status(200).json({}))
        .catch((err: any) => res.status(500).json({ error: ERROR_MSG }));
    })
    .catch((err) => res.status(500).json({ error: ERROR_MSG }));
}
