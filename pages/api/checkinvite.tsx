import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/utils/mongodb";

const SERVER_ERR_MSG = "Something went wrong in a server.";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { linkId } = req.body;
  try {
    const client = await clientPromise;
    const db = client.db("turtleboat-dev");
    const result = await db
      .collection("invites")
      .find({
        inviteId: linkId,
      })
      .toArray();
    if (result.length == 0) {
      const inviteTime = new Date(result.time);
      const duration = new Date().getTime() - inviteTime.getTime();
      if (duration >= 1000 * 60 * 60) {
        res.status(402).json({ err: "Your invite has expired!" });
      } else {
        res.status(402).json({ err: "Your invite is invalid!" });
      }
    } else {
      if (result[0].isExpired == true) {
        res.status(402).json({ err: "You already registered to Turtle Boat." });
      } else {
        res.status(200).json({ from: result[0].from, image: result[0].image });
      }
    }
  } catch (err) {
    res.status(500).json({ err: SERVER_ERR_MSG });
  }
}
