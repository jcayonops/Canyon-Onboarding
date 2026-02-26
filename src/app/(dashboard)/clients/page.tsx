import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function ClientsPage() {
  const supabase = await createClient();

  const { data: clients } = await supabase
    .from("clients")
    .select("id, first_name, last_name, email, current_phase, status, service_tier, client_type, assigned_to, onboarding_started_at, team_members!clients_assigned_to_fkey(full_name)")
    .order("onboarding_started_at", { ascending: false });

  const phaseColors: Record<string, string> = {
    intro: "bg-blue-100 text-blue-800", discovery: "bg-purple-100 text-purple-800",
    roadmap: "bg-amber-100 text-amber-800", implementation: "bg-orange-100 text-orange-800",
    optimization: "bg-green-100 text-green-800", integration: "bg-teal-100 text-teal-800",
    ongoing: "bg-slate-100 text-slate-800",
  };

  const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-800", completed: "bg-blue-100 text-blue-800",
    paused: "bg-amber-100 text-amber-800",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Clients</h1>
          <p className="text-sm text-muted-foreground">Manage client onboarding</p>
        </div>
        <Link href="/clients/new">
          <Button><Plus className="mr-2 h-4 w-4" />Add Client</Button>
        </Link>
      </div>

      <Card>
        <CardHeader><CardTitle>All Clients ({clients?.length ?? 0})</CardTitle></CardHeader>
        <CardContent>
          {clients && clients.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phase</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Advisor</TableHead>
                  <TableHead>Started</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <Link href={`/clients/${client.id}`} className="font-medium text-blue-600 hover:underline">
                        {client.first_name} {client.last_name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{client.email ?? "\u2014"}</TableCell>
                    <TableCell>
                      <Badge className={phaseColors[client.current_phase] ?? phaseColors.intro} variant="secondary">{client.current_phase}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[client.status] ?? statusColors.active} variant="secondary">{client.status}</Badge>
                    </TableCell>
                    <TableCell>{client.service_tier}</TableCell>
                    <TableCell>{(client.team_members as unknown as { full_name: string } | null)?.full_name ?? "Unassigned"}</TableCell>
                    <TableCell className="text-muted-foreground">{new Date(client.onboarding_started_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-12 text-center text-muted-foreground">
              <p>No clients yet.</p>
              <Link href="/clients/new" className="mt-2 inline-block text-sm font-medium text-blue-600 hover:underline">Add your first client</Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
