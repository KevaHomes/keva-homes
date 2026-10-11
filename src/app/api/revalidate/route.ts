import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  // Revalidate all pages since any content type could affect multiple pages
  revalidatePath("/", "layout");
  // The sitemap is a route handler outside the layout tree, so refresh it separately
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
