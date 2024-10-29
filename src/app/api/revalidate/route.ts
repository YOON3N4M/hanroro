import { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  // console.log(request);
  const tag = request.nextUrl.searchParams.get("tag");
  console.log(tag);
  revalidateTag("dd");

  return Response.json({ revalidated: true, now: Date.now() });
}
