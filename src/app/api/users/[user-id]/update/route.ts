import User from "@/models/User";
import { connectToDb } from "@/mongodb";

export const POST = async (req: Request, { params }: { params: any }) => {
  try {
    // Establish MongoDB connection
    await connectToDb();

    // Extract userId from params
    const { userId } = params;

    // Parse request body
    const body = req.body as { username: string; profileImage: string } | null;
    if (!body) {
      return new Response("Invalid request body", { status: 400 });
    }
    const { username, profileImage } = body;

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        profileImage,
      },
      { new: true }
    );

    // Check if user was updated successfully
    if (!updatedUser) {
      // If user was not found, return 404 Not Found
      return new Response("User not found", { status: 404 });
    }

    // Return updated user
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (err) {
    console.error("Error updating user:", err);
    // If an error occurs, return 500 Internal Server Error
    return new Response("Failed to update user", { status: 500 });
  }
};
