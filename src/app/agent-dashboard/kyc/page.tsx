
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function AgentKycPage() {
    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">KYC Status</h1>
                    <p className="text-muted-foreground">Manage your verification documents.</p>
                </div>
            </div>
            <Card className="flex-1">
                 <CardHeader>
                    <CardTitle>KYC Verification</CardTitle>
                    <CardDescription>This feature is coming soon.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center py-20">
                     <ShieldCheck className="h-16 w-16 text-muted-foreground mb-4" />
                    <h2 className="text-2xl font-bold font-headline">Verification Pending</h2>
                    <p className="text-muted-foreground mt-2">Upload your documents to get verified.</p>
                </CardContent>
            </Card>
        </>
    );
}
