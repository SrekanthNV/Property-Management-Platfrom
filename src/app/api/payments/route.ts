// ============================================================
// API Route - Payments
// ============================================================

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const tenantId = searchParams.get("tenantId");

    // In production: query database with Prisma
    // const payments = await prisma.payment.findMany({
    //   where: { ...(status && { status }), ...(tenantId && { tenantId }) },
    //   include: { tenant: { include: { user: true } } },
    //   orderBy: { createdAt: 'desc' },
    // });

    return NextResponse.json({
      success: true,
      data: [],
      message: "Connect to database for real payment data",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tenantId, amount, method, description } = body;

    if (!tenantId || !amount) {
      return NextResponse.json(
        { success: false, error: "Tenant ID and amount are required" },
        { status: 400 }
      );
    }

    // In production: create Stripe PaymentIntent
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: Math.round(amount * 100),
    //   currency: 'usd',
    //   metadata: { tenantId, description },
    // });

    const payment = {
      id: `pay_${Date.now()}`,
      tenantId,
      amount,
      method: method || "CARD",
      description: description || "Rent Payment",
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { success: true, data: payment },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process payment" },
      { status: 500 }
    );
  }
}
