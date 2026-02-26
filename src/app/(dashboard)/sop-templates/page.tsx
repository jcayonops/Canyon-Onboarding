import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const phaseOrder = ["intro", "discovery", "roadmap", "implementation", "optimization", "integration", "ongoing"];
const phaseLabels: Record<string, string> = {
  intro: "Introduction", discovery: "Discovery", roadmap: "Roadmap",
  implementation: "Implementation", optimization: "Optimization",
  integration: "Integration", ongoing: "Ongoing",
};

const categoryColors: Record<string, string> = {
  meeting_prep: "bg-blue-50 text-blue-700", meeting: "bg-indigo-50 text-indigo-700",
  follow_up: "bg-purple-50 text-purple-700", document_collection: "bg-amber-50 text-amber-700",
  account_setup: "bg-orange-50 text-orange-700", team_coordination: "bg-teal-50 text-teal-700",
  client_experience: "bg-pink-50 text-pink-700", internal_ops: "bg-slate-50 text-slate-700",
};

export default async function SOPTemplatesPage() {
  const supabase = await createClient();

  const { data: templates } = await supabase
    .from("sop_templates")
    .select("*")
    .order("step_number", { ascending: true });

  const grouped = phaseOrder
    .map((phase) => ({
      phase,
      label: phaseLabels[phase],
      templates: (templates ?? []).filter((t) => t.phase === phase),
    }))
    .filter((g) => g.templates.length > 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">SOP Templates</h1>
        <p className="text-sm text-muted-foreground">{templates?.length ?? 0} standard onboarding steps across {grouped.length} phases</p>
      </div>

      {grouped.map((group) => (
        <Card key={group.phase}>
          <CardHeader>
            <CardTitle className="text-base">{group.label} ({group.templates.length} steps)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Step Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Assigned Role</TableHead>
                  <TableHead className="w-24">Days Offset</TableHead>
                  <TableHead>Applies To</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {group.templates.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="text-muted-foreground">{t.step_number}</TableCell>
                    <TableCell>
                      <div>
                        <span className="font-medium">{t.step_name}</span>
                        {t.description && <p className="mt-0.5 text-xs text-muted-foreground">{t.description}</p>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${categoryColors[t.category] ?? categoryColors.internal_ops}`} variant="secondary">
                        {t.category.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize">{t.default_assigned_role?.replace("_", " ") ?? "\u2014"}</TableCell>
                    <TableCell className="text-center">{t.days_offset ?? "\u2014"}</TableCell>
                    <TableCell className="capitalize">{t.applies_to === "all" ? "All" : t.applies_to?.replace("_", " ") ?? "All"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
