
"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Edit, ShieldCheck, Mail, Phone, User, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/components/auth/auth-context";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const ProfileHeader = () => (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl items-center justify-between p-4">
            <Link href="/" passHref>
                <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Back</span>
                </Button>
            </Link>
            <h1 className="text-xl font-bold text-foreground font-headline">
                Edit Profile
            </h1>
            <div className="w-10"></div>
        </div>
    </header>
);

export default function ProfilePage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [name, setName] = React.useState(user?.name || "Priya Singh");
    const [email, setEmail] = React.useState(user?.email || "priya@example.com");
    const [phone, setPhone] = React.useState("9876543210");

    const handleSaveChanges = () => {
        // Here you would typically call an API to save the changes.
        // For now, we'll just show a toast notification.
        toast({
            title: "Profile Updated",
            description: "Your changes have been saved successfully.",
        });
    };

    if (!user) {
        return (
             <div className="bg-background text-foreground">
                <div className="mx-auto max-w-2xl">
                    <div className="flex min-h-screen w-full flex-col">
                         <ProfileHeader />
                         <main className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center">
                            <h2 className="text-2xl font-bold font-headline">Please Log In</h2>
                            <p className="text-muted-foreground mt-2">You need to be logged in to view your profile.</p>
                             <Link href="/" passHref>
                               <Button className="mt-6">Back to Home</Button>
                            </Link>
                        </main>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-background text-foreground">
            <div className="mx-auto max-w-2xl">
                <div className="flex min-h-screen w-full flex-col">
                    <ProfileHeader />
                    <main className="flex-1 overflow-y-auto p-6">
                        <Card>
                            <CardHeader className="items-center">
                                <div className="relative">
                                    <Avatar className="w-24 h-24">
                                        <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="woman smiling"/>
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full">
                                        <Edit className="h-4 w-4"/>
                                        <span className="sr-only">Edit Photo</span>
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input id="name" value={name} onChange={e => setName(e.target.value)} className="pl-10" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                     <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="pl-10"/>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Mobile Number</Label>
                                     <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="pl-10 pr-28"/>
                                         <Badge variant="secondary" className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-100 text-green-800 border-green-200">
                                           <ShieldCheck className="h-4 w-4 mr-1"/> Verified
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground">Changing your number requires OTP verification.</p>
                                </div>
                                <Button size="lg" className="w-full" onClick={handleSaveChanges}>
                                    <Save className="mr-2 h-4 w-4"/>
                                    Save Changes
                                </Button>
                            </CardContent>
                        </Card>
                    </main>
                </div>
            </div>
        </div>
    );
}
