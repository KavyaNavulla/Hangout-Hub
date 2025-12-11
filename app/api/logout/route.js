import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
    const cookieStore = await cookies();
    cookieStore.delete("token");

    const url = new URL("/", req.url);
    url.searchParams.set("loggedOut", "1");

    return NextResponse.redirect(url);
}
