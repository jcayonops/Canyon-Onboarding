"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface Step {
  id: string;
  step_number: number;
  step_name: string;
  description: string | null;
  category: string;
  completed: boolean;
  completed_at: string | null;
  due_date: string | null;
  notes: string | null;
  team_members: { full_name: string } | null;
}

const categoryColors: Record<string, string> = {
  meeting_prep: "bg-blue-50 text-blue-700", meeting: "bg-indigo-50 text-indigo-700",
  follow_up: "bg-purple-50 text-purple-700", document_collection: "bg-amber-50 text-amber-700",
  account_setup: "bg-orange-50 text-orange-700", team_coordination: "bg-teal-50 text-teal-700",
  client_experience: "bg-pink-50 text-pink-700", internal_ops: "bg-slate-50 text-slate-700",
};

export function StepList({ steps }: { steps: Step[] }) {
  const supabase = createClient();
  const router = useRouter();
  const [updating, setUpdating] = useState<string | null>(null);

  async function toggleStep(stepId: string, currentlyCompleted: boolean) {
    setUpdating(stepId);
    await supabase
      .from("onboarding_steps")
      .update({ completed: !currentlyCompleted, completed_at: !currentlyCompleted ? new Date().toISOString() : null })
      .eq("id", stepId);
    setUpdating(null);
    router.refresh();
  }

  return (
    <div className="space-y-2">
      {steps.map((step) => (
        <div key={step.id} className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-slate-50">
          <button
            onClick={() => toggleStep(step.id, step.completed)}
            disabled={updating === step.id}
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
              step.completed ? "border-green-600 bg-green-600 text-white" : "border-slate-300 hover:border-slate-400"
            }`}
          >
            {step.completed && (
              <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${step.completed ? "text-muted-foreground line-through" : ""}`}>{step.step_name}</span>
              <Badge className={`text-xs ${categoryColors[step.category] ?? categoryColors.internal_ops}`} variant="secondary">
                {step.category.replace("_", " ")}
              </Badge>
            </div>
            {step.description && <p className="mt-0.5 text-xs text-muted-foreground">{step.description}</p>}
            <div className="mt-1 flex gap-4 text-xs text-muted-foreground">
              {step.team_members && <span>Assigned: {step.team_members.full_name}</span>}
              {step.due_date && <span>Due: {new Date(step.due_date).toLocaleDateString()}</span>}
              {step.completed_at && <span className="text-green-600">Completed: {new Date(step.completed_at).toLocaleDateString()}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
