
"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Banknote, PlusCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const payoutHistory = [
    { id: 'POUT-003', date: '2024-04-15', amount: '₹75,000', status: 'Completed' },
    { id: 'POUT-002', date: '2024-03-20', amount: '₹50,000', status: 'Completed' },
    { id: 'POUT-001', date: '2024-02-18', amount: '₹62,500', status: 'Completed' },
];


export default function AgentPayoutsPage() {
    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Payouts</h1>
                    <p className="text-muted-foreground">Manage your earnings and request payouts.</p>
                </div>
                <Link href="/agent-dashboard/payouts/request">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Request Payout
                    </Button>
                </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Available to Payout</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold">₹1,25,000</p>
                            <p className="text-sm text-muted-foreground">Based on completed and ongoing trips.</p>
                            <Link href="/agent-dashboard/payouts/request" className="mt-4 inline-flex items-center font-semibold text-primary">
                                View Details & Request <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <Card>
                         <CardHeader>
                            <CardTitle>Payout History</CardTitle>
                            <CardDescription>Your previous payout records.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             {payoutHistory.length > 0 ? (
                                <ul className="space-y-4">
                                  {payoutHistory.map((payout) => (
                                    <li key={payout.id} className="flex justify-between items-center">
                                      <div>
                                        <p className="font-semibold">{payout.id}</p>
                                        <p className="text-sm text-muted-foreground">{payout.date}</p>
                                      </div>
                                      <div className="text-right">
                                         <p className="font-bold text-lg">{payout.amount}</p>
                                         <p className="text-sm text-green-600">{payout.status}</p>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                            ) : (
                                <div className="flex flex-col items-center justify-center text-center py-10">
                                     <Banknote className="h-12 w-12 text-muted-foreground mb-4" />
                                    <h2 className="text-xl font-bold font-headline">No Payouts Yet</h2>
                                    <p className="text-muted-foreground mt-2">Your payout history will be displayed here.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
