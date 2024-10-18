import { NextResponse } from "next/server";
import { ENZYME_API_KEY } from "~~/constants";

export async function GET() {
  try {
    const myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");
    myHeaders.append("authorization", `Bearer ${ENZYME_API_KEY}`);
    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
    };
    const response = await fetch(
      "https://api.enzyme.finance/enzyme.enzyme.v1.EnzymeService/GetVaultList?",
      requestOptions,
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: error });
  }
}
