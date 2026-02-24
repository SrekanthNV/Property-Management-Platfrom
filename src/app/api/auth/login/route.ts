import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }


    const mockUser = {
      id: "usr_001",
      email,
      name: "Alex Morgan",
      role: "ADMIN",
    };

    const mockTokens = {
      accessToken: `eyJ${Buffer.from(JSON.stringify({ userId: mockUser.id, exp: Date.now() + 3600000 })).toString("base64")}`,
      refreshToken: `ref_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      expiresIn: 3600,
    };

    return NextResponse.json({
      success: true,
      data: {
        user: mockUser,
        tokens: mockTokens,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Authentication failed" },
      { status: 500 }
    );
  }
}
