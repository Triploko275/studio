
import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BottomNavBar } from "@/app/page";

const MyTripsHeader = () => (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl items-center justify-between p-4">
            <Link href="/" passHref>
                <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Back</span>
                </Button>
            </Link>
            <h1 className="text-xl font-bold text-foreground font-headline">
                My Trips
            </h1>
            <div className="w-10"></div>
        </div>
    </header>
);

export default function MyTripsPage() {
    return (
        <div className="bg-background text-foreground">
            <div className="mx-auto max-w-2xl">
                <div className="flex min-h-screen w-full flex-col">
                    <MyTripsHeader />
                    <main className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center">
                        <Briefcase className="h-16 w-16 text-muted-foreground mb-4" />
                        <h2 className="text-2xl font-bold font-headline">No Upcoming Trips</h2>
                        <p className="text-muted-foreground mt-2">Your booked adventures will appear here. <br/> Time to plan your next getaway!</p>
                        <Link href="/" passHref>
                           <Button className="mt-6">Explore Packages</Button>
                        </Link>
                    </main>
                    <BottomNavBar />
                </div>
            </div>
        </div>
    );
}
