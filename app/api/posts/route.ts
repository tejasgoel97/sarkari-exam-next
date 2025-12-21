import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import { revalidatePath } from "next/cache";

// GET: Fetch all posts (Optional, for admin lists)
export async function GET(req: NextRequest) {
  await dbConnect();
  const url = new URL(req.url);
  const category = url.searchParams.get("category");
  const limit = parseInt(url.searchParams.get("limit") || "10");

  const query = category ? { category } : {};
  const posts = await Post.find(query).sort({ updatedAt: -1 }).limit(limit);

  return NextResponse.json({ success: true, data: posts });
}
export async function POST(req: NextRequest) {
  try {
    // 1. Connect to the Database
    await dbConnect();

    // 2. Parse the incoming JSON data
    const body = await req.json();

    // 3. Validation: Check if required fields exist
    // Note: featureImage is optional in your model, so we don't check for it here.
    const requiredFields = [
      "title",
      "slug",
      "contentHtml",
      "category",
      "metaDescription",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // 4. Create the Post in MongoDB
    const post = await Post.create({
      title: body.title,
      slug: body.slug,
      featureImage: body.featureImage || "", // Handle optional image
      contentHtml: body.contentHtml,
      category: body.category,
      metaDescription: body.metaDescription,
      // timestamps: true in your model automatically adds createdAt and updatedAt
    });

    // 5. Trigger Instant Update (Revalidation)
    // This ensures the new post appears on the Homepage immediately without a rebuild.
    revalidatePath("/");
    revalidatePath(`/${body.category}`); // Updates the specific category page (e.g., /result)

    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error: any) {
    console.error("API Error:", error);

    // Handle Duplicate Slug Error (MongoDB Code 11000)
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          error:
            "A post with this Slug already exists. Please use a unique slug.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
