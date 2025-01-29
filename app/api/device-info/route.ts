/*eslint-disable @typescript-eslint/no-explicit-any*/

import { NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";

export async function GET(req: Request) {
  try {
    // Get User-Agent from request headers
    const userAgent = req.headers.get("user-agent") || "Unknown";

    // Parse User-Agent string
    const parser = new UAParser();
    parser.setUA(userAgent);
    const result = parser.getResult();

    // Determine device type
    let deviceType: "desktop" | "tablet" | "mobile" | "unknown" = "unknown";
    if (!result.device.type) {
      deviceType = "desktop"; // Default to desktop if no type is detected
    } else {
      deviceType = result.device.type as "tablet" | "mobile";
    }

    return NextResponse.json(
      {
        userAgent,
        deviceType,
        os: result.os.name || "Unknown",
        browser: result.browser.name || "Unknown",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
