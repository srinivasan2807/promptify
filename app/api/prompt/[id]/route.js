// GET
import Prompt from "@models/Prompt";
import { connectDb } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectDb();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("failed to get prompts", { status: 500 });
  }
};

// Patch
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectDb();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    console.log(existingPrompt)
    await existingPrompt.save();
    return new Response(`Prompt updated: ${JSON.stringify(existingPrompt)}`, {
      status: 200,
    });
  } catch (error) {
    return new Response("Error updating prompt", { status: 500 });
  }
};

// Delete
export const DELETE = async (request, { params }) => {
  try {
    await connectDb();
    await Prompt.findByIdAndRemove(params.id);
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
