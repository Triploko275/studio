
"use client";

import * as React from "react";
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, Globe, Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { agents as allAgents } from "@/lib/data";

export default function SuperAdminAgentDetailPage() {
    const params = useParams();
    const agentId = parseInt(params.id as string, 10);
    const agent = allAgents.find(a => a.id === agentId);

    if (!agent) {
        return (
            <div className="flex items-center justify-center h-full">
                <p>Agent not found.</p>
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center gap-4 mb-6">
                <Link href="/superadmin/agents" passHref>
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold font-headline">Agent Details</h1>
                    <p className="text-muted-foreground">Viewing details for {agent.name}.</p>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-6">
                         <Avatar className="w-24 h-24 border-4 border-primary">
                            <AvatarImage src={agent.logo} data-ai-hint={agent.hint} />
                            <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-3xl">{agent.name}</CardTitle>
                            <CardDescription>{agent.specialty}</CardDescription>
                            <div className="flex items-center gap-2 mt-2">
                                <Star className="h-5 w-5 text-accent fill-current" />
                                <span className="font-bold">{agent.rating}</span>
                                <span className="text-sm text-muted-foreground">({agent.reviews} reviews)</span>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="mb-6">{agent.description}</p>
                    <h3 className="font-bold mb-2">Contact Information</h3>
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm border p-4 rounded-lg">
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-primary" />
                            <a href={`tel:${agent.phone}`} className="hover:underline">{agent.phone}</a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-primary" />
                            <a href={`mailto:${agent.email}`} className="hover:underline">{agent.email}</a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-primary" />
                            <a href={`https://${agent.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{agent.website}</a>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
