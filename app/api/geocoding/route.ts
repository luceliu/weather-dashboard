import { fetchCitiesData } from "@/app/services/geocodingService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const city = searchParams.get("city");
    console.log(city);

    if (!city) {
      return NextResponse.json(
        { error: "City parameter is required" },
        { status: 400 }
      );
    }

    const citiesData = await fetchCitiesData(city);
    console.log(citiesData);
    return NextResponse.json(citiesData);
  } catch (error) {
    console.error("Geocoding Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch city data" },
      { status: 500 }
    );
  }
}
