
"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Heart, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PackageCard, FilterSheet } from "@/app/page";
import { packages as allPackages, destinations } from "@/lib/data";

type Package = (typeof allPackages)[0];

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
    const [packageList, setPackageList] = React.useState<Package[]>(allPackages);
    const [filters, setFilters] = React.useState({
        destination: "all",
        budget: 100000,
        duration: "any",
        rating: 1,
    });
    
    // State to manage wishlisted items
    const [wishlist, setWishlist] = React.useState(
        new Set(allPackages.filter(p => p.isWishlisted).map(p => p.id))
    );

    const handleWishlistToggle = (id: number) => {
        setWishlist(prev => {
            const newWishlist = new Set(prev);
            if (newWishlist.has(id)) {
                newWishlist.delete(id);
            } else {
                newWishlist.add(id);
            }
            return newWishlist;
        });
    };
    
    const applyFilters = (newFilters: any) => {
        setFilters(newFilters);
        let filtered = allPackages;

        if (newFilters.destination !== 'all') {
            filtered = filtered.filter(p => p.destination === newFilters.destination);
        }
        filtered = filtered.filter(p => parseInt(p.price.replace(/,/g, '')) <= newFilters.budget);

        if (newFilters.duration !== 'any') {
            const [min, max] = newFilters.duration.split('-').map(Number);
            filtered = filtered.filter(p => {
                const duration = parseInt(p.duration);
                if(newFilters.duration === '7+') return duration >= 7;
                return duration >= min && duration <= max;
            });
        }
        
        filtered = filtered.filter(p => p.rating >= newFilters.rating);

        setPackageList(filtered);
    }

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
                <FilterSheet onApplyFilters={applyFilters} />
              </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {packageList.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={{...pkg, isWishlisted: wishlist.has(pkg.id)}}
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

    