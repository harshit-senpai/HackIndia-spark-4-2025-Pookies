import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

if (!process.env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY is not set in environment variables");
}

// Initialize Gemini API with proper configuration
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { topic, category, platform } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    // Generate platform-specific content
    let articlePrompt = `Write a comprehensive article about ${topic} in the ${
      category || "general"
    } category.`;
    let additionalFields = {};

    switch (platform) {
      case "wordpress":
        articlePrompt += ` Format it for WordPress with HTML tags where appropriate. Include suggestions for:
        1. Featured image description
        2. WordPress categories and tags
        3. Excerpt (max 155 characters)
        4. Internal linking suggestions`;
        break;
      case "medium":
        articlePrompt += ` Format it for Medium with proper markdown formatting. Include:
        1. Subtitle/deck
        2. Pull quotes for highlighting
        3. Medium-specific tags (max 5)
        4. Reading time estimate`;
        break;
      case "linkedin":
        articlePrompt += ` Format it as a professional LinkedIn article. Include:
        1. Executive summary
        2. Professional insights
        3. Industry-specific hashtags
        4. Call-to-action for professional engagement`;
        break;
      default:
        articlePrompt += ` The article should be informative, engaging, and well-structured.`;
    }

    const articleResult = await model.generateContent(articlePrompt);
    const articleResponse = await articleResult.response.text();
    let article = articleResponse;

    interface PlatformContent {
      mainContent?: string;
      [key: string]: string | undefined;
    }

    // Parse platform-specific content
    if (
      platform === "wordpress" ||
      platform === "medium" ||
      platform === "linkedin"
    ) {
      const sections = articleResponse
        .split("\n")
        .reduce<PlatformContent>((acc, line) => {
          if (
            line.startsWith("1.") ||
            line.startsWith("2.") ||
            line.startsWith("3.") ||
            line.startsWith("4.")
          ) {
            const [number, content] = line.split(".").map((s) => s.trim());
            const key = content.split(":")[0].toLowerCase();
            acc[key] = content.split(":")[1]?.trim() || "";
          } else if (!line.startsWith("-")) {
            acc.mainContent = (acc.mainContent || "") + line + "\n";
          }
          return acc;
        }, {});

      article = sections.mainContent || articleResponse;
      delete sections.mainContent;
      additionalFields = sections;
    }

    const seoPrompt = `Generate SEO metadata for an article about ${topic}:\n1. Meta title (max 60 chars)\n2. Meta description (max 160 chars)\n3. Keywords (comma-separated)`;
    const seoResult = await model.generateContent(seoPrompt);
    const seoText = await seoResult.response.text();
    const [metaTitle, metaDescription, keywords] = seoText
      .split("\n")
      .map((line) => line.replace(/^\d+\.\s*/, "").trim());

    // Generate social media posts
    const socialPrompt = `Write social media posts for an article about ${topic}:\n1. Twitter post (max 280 chars)\n2. Facebook post (max 400 chars)`;
    const socialResult = await model.generateContent(socialPrompt);
    const socialText = await socialResult.response.text();
    const [twitter, facebook] = socialText
      .split("\n")
      .map((line) => line.replace(/^\d+\.\s*/, "").trim());

    return NextResponse.json({
      title: `${topic} - Comprehensive Guide`,
      content: article,
      platformSpecific: additionalFields,
      seo: {
        metaTitle,
        metaDescription,
        keywords,
      },
      socialMedia: {
        twitter,
        facebook,
      },
    });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
