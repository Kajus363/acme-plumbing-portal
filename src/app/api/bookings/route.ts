import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders });
  }

  const body = await request.json();

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      auth_id: user.id,
      service: body.service,
      description: body.description,
      preferred_date: body.preferredDate,
      address: body.address,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400, headers: corsHeaders });
  }

  return NextResponse.json(data, { status: 201, headers: corsHeaders });
}
