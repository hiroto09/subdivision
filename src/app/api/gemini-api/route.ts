import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { prompt_post } = await req.json();
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContentStream(prompt_post);
        
        // ここで待機してテキストを取り出します
        const response = await result.response;
        const responseText = await response.text(); // 非同期処理なのでawaitが必要

        return NextResponse.json({
            message: responseText
        });
    } catch (error) {
        console.error("Error generating content:", error);
        return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
    }
}
