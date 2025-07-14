
"use client";

import * as React from "react";
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
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { packages, agents } from "@/lib/data";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type PackageWithStatus = (typeof packages)[0] & {
    approvalStatus: "Approved" | "Pending" | "Rejected";
    agentName: string;
};

const allPackages: PackageWithStatus[] = packages.map(pkg => ({
    ...pkg,
    approvalStatus: ["Approved", "Pending", "Rejected"][Math.floor(Math.random() * 3)] as "Approved" | "Pending" | "Rejected",
    agentName: agents.find(a => a.id === pkg.agentId)?.name || 'Unknown Agent',
}));

export default function SuperAdminPackagesPage() {
    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Package Management</h1>
                    <p className="text-muted-foreground">Review, approve, and manage all travel packages.</p>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Packages</CardTitle>
                    <CardDescription>A list of all packages submitted by agents.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Package Title</TableHead>
                                <TableHead>Agent</TableHead>
                                <TableHead>Destination</TableHead>
                                <TableHead>Price (INR)</TableHead>
                                <TableHead>Approval Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allPackages.map((pkg) => (
                                <TableRow key={pkg.id}>
                                    <TableCell className="font-medium">{pkg.title}</TableCell>
                                    <TableCell>{pkg.agentName}</TableCell>
                                    <TableCell>{pkg.destination}</TableCell>
                                    <TableCell>₹{pkg.price}</TableCell>
                                    <TableCell>
                                        <Badge variant={pkg.approvalStatus === 'Approved' ? "default" : (pkg.approvalStatus === 'Pending' ? "secondary" : "destructive")}>
                                            {pkg.approvalStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                <DropdownMenuItem>Feature Package</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>Approve</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Reject</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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

