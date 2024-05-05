import User from "@/models/User";
import Chat from "@/models/Chat";
import { connectToDb } from "@/mongodb";

export const GET = async (req, { params }) => {
  try {
    await connectToDb();
    const { userId } = params;
    const allChats = await Chat.find({ members: userId })
      .sort({
        lastMessageAt: -1,
      })
      .populate({
        path: "members",
        model: User,
      })
      .exec();
    return new Response(JSON.stringify(allChats), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Error fetching chats", { status: 500 });
  }
};
