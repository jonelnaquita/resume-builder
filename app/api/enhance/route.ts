import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const { text, type, context } = await request.json();

    if (!text || !type) {
      return NextResponse.json(
        { error: "Text and type are required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    let prompt = "";

    if (type === "summary") {
      prompt = `You are a professional resume writer. Refine the following professional summary to sound more professional, concise, and impactful for a resume. Keep it to 2-3 sentences maximum. Focus on achievements and value proposition. Return only the refined summary without any additional commentary.

Original summary:
${text}`;
    } else if (type === "experience") {
      prompt = `You are a professional resume writer. Refine the following job experience description into professional, achievement-focused bullet points for a resume. Follow these rules strictly:
1. Return ONLY 3-5 bullet points
2. Each bullet point should start with a strong action verb
3. Focus on quantifiable achievements and impact
4. Keep each point concise (1-2 lines maximum)
5. Use professional language suitable for a resume
6. Return ONLY the bullet points, one per line, without bullet symbols or numbers
7. Do NOT include any introduction, explanation, or additional commentary

${context ? `Job context: ${context}\n\n` : ""}Original description:
${text}`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const enhancedText = response.text().trim();

    return NextResponse.json({ enhancedText });
  } catch (error) {
    console.error("AI enhancement error:", error);
    return NextResponse.json(
      { error: "Failed to enhance text" },
      { status: 500 }
    );
  }
}
