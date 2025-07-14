
"use client";

import * as React from "react";
import Link from "next/link";
import { PlusCircle, FileDown, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { packages } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

// In a real app, this would be filtered by the logged-in agent's ID
const agentPackages = packages.filter(p => p.agentId === 1);
type Package = (typeof agentPackages)[0] & { itinerary?: any[], inclusions?: string[], exclusions?: string[] };


export default function AgentDashboardPage() {
  const { toast } = useToast();
  const [packageStatus, setPackageStatus] = React.useState(
    new Map(agentPackages.map(p => [p.id, true]))
  );

  const handleStatusToggle = (id: number) => {
    setPackageStatus(prev => {
      const newStatus = new Map(prev);
      newStatus.set(id, !newStatus.get(id));
      return newStatus;
    });
  };

  const handleDownload = (pkg: Package) => {
    let content = `Package: ${pkg.title}\n`;
    content += `Destination: ${pkg.destination}\n`;
    content += `Duration: ${pkg.duration}\n`;
    content += `Price: ₹${pkg.price}\n\n`;
    
    // In a real app, this data would come from the package itself
    const dummyItinerary = [
        { day: 1, title: "Arrival", description: "Arrive and check in." },
        { day: 2, title: "City Tour", description: "Explore the city." },
    ];
    const inclusions = ["Airport transfers", "Accommodation", "Breakfast"];
    const exclusions = ["Flights", "Visa", "Lunch & Dinner"];

    content += "--- Itinerary ---\n";
    dummyItinerary.forEach(day => {
        content += `Day ${day.day}: ${day.title}\n`;
        content += `${day.description}\n\n`;
    });

    content += "--- Inclusions ---\n";
    inclusions.forEach(item => {
        content += `- ${item}\n`;
    });
    content += "\n";

    content += "--- Exclusions ---\n";
    exclusions.forEach(item => {
        content += `- ${item}\n`;
    });

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${pkg.title.replace(/\s+/g, '-')}-details.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Download Started", description: "Your package details are being downloaded." });
  };

  const handleShare = async (pkg: Package) => {
    const publicUrl = `${window.location.origin}/packages/${pkg.id}`;
    const shareData = {
      title: pkg.title,
      text: `Check out this amazing travel package I'm offering: ${pkg.title}`,
      url: publicUrl,
    };
    
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // Fallback to clipboard if share fails
        await navigator.clipboard.writeText(publicUrl);
        toast({ title: "Link Copied!", description: "The package URL has been copied to your clipboard." });
      }
    } else {
      await navigator.clipboard.writeText(publicUrl);
      toast({ title: "Link Copied!", description: "The package URL has been copied to your clipboard." });
    }
  };


  return (
    <>
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold font-headline">My Packages</h1>
            <p className="text-muted-foreground">Here you can manage all your travel packages.</p>
        </div>
        <Link href="/agent-dashboard/packages/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Package
            </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Package List</CardTitle>
            <CardDescription>A list of your current packages. Toggle to activate or deactivate.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Package Title</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price (INR)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agentPackages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-medium">{pkg.title}</TableCell>
                  <TableCell>{pkg.destination}</TableCell>
                  <TableCell>{pkg.duration}</TableCell>
                  <TableCell>₹{pkg.price}</TableCell>
                  <TableCell>
                     <div className="flex items-center gap-2">
                        <Switch
                            id={`status-${pkg.id}`}
                            checked={packageStatus.get(pkg.id)}
                            onCheckedChange={() => handleStatusToggle(pkg.id)}
                        />
                         <Badge variant={packageStatus.get(pkg.id) ? "default" : "secondary"}>
                           {packageStatus.get(pkg.id) ? "Active" : "Disabled"}
                        </Badge>
                     </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/agent-dashboard/packages/${pkg.id}/edit`}>
                        <Button variant="outline" size="sm" className="mr-2">View/Edit</Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="mr-2" onClick={() => handleDownload(pkg)}>
                        <FileDown className="h-4 w-4" />
                        <span className="sr-only">Download Details</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleShare(pkg)}>
                        <Share2 className="h-4 w-4" />
                         <span className="sr-only">Share</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
