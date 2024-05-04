//find all users

import { connectToDb } from "@/mongodb";
import User from "@/models/User";

const GET = async () => {
  try {
    connectToDb();
    const allUsers = User.find();
    return new Response(JSON.stringify(allUsers), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Error fetching user", { status: 500 });
  }
};
