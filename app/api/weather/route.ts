import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // get search params
    // call service method to get weather data
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
