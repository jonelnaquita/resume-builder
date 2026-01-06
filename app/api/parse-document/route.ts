import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

// Configure fetch to bypass SSL in development
// @ts-ignore - NODE_TLS_REJECT_UNAUTHORIZED is a valid Node.js env var
if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(request: NextRequest) {
  try {
    // Validate API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error:
            "OpenAI API key is not configured. Please add OPENAI_API_KEY to your environment variables.",
          details: "Missing API key",
        },
        { status: 500 }
      );
    }

    const { file, fileType } = await request.json();

    if (!file || !fileType) {
      return NextResponse.json(
        { error: "File and file type are required" },
        { status: 400 }
      );
    }

    const prompt = `You are a professional resume parser. Analyze the provided resume document (PDF or image) and extract ALL information in a structured JSON format.

IMPORTANT INSTRUCTIONS:
1. Extract ALL text content from the resume accurately
2. Organize information into the following sections
3. Return ONLY valid JSON, no markdown, no explanations, no additional text
4. If a section is not present in the resume, use empty strings or empty arrays
5. For work experience and projects, extract bullet points exactly as they appear
6. For dates, use YYYY-MM format (e.g., "2020-01" for January 2020)

Return the data in this EXACT JSON structure:
{
  "personalInfo": {
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "linkedin": "string or empty",
    "website": "string or empty",
    "summary": "string - professional summary"
  },
  "experience": [
    {
      "id": "unique_id_1",
      "company": "string",
      "position": "string",
      "location": "string",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM or empty if current",
      "current": boolean,
      "description": "string - all bullet points as plain text separated by newlines"
    }
  ],
  "education": [
    {
      "id": "unique_id_1",
      "institution": "string",
      "degree": "string",
      "field": "string",
      "location": "string",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM",
      "gpa": "string or empty"
    }
  ],
  "skills": [
    {
      "id": "unique_id_1",
      "category": "string - e.g., Programming Languages",
      "skills": ["skill1", "skill2", "skill3"]
    }
  ],
  "projects": [
    {
      "id": "unique_id_1",
      "name": "string",
      "description": "string",
      "technologies": "string - comma separated",
      "link": "string or empty",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM"
    }
  ],
  "certifications": [
    {
      "id": "unique_id_1",
      "name": "string",
      "issuer": "string",
      "date": "YYYY-MM",
      "link": "string or empty"
    }
  ]
}

Now analyze the resume and extract all information:`;

    // Use the base64 data URL directly for images (JPEG, PNG)
    const imageUrl = file;

    // Call GPT-4o-mini with vision capabilities
    let response;
    try {
      response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt,
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                  detail: "high", // Use high detail for better text extraction
                },
              },
            ],
          },
        ],
        max_tokens: 4096,
        temperature: 0.1, // Low temperature for more consistent extraction
      });
    } catch (apiError: any) {
      console.error("OpenAI API error:", {
        message: apiError?.message,
        code: apiError?.code,
        type: apiError?.type,
        status: apiError?.status,
      });

      // Check for specific error types
      if (
        apiError?.code === "UNABLE_TO_GET_ISSUER_CERT_LOCALLY" ||
        apiError?.message?.includes("certificate") ||
        apiError?.message?.includes("SSL")
      ) {
        return NextResponse.json(
          {
            error:
              "SSL connection error. This is a network configuration issue. Please check your internet connection and firewall settings, or try again later.",
            details: "Certificate validation failed",
          },
          { status: 500 }
        );
      }

      if (apiError?.code === "insufficient_quota" || apiError?.status === 429) {
        return NextResponse.json(
          {
            error:
              "OpenAI API quota exceeded. Please try again later or contact support.",
            details: apiError?.message,
          },
          { status: 429 }
        );
      }

      if (apiError?.status === 401) {
        return NextResponse.json(
          {
            error:
              "OpenAI API authentication failed. Please check your API key configuration.",
            details: "Invalid API key",
          },
          { status: 500 }
        );
      }

      // Generic API error
      return NextResponse.json(
        {
          error: "Please import JPEG or PNG file for best results.",
          details: apiError?.message || "Unknown API error",
        },
        { status: 500 }
      );
    }

    const textResponse = response.choices[0]?.message?.content?.trim() || "";

    if (!textResponse) {
      throw new Error("No response from OpenAI");
    }

    // Remove markdown code blocks if present
    let cleanedResponse = textResponse
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    // Parse the JSON response
    let resumeData;
    try {
      resumeData = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      console.error("Raw response:", cleanedResponse);
      throw new Error(
        "Failed to parse AI response. The AI did not return valid JSON."
      );
    }

    // Helper function to remove bullet points from text
    const removeBullets = (text: string): string => {
      if (!text) return "";
      return text
        .split("\n")
        .map((line) => line.trim())
        .map((line) => {
          // Remove common bullet point characters and patterns
          return line
            .replace(/^[•\-\*\◦\▪\▫\→\⇒\➢\➤\✓\✔]\s*/g, "") // Remove bullet chars
            .replace(/^\d+[\.\)]\s*/g, "") // Remove numbered lists (1. or 1))
            .replace(/^[a-z][\.\)]\s*/gi, "") // Remove lettered lists (a. or a))
            .trim();
        })
        .filter((line) => line.length > 0) // Remove empty lines
        .join("\n");
    };

    // Validate and ensure all required fields exist
    const validatedData = {
      personalInfo: {
        fullName: resumeData.personalInfo?.fullName || "",
        email: resumeData.personalInfo?.email || "",
        phone: resumeData.personalInfo?.phone || "",
        location: resumeData.personalInfo?.location || "",
        linkedin: resumeData.personalInfo?.linkedin || "",
        website: resumeData.personalInfo?.website || "",
        summary: resumeData.personalInfo?.summary || "",
      },
      experience: Array.isArray(resumeData.experience)
        ? resumeData.experience.map((exp: any, index: number) => ({
            id: exp.id || `exp_${Date.now()}_${index}`,
            company: exp.company || "",
            position: exp.position || "",
            location: exp.location || "",
            startDate: exp.startDate || "",
            endDate: exp.endDate || "",
            current: exp.current || false,
            description: removeBullets(exp.description || ""),
          }))
        : [],
      education: Array.isArray(resumeData.education)
        ? resumeData.education.map((edu: any, index: number) => ({
            id: edu.id || `edu_${Date.now()}_${index}`,
            institution: edu.institution || "",
            degree: edu.degree || "",
            field: edu.field || "",
            location: edu.location || "",
            startDate: edu.startDate || "",
            endDate: edu.endDate || "",
            gpa: edu.gpa || "",
          }))
        : [],
      skills: Array.isArray(resumeData.skills)
        ? resumeData.skills.map((skill: any, index: number) => ({
            id: skill.id || `skill_${Date.now()}_${index}`,
            category: skill.category || "",
            skills: Array.isArray(skill.skills) ? skill.skills : [],
          }))
        : [],
      projects: Array.isArray(resumeData.projects)
        ? resumeData.projects.map((proj: any, index: number) => ({
            id: proj.id || `proj_${Date.now()}_${index}`,
            name: proj.name || "",
            description: proj.description || "",
            technologies: proj.technologies || "",
            link: proj.link || "",
            startDate: proj.startDate || "",
            endDate: proj.endDate || "",
          }))
        : [],
      certifications: Array.isArray(resumeData.certifications)
        ? resumeData.certifications.map((cert: any, index: number) => ({
            id: cert.id || `cert_${Date.now()}_${index}`,
            name: cert.name || "",
            issuer: cert.issuer || "",
            date: cert.date || "",
            link: cert.link || "",
          }))
        : [],
    };

    return NextResponse.json({ resumeData: validatedData });
  } catch (error) {
    console.error("Document parsing error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to parse document. Please ensure the document contains clear, readable text.",
      },
      { status: 500 }
    );
  }
}
