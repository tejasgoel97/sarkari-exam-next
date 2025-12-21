import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  // Purge cache for main pages
  revalidatePath("/");
  revalidatePath("/[category]");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
