import { getUserDocument } from "@/services/firebase";
import { UserDoc } from "@/types";
import { NextResponse, NextRequest } from "next/server";

// export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const uid = req.nextUrl.searchParams.get("uid");
  const isDisplayName = req.nextUrl.searchParams.get("displayName") === "true";
  try {
    if (!uid) {
      return NextResponse.json(
        { message: "no uid", data: null },
        { status: 400 }
      );
    }

    const userDoc = (await getUserDocument(uid)) as UserDoc;

    /**
     * 닉네임 요청만 필요한 경우
     */
    if (isDisplayName) {
      return NextResponse.json(
        {
          message: "success to fetch data user displayName",
          data: userDoc.displayName,
        },
        { status: 200 }
      );
    }
    /**
     * user doc 자체가 필요한 경우
     */
    return NextResponse.json(
      { message: "success to fetch data userDocument", data: userDoc },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch data", error: error },
      { status: 500 }
    );
  }
}
