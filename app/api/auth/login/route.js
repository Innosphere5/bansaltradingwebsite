import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

const FIREBASE_API_KEY = "AIzaSyAxRkv3Urob91IWhJ_yGIxf9DC-DfuVq8A";
const SESSION_SECRET = process.env.SESSION_SECRET || "bansal_trading_karyana_super_secure_session_secret_key_2026_nextjs";

export async function POST(request) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ error: "Missing ID token" }, { status: 400 });
    }

    // Verify the Firebase ID token using Google Identity API (No service accounts required!)
    const verifyUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`;
    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      const errData = await response.json();
      console.error("Google token verification failed:", errData);
      return NextResponse.json({ error: "Invalid Firebase ID Token" }, { status: 401 });
    }

    const verificationResult = await response.json();
    const googleUser = verificationResult.users?.[0];

    if (!googleUser) {
      return NextResponse.json({ error: "User details not found" }, { status: 401 });
    }

    // Prepare custom session payload
    const userPayload = {
      uid: googleUser.localId,
      email: googleUser.email,
      name: googleUser.displayName || googleUser.email.split("@")[0],
      picture: googleUser.photoUrl || "",
    };

    // Sign a secure JWT session token using jose
    const secret = new TextEncoder().encode(SESSION_SECRET);
    const sessionToken = await new SignJWT(userPayload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    // Store secure HttpOnly session cookie
    const cookieStore = await cookies();
    cookieStore.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({
      success: true,
      user: userPayload,
    });
  } catch (error) {
    console.error("Authentication API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
