"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createClientAction(formData: FormData) {
  const supabase = await createClient();

  const clientData = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    email: (formData.get("email") as string) || null,
    phone: (formData.get("phone") as string) || null,
    spouse_name: (formData.get("spouse_name") as string) || null,
    client_type: (formData.get("client_type") as string) || "standard",
    service_tier: (formData.get("service_tier") as string) || "2x",
    assigned_to: (formData.get("assigned_to") as string) || null,
    cpa_name: (formData.get("cpa_name") as string) || null,
    estate_attorney: (formData.get("estate_attorney") as string) || null,
    personal_note: (formData.get("personal_note") as string) || null,
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
