
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const plans = [
    {
        name: "Basic",
        price: "Free",
        features: ["Up to 5 active packages", "Standard support", "Basic analytics"],
        isCurrent: false,
    },
    {
        name: "Pro",
        price: "₹4,999",
        price_period: "/month",
        features: ["Up to 20 active packages", "Priority support", "Advanced analytics", "Higher visibility"],
        isCurrent: true,
        isPopular: true,
    },
    {
        name: "Premium",
        price: "₹9,999",
        price_period: "/month",
        features: ["Unlimited packages", "Dedicated support", "Full analytics suite", "Top placement in search"],
        isCurrent: false,
    },
];

export default function AgentSubscriptionPage() {
    const { toast } = useToast();

    const handleSelectPlan = (planName: string) => {
        toast({
            title: "Plan Update",
            description: `You have selected the ${planName} plan. Redirecting to payment...`,
        });
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Subscription</h1>
                    <p className="text-muted-foreground">Manage your Roam Southeast subscription plan.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <Card key={plan.name} className={cn("flex flex-col", { "border-primary border-2 shadow-lg": plan.isCurrent })}>
                        {plan.isPopular && (
                            <div className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider text-center py-1 rounded-t-lg rounded-b-none">
                                Most Popular
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                               {plan.name === 'Pro' && <Star className="h-6 w-6 text-accent" />}
                               {plan.name === 'Premium' && <Crown className="h-6 w-6 text-accent" />}
                               {plan.name}
                            </CardTitle>
                            <CardDescription>
                                <span className="text-3xl font-bold">{plan.price}</span>
                                <span className="text-muted-foreground">{plan.price_period}</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-1">
                            <ul className="space-y-3 mb-6 flex-1">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2 text-sm">
                                        <Check className="h-4 w-4 text-green-500" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button 
                                className="w-full mt-auto" 
                                disabled={plan.isCurrent}
                                variant={plan.isCurrent ? "outline" : "default"}
                                onClick={() => handleSelectPlan(plan.name)}
                            >
                                {plan.isCurrent ? "Current Plan" : "Choose Plan"}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
}
