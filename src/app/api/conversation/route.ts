import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
const config = {
  apiKey: process.env.OPENAI_API_KEY,
};
const openai = new OpenAI(config);

export async function POST(req: Request) {
  try {
    console.log({ config });
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const chatCompletion = await openai.chat.completions.create({
      // messages: [{ role: 'user', content: 'Say this is a test' }],
      messages,
      model: "gpt-3.5-turbo",
    });
    return NextResponse.json(chatCompletion);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
