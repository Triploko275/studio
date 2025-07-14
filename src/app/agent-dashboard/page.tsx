
"use client";

import * as React from "react";
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

// In a real app, this would be filtered by the logged-in agent's ID
const agentPackages = packages.filter(p => p.agentId === 1);

export default function AgentDashboardPage() {
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

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold font-headline">My Packages</h1>
            <p className="text-muted-foreground">Here you can manage all your travel packages.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Package
        </Button>
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
                    <Button variant="outline" size="sm" className="mr-2">View/Edit</Button>
                    <Button variant="ghost" size="icon" className="mr-2">
                        <FileDown className="h-4 w-4" />
                        <span className="sr-only">Download PDF</span>
                    </Button>
                    <Button variant="ghost" size="icon">
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
