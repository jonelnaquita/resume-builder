import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(request: NextRequest) {
  try {
    const { text, type, context } = await request.json();

    if (!text || !type) {
      return NextResponse.json(
        { error: "Text and type are required" },
        { status: 400 }
      );
    }

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

    // Call OpenAI GPT-4o-mini for text enhancement
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional resume writer who helps enhance resume content.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const enhancedText = completion.choices[0]?.message?.content?.trim() || "";

    if (!enhancedText) {
      throw new Error("No response from OpenAI");
    }

    return NextResponse.json({ enhancedText });
  } catch (error) {
    console.error("AI enhancement error:", error);
    return NextResponse.json(
      { error: "Failed to enhance text" },
      { status: 500 }
    );
  }
}
