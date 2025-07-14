
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Crown } from "lucide-react";

export default function AgentSubscriptionPage() {
    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Subscription</h1>
                    <p className="text-muted-foreground">Manage your Roam Southeast subscription plan.</p>
                </div>
            </div>
            <Card className="flex-1">
                 <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>This feature is coming soon.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center py-20">
                     <Crown className="h-16 w-16 text-muted-foreground mb-4" />
                    <h2 className="text-2xl font-bold font-headline">No Active Subscription</h2>
                    <p className="text-muted-foreground mt-2">Please choose a plan to start receiving bookings.</p>
                </CardContent>
            </Card>
        </>
    );
}
