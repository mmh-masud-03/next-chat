import Chat from "@/models/Chat";
import { connectToDb } from "@/mongodb";
export const GET = async (req) => {
  await connectToDb();
  const body = req.json();
  const { currentUserId, isGroup, members, name, groupPhoto } = body;
  const query=
};
