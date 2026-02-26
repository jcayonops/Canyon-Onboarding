import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { StepList } from "./step-list";

const phaseOrder = ["intro", "discovery", "roadmap", "implementation", "optimization", "integration", "ongoing"];
const phaseLabels: Record<string, string> = {
  intro: "Introduction", discovery: "Discovery", roadmap: "Roadmap",
  implementation: "Implementation", optimization: "Optimization",
  integration: "Integration", ongoing: "Ongoing",
};

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: client } = await supabase
    .from("clients")
    .select("*, team_members!clients_assigned_to_fkey(full_name, role, email)")
    .eq("id", id)
    .single();

  if (!client) notFound();

  const { data: steps } = await supabase
    .from("onboarding_steps")
    .select("*, team_members!onboarding_steps_assigned_to_fkey(full_name)")
    .eq("client_id", id)
    .order("step_number", { ascending: true });

  const totalSteps = steps?.length ?? 0;
  const completedSteps = steps?.filter((s) => s.completed).length ?? 0;
  const progressPercent = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  const stepsByPhase = phaseOrder
    .map((phase) => ({ phase, label: phaseLabels[phase], steps: (steps ?? []).filter((s) => s.phase === phase) }))
    .filter((group) => group.steps.length > 0);

  const advisor = client.team_members as { full_name: string; role: string; email: string } | null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{client.first_name} {client.last_name}</h1>
        <p className="text-sm text-muted-foreground">{client.email}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Current Phase</p>
            <Badge className="mt-1" variant="secondary">{phaseLabels[client.current_phase] ?? client.current_phase}</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Progress</p>
            <div className="mt-2 space-y-1">
              <Progress value={progressPercent} className="h-2" />
              <p className="text-xs text-muted-foreground">{completedSteps} / {totalSteps} steps</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Assigned Advisor</p>
            <p className="mt-1 font-medium">{advisor?.full_name ?? "Unassigned"}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="text-sm"><span className="text-muted-foreground">Service Tier:</span> <span className="font-medium">{client.service_tier}</span></div>
        <div className="text-sm"><span className="text-muted-foreground">Type:</span> <span className="font-medium capitalize">{client.client_type?.replace("_", " ") ?? "Standard"}</span></div>
        <div className="text-sm"><span className="text-muted-foreground">CPA:</span> <span className="font-medium">{client.cpa_name ?? "\u2014"}</span></div>
        <div className="text-sm"><span className="text-muted-foreground">Estate Attorney:</span> <span className="font-medium">{client.estate_attorney ?? "\u2014"}</span></div>
      </div>

      {client.personal_note && (
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">Personal Note</p><p className="mt-1 text-sm">{client.personal_note}</p></CardContent></Card>
      )}

      <Separator />

      <div>
        <h2 className="mb-4 text-lg font-semibold">Onboarding Steps</h2>
        {stepsByPhase.length > 0 ? (
          <div className="space-y-6">
            {stepsByPhase.map((group) => (
              <Card key={group.phase}>
                <CardHeader className="pb-3"><CardTitle className="text-base">{group.label}</CardTitle></CardHeader>
                <CardContent><StepList steps={group.steps} /></CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card><CardContent className="py-8 text-center text-muted-foreground">No onboarding steps generated for this client yet.</CardContent></Card>
        )}
      </div>
    </div>
  );
}
