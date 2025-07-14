
"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Heart, Star, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackageCard } from "@/app/page";
import { packages as allPackages, agents } from "@/lib/data";
import { BottomNavBar } from "@/app/page";

const ShortlistHeader = () => (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl items-center justify-between p-4">
            <Link href="/" passHref>
                <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Back</span>
                </Button>
            </Link>
            <h1 className="text-xl font-bold text-foreground font-headline">
                Your Shortlist
            </h1>
            <div className="w-10"></div>
        </div>
    </header>
);

export default function ShortlistPage() {
    const [wishlistedPackages, setWishlistedPackages] = React.useState(
        allPackages.filter(p => p.isWishlisted)
    );

    const handleWishlistToggle = (id: number) => {
        setWishlistedPackages(prev => prev.filter(p => p.id !== id));
        // Note: This only updates the state on this page. 
        // A real app would use global state management.
    };

    return (
        <div className="bg-background text-foreground">
            <div className="mx-auto max-w-2xl">
                <div className="flex min-h-screen w-full flex-col">
                    <ShortlistHeader />
                    <main className="flex-1 overflow-y-auto p-6 pb-24">
                        {wishlistedPackages.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {wishlistedPackages.map((pkg) => (
                                    <PackageCard
                                        key={pkg.id}
                                        pkg={{ ...pkg, isWishlisted: true }}
                                        onWishlistToggle={handleWishlistToggle}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center h-full pt-20">
                                <Heart className="h-16 w-16 text-muted-foreground mb-4" />
                                <h2 className="text-2xl font-bold font-headline">Your Shortlist is Empty</h2>
                                <p className="text-muted-foreground mt-2">Tap the heart on any package to save it here.</p>
                                <Link href="/" passHref>
                                   <Button className="mt-6">Find Your Next Trip</Button>
                                </Link>
                            </div>
                        )}
                    </main>
                    <BottomNavBar />
                </div>
            </div>
        </div>
    );
}
