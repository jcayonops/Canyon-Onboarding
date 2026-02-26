import { createServerClient } from "@supabase/ssr";
import { notFound } from "next/navigation";
import { WelcomePacket } from "./welcome-packet";

export default async function PacketPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { slug } = await params;
  const { token } = await searchParams;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  );

  const { data: client } = await supabase
    .from("clients")
    .select(
      "*, team_members!clients_assigned_to_fkey(full_name, role, email, phone)"
    )
    .eq("slug", slug)
    .single();

  if (!client) notFound();

  // Simple token-based access control
  if (client.packet_token && token !== client.packet_token) {
    notFound();
  }

  const advisor = client.team_members as {
    full_name: string;
    role: string;
    email: string;
    phone: string;
  } | null;

  // Build display name
  const clientName = client.spouse_name
    ? `${client.first_name} & ${client.spouse_name} ${client.last_name}`
    : `${client.first_name} ${client.last_name}`;

  // Format date
  const onboardingDate = client.onboarding_started_at
    ? new Date(client.onboarding_started_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  return (
    <WelcomePacket
      clientName={clientName}
      onboardingDate={onboardingDate}
      personalNote={client.personal_note ?? ""}
      advisorName={advisor?.full_name ?? "Jake Cazier, CFP\u00AE"}
      advisorEmail={advisor?.email ?? "jake@canyonstrategicwealth.com"}
      advisorPhone={advisor?.phone ?? "(801) 903-8287"}
      clientType={client.client_type ?? "standard"}
    />
  );
}
