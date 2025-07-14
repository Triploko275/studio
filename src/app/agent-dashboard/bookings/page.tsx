
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

export default function AgentBookingsPage() {
    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Bookings</h1>
                    <p className="text-muted-foreground">Manage your incoming bookings and their status.</p>
                </div>
            </div>
            <Card className="flex-1">
                 <CardHeader>
                    <CardTitle>Booking List</CardTitle>
                    <CardDescription>This feature is coming soon.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center py-20">
                     <Briefcase className="h-16 w-16 text-muted-foreground mb-4" />
                    <h2 className="text-2xl font-bold font-headline">No Bookings Yet</h2>
                    <p className="text-muted-foreground mt-2">New bookings from customers will appear here.</p>
                </CardContent>
            </Card>
        </>
    );
}
