"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Map, Heart, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PackageCard, FilterSheet } from "@/app/page";

// Mock Data - In a real app, this would likely come from a shared service or API
const packages = [
  {
    id: 1,
    title: "Bangkok & Pattaya Discovery",
    destination: "Thailand",
    duration: "5 Days",
    rating: 4.5,
    price: "35,000",
    image: "https://placehold.co/600x400.png",
    hint: "thailand beach",
    isWishlisted: false,
  },
  {
    id: 2,
    title: "Enchanting Bali Getaway",
    destination: "Indonesia",
    duration: "7 Days",
    rating: 4.8,
    price: "45,000",
    image: "https://placehold.co/600x400.png",
    hint: "bali temple",
    isWishlisted: true,
  },
  {
    id: 3,
    title: "Highlights of Vietnam",
    destination: "Vietnam",
    duration: "6 Days",
    rating: 4.6,
    price: "42,000",
    image: "https://placehold.co/600x400.png",
    hint: "vietnam landscape",
    isWishlisted: false,
  },
  {
    id: 4,
    title: "Singapore City Spectacular",
    destination: "Singapore",
    duration: "4 Days",
    rating: 4.7,
    price: "55,000",
    image: "https://placehold.co/600x400.png",
    hint: "singapore skyline",
    isWishlisted: false,
  },
  {
    id: 5,
    title: "Malaysian Marvels",
    destination: "Malaysia",
    duration: "6 Days",
    rating: 4.4,
    price: "48,000",
    image: "https://placehold.co/600x400.png",
    hint: "malaysia city",
    isWishlisted: false,
  },
];

type Package = (typeof packages)[0];

const PackagesHeader = () => (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl items-center justify-between p-4">
            <Link href="/" passHref>
                <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Back</span>
                </Button>
            </Link>
            <h1 className="text-xl font-bold text-foreground font-headline">
                All Packages
            </h1>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">Wishlist</span>
                </Button>
                <Button variant="ghost" size="icon">
                    <UserRound className="h-5 w-5" />
                    <span className="sr-only">Profile</span>
                </Button>
            </div>
        </div>
    </header>
);


export default function AllPackagesPage() {
  const [packageList, setPackageList] = React.useState<Package[]>(packages);

  const handleWishlistToggle = (id: number) => {
    setPackageList((prev) =>
      prev.map((pkg) =>
        pkg.id === id ? { ...pkg, isWishlisted: !pkg.isWishlisted } : pkg
      )
    );
  };

  return (
    <div className="bg-background text-foreground">
      <div className="mx-auto max-w-2xl">
        <div className="flex min-h-screen w-full flex-col">
          <PackagesHeader />
          <main className="flex-1 overflow-y-auto p-6">
             <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold font-headline">
                  {packageList.length} Packages Found
                </h2>
                <FilterSheet />
              </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {packageList.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  onWishlistToggle={handleWishlistToggle}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
