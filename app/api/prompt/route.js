import Prompt from "@models/Prompt";
import { connectDb } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectDb();
    const prompt = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompt), { status: 200 });

  } catch (error) {
    return new Response("failed to get prompts", { status: 500 });
  }
};
