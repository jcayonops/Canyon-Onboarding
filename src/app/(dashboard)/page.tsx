import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [
    { count: totalClients },
    { count: activeClients },
    { count: totalSteps },
    { count: completedSteps },
    { data: recentClients },
  ] = await Promise.all([
    supabase.from("clients").select("*", { count: "exact", head: true }),
    supabase
      .from("clients")
      .select("*", { count: "exact", head: true })
      .eq("status", "active"),
    supabase.from("onboarding_steps").select("*", { count: "exact", head: true }),
    supabase
      .from("onboarding_steps")
      .select("*", { count: "exact", head: true })
      .eq("completed", true),
    supabase
      .from("clients")
      .select("id, first_name, last_name, current_phase, status, onboarding_started_at")
      .order("onboarding_started_at", { ascending: false })
      .limit(5),
  ]);

  const stats = [
    { title: "Total Clients", value: totalClients ?? 0, icon: Users, color: "text-blue-600" },
    { title: "Active Onboardings", value: activeClients ?? 0, icon: Clock, color: "text-amber-600" },
    { title: "Steps Completed", value: completedSteps ?? 0, icon: CheckCircle2, color: "text-green-600" },
    { title: "Steps Remaining", value: (totalSteps ?? 0) - (completedSteps ?? 0), icon: AlertCircle, color: "text-slate-600" },
  ];

  const phaseColors: Record<string, string> = {
    intro: "bg-blue-100 text-blue-800",
    discovery: "bg-purple-100 text-purple-800",
    roadmap: "bg-amber-100 text-amber-800",
    implementation: "bg-orange-100 text-orange-800",
    optimization: "bg-green-100 text-green-800",
    integration: "bg-teal-100 text-teal-800",
    ongoing: "bg-slate-100 text-slate-800",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your client onboarding pipeline</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className={`rounded-full bg-slate-50 p-3 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Clients</CardTitle>
        </CardHeader>
        <CardContent>
          {recentClients && recentClients.length > 0 ? (
            <div className="space-y-3">
              {recentClients.map((client) => (
                <Link
                  key={client.id}
                  href={`/clients/${client.id}`}
                  className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-slate-50"
                >
                  <div>
                    <p className="font-medium">{client.first_name} {client.last_name}</p>
                    <p className="text-sm text-muted-foreground">
                      Started {new Date(client.onboarding_started_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={phaseColors[client.current_phase] ?? phaseColors.intro} variant="secondary">
                    {client.current_phase}
                  </Badge>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <Users className="mx-auto mb-2 h-8 w-8" />
              <p>No clients yet.</p>
              <Link href="/clients/new" className="mt-2 inline-block text-sm font-medium text-blue-600 hover:underline">
                Add your first client
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
