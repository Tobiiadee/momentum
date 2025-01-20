import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  try {
    // Get the searchTerm from the query parameters
    const { searchParams } = new URL(req.url);
    const searchTerm = searchParams.get("searchTerm");
    const user_id = searchParams.get("user_id");

    if (!searchTerm) {
      return NextResponse.json(
        { error: "Missing searchTerm parameter" },
        { status: 400 }
      );
    }

    if (!user_id) {
      return NextResponse.json(
        { error: "unauthorized: no user id" },
        { status: 400 }
      );
    }

    // // Get the access token from the Authorization header
    // const authorizationHeader = req.headers.get("authorization");
    // if (!authorizationHeader) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // const accessToken = authorizationHeader.replace("Bearer ", "");

    // // Verify the user with the access token
    // const { data: userData, error } = await supabase.auth.getUser();

    // console.log("user data:", userData);

    // if (error || !userData) {
    //   console.error("Error getting user:", error?.message);
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // Call the RPC function
    const { data, error: rpcError } = await supabase.rpc("global_search", {
      user_id: user_id,
      search_query: searchTerm,
    });

    console.log("rpc results:", data);
    console.log("rpc error:", rpcError);

    if (rpcError) {
      console.error("Error running global search:", rpcError);
      return NextResponse.json({ error: rpcError.message }, { status: 500 });
    }

    // Return the search results
    return NextResponse.json({ results: data });
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}
