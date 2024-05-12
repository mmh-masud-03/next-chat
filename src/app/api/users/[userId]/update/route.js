import User from "../../../../../models/User";
import { connectToDb } from "../../../../../mongodb";

export const POST = async (req, { params }) => {
  try {
    await connectToDb();

    const { userId } = params;

    const body = await req.json();

    const { username, profileImage } = body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        profileImage,
      },
      { new: true }
    );

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to update user", { status: 500 })
  }
};