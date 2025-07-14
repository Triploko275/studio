
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Banknote, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function AgentPayoutsPage() {
    const { toast } = useToast();

    const handleRequestPayout = () => {
        toast({
            title: "Payout Requested",
            description: "Your request has been submitted and will be processed soon.",
        });
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Payouts</h1>
                    <p className="text-muted-foreground">Manage your earnings and request payouts.</p>
                </div>
                <Button onClick={handleRequestPayout}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Request Payout
                </Button>
            </div>
            <Card className="flex-1">
                 <CardHeader>
                    <CardTitle>Payout History</CardTitle>
                    <CardDescription>This feature is coming soon.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center py-20">
                     <Banknote className="h-16 w-16 text-muted-foreground mb-4" />
                    <h2 className="text-2xl font-bold font-headline">No Payouts Yet</h2>
                    <p className="text-muted-foreground mt-2">Your payout history will be displayed here.</p>
                </CardContent>
            </Card>
        </>
    );
}
