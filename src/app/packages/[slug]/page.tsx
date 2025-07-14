
import * as React from "react";
import { packages as allPackages, agents } from "@/lib/data";
import { PackageDetailsClient } from "./client";

export default function PackageDetailsPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const pkg = allPackages.find((p) => p.slug === slug);
  const agent = pkg ? agents.find((a) => a.id === pkg.agentId) : undefined;

  if (!pkg || !agent) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Package not found.
      </div>
    );
  }

  return <PackageDetailsClient pkg={pkg} agent={agent} />;
}
