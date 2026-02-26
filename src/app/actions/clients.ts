"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createClientAction(formData: FormData) {
  const supabase = await createClient();

  const firstName = formData.get("first_name") as string;
  const lastName = formData.get("last_name") as string;
  const spouseName = (formData.get("spouse_name") as string) || null;

  // Generate a unique slug for the welcome packet URL
  const { data: slugData } = await supabase.rpc("generate_client_slug", {
    p_first_name: firstName,
    p_last_name: lastName,
    p_spouse_name: spouseName,
  });

  const clientData = {
    first_name: firstName,
    last_name: lastName,
    email: (formData.get("email") as string) || null,
    phone: (formData.get("phone") as string) || null,
    spouse_name: spouseName,
    client_type: (formData.get("client_type") as string) || "standard",
    service_tier: (formData.get("service_tier") as string) || "2x",
    assigned_to: (formData.get("assigned_to") as string) || null,
    cpa_name: (formData.get("cpa_name") as string) || null,
    estate_attorney: (formData.get("estate_attorney") as string) || null,
    personal_note: (formData.get("personal_note") as string) || null,
    slug: slugData ?? `${firstName}-${lastName}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  };

  const { data: client, error } = await supabase
    .from("clients")
    .insert(clientData)
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  // Clone SOP templates into onboarding steps for this client
  await supabase.rpc("clone_sop_for_client", { p_client_id: client.id });

  redirect(`/clients/${client.id}`);
}
