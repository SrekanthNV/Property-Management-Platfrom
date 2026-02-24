// ============================================================
// API Route - Properties CRUD
// ============================================================

import { NextRequest, NextResponse } from "next/server";

// In production, these would use Prisma with a real database
// For now, using in-memory mock data to demonstrate API structure

const properties = [
  {
    id: "prop_001",
    name: "Riverside Apartments",
    address: "142 River Rd",
    city: "Youngstown",
    state: "OH",
    zipCode: "44503",
    type: "APARTMENT",
    status: "ACTIVE",
    units: 24,
    managerId: "usr_001",
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    let filtered = properties;
    if (search) {
      filtered = properties.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.city.toLowerCase().includes(search.toLowerCase())
      );
    }

    const total = filtered.length;
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return NextResponse.json({
      success: true,
      data: paginated,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const required = ["name", "address", "city", "state", "zipCode", "type"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const newProperty = {
      id: `prop_${Date.now()}`,
      ...body,
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    properties.push(newProperty);

    return NextResponse.json(
      { success: true, data: newProperty },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create property" },
      { status: 500 }
    );
  }
}
