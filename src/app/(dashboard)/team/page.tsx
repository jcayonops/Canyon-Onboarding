import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const roleColors: Record<string, string> = {
  advisor: "bg-blue-100 text-blue-800",
  client_relations: "bg-purple-100 text-purple-800",
  admin: "bg-slate-100 text-slate-800",
};

export default async function TeamPage() {
  const supabase = await createClient();

  const { data: members } = await supabase
    .from("team_members")
    .select("*")
    .order("full_name");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Team</h1>
        <p className="text-sm text-muted-foreground">{members?.length ?? 0} team members</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members?.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                  {member.full_name.split(" ").map((n: string) => n[0]).join("")}
                </div>
                <Badge className={roleColors[member.role] ?? roleColors.admin} variant="secondary">
                  {member.role.replace("_", " ")}
                </Badge>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold">{member.full_name}</h3>
                {member.email && <p className="mt-1 text-sm text-muted-foreground">{member.email}</p>}
                {member.phone && <p className="text-sm text-muted-foreground">{member.phone}</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
