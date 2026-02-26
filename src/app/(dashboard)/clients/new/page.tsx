import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createClientAction } from "@/app/actions/clients";

export default async function NewClientPage() {
  const supabase = await createClient();
  const { data: teamMembers } = await supabase.from("team_members").select("id, full_name, role").order("full_name");

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Add New Client</h1>
        <p className="text-sm text-muted-foreground">Create a new client and generate their onboarding steps</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Client Information</CardTitle></CardHeader>
        <CardContent>
          <form action={createClientAction} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label htmlFor="first_name">First Name *</Label><Input id="first_name" name="first_name" required /></div>
              <div className="space-y-2"><Label htmlFor="last_name">Last Name *</Label><Input id="last_name" name="last_name" required /></div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" placeholder="client@example.com" /></div>
              <div className="space-y-2"><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" type="tel" placeholder="(555) 123-4567" /></div>
            </div>
            <div className="space-y-2"><Label htmlFor="spouse_name">Spouse Name</Label><Input id="spouse_name" name="spouse_name" /></div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="client_type">Client Type</Label>
                <select id="client_type" name="client_type" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs" defaultValue="standard">
                  <option value="standard">Standard</option>
                  <option value="business_owner">Business Owner</option>
                  <option value="retiring_couple">Retiring Couple</option>
                  <option value="vfo_full">VFO Full</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="service_tier">Service Tier</Label>
                <select id="service_tier" name="service_tier" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs" defaultValue="2x">
                  <option value="2x">2x</option>
                  <option value="3x">3x</option>
                  <option value="4x">4x</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assigned_to">Assigned Advisor</Label>
                <select id="assigned_to" name="assigned_to" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs" defaultValue="">
                  <option value="">Select...</option>
                  {teamMembers?.map((member) => (
                    <option key={member.id} value={member.id}>{member.full_name} ({member.role})</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label htmlFor="cpa_name">CPA Name</Label><Input id="cpa_name" name="cpa_name" /></div>
              <div className="space-y-2"><Label htmlFor="estate_attorney">Estate Attorney</Label><Input id="estate_attorney" name="estate_attorney" /></div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="personal_note">Personal Note</Label>
              <textarea id="personal_note" name="personal_note" rows={3} className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground" placeholder="Any personal details to remember (interests, family info, etc.)" />
            </div>
            <div className="flex gap-3 pt-4"><Button type="submit">Create Client</Button></div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
