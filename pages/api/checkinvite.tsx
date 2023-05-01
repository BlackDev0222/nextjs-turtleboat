import { NextApiRequest, NextApiResponse } from "next"
import connectdb from "@/utils/connectdb"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { linkId } = req.body;
  return await connectdb()
    .then(async (db: any) => {
      const result = await db.collection("invites").find({
        inviteId: linkId,
        isVerified: false,
      }).toArray();
      if (result.length == 0) {
        res.status(402).json({ err: "You are accessing illegally!" });
      } else {
        res.status(200).json({});
      }
    })
    .catch(err => res.status(500).json({ err: "Something went wrong in server." }));
}