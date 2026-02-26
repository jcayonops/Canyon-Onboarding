"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CopyPacketLink({ slug, token }: { slug: string; token: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const packetUrl = `${window.location.origin}/packet/${slug}?token=${token}`;
    await navigator.clipboard.writeText(packetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button variant="outline" size="sm" onClick={handleCopy}>
      <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m9.86-3.061a4.5 4.5 0 0 0-1.242-7.244l4.5-4.5a4.5 4.5 0 0 0 6.364 6.364l-1.757 1.757" />
      </svg>
      {copied ? "Copied!" : "Copy Packet Link"}
    </Button>
  );
}
