import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // get ?code= from query params
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  console.log("StatusCode", request.headers.get("StatusCode"));

  return NextResponse.json({
    message: `Claiming voucher with code: ${code}`,
    status: `pending, it's not implemented yet`,
  });
}
