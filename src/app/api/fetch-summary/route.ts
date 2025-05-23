/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/expense-report/route.ts

import { NextRequest, NextResponse } from "next/server";
// Route Handlers live under `app/…/route.ts` and use Web Request/Response APIs :contentReference[oaicite:0]{index=0}

const POLL_INTERVAL_MS = 500; // half-second between polls
const MAX_ATTEMPTS = 20; // ~10 seconds total

export async function POST(req: NextRequest) {
  // 1) Parse input
  const { conversationId } = await req.json(); // parse JSON body :contentReference[oaicite:1]{index=1}
  if (!conversationId) {
    return NextResponse.json(
      { error: "Missing required field: conversationId" },
      { status: 400 }
    );
  }

  // 2) Eleven Labs API key
  const apiKey = process.env.ELEVEN_LABS_API_KEY!;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server misconfiguration: missing ELEVEN_LABS_API_KEY" },
      { status: 500 }
    );
  }

  // 3) Fetch helper
  async function fetchConvo() {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversations/${conversationId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey, // required Eleven Labs header
        },
      }
    );
    if (!res.ok) throw new Error(`ElevenLabs fetch failed: ${res.status}`);
    return res.json();
  }

  // 4) Poll until analysis appears
  let convoData: any = null;
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    convoData = await fetchConvo();
    if (convoData.analysis?.data_collection_results) break;
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
  }

  if (!convoData?.analysis?.data_collection_results) {
    return NextResponse.json(
      { error: "Analysis not ready after polling", status: convoData?.status },
      { status: 504 }
    );
  }

  // 5) Helper to trim keys and get .value
  const raw = convoData.analysis.data_collection_results;
  const get = (field: string) => {
    const entry: any = Object.entries(raw).find(
      ([k]) => k.trim().toLowerCase() === field.toLowerCase()
    );
    return entry?.[1]?.value;
  };

  // 6) Build result, defaulting date if necessary
  const rawDate = get("date");

  // Detect if this is a health/sick leave bot by checking for health-specific fields
  const isHealthBot =
    !!get("start_date") ||
    !!get("end_date") ||
    typeof get("doctors_note") !== "undefined";

  if (isHealthBot) {
    // Health AI bot fields
    const start_date = get("start_date") || new Date().toISOString();
    const end_date = get("end_date") || "unknown";
    let doctors_note = get("doctors_note");
    if (typeof doctors_note === "string") {
      doctors_note = doctors_note.toLowerCase() === "true";
    } else {
      doctors_note = Boolean(doctors_note);
    }
    const healthResult = {
      start_date,
      end_date,
      doctors_note,
    };
    // Validate required fields for health bot
    if (!healthResult.start_date) {
      return NextResponse.json(
        { error: "Missing required fields", analysis: raw },
        { status: 500 }
      );
    }
    return NextResponse.json(healthResult);
  }

  // Expense report fields
  const expenseResult = {
    date:
      rawDate && rawDate.toLowerCase() !== "none"
        ? rawDate
        : new Date().toISOString(),
    expenseReportName: get("expenseReportName"),
    description: get("description") || "",
    cashAdvance: get("cashAdvance") || "",
    currency: get("currency"),
    notes: get("notes") || "",
  };

  // 7) Validate required fields
  if (!expenseResult.expenseReportName || !expenseResult.currency) {
    return NextResponse.json(
      { error: "Missing required fields", analysis: raw },
      { status: 500 }
    );
  }

  // 8) Return trimmed JSON
  return NextResponse.json(expenseResult); // send JSON response :contentReference[oaicite:2]{index=2}
}
