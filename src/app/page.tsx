"use client";

import * as React from "react";
import Image from "next/image";
import {
  Map,
  Heart,
  UserRound,
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Mock Data
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
];

const destinations = ["All", "Thailand", "Vietnam", "Singapore", "Bali", "Malaysia"];

const testimonials = [
  {
    id: 1,
    name: "Anika Sharma",
    avatar: "https://placehold.co/100x100.png",
    hint: "woman smiling",
    quote: "Booking through Roam Southeast was a breeze! We got an incredible deal for our Bali trip directly from the local operators. So much better than the usual markups.",
  },
  {
    id: 2,
    name: "Rohan Patel",
    avatar: "https://placehold.co/100x100.png",
    hint: "man travel",
    quote: "The transparency is what I loved. I knew exactly who I was booking with in Thailand. The package was well-planned and everything was seamless. Highly recommended!",
  },
  {
    id: 3,
    name: "Priya Singh",
    avatar: "https://placehold.co/100x100.png",
    hint: "woman beach",
    quote: "Found the perfect family package to Singapore. The ability to chat with the DMC on WhatsApp before booking was a fantastic feature. Will use again for sure.",
  },
];

type Package = (typeof packages)[0];

const AppHeader = () => (
  <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
    <div className="mx-auto flex max-w-2xl items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <Map className="h-7 w-7 text-primary" />
        <h1 className="text-xl font-bold text-foreground font-headline">
          Roam Southeast
        </h1>
      </div>
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

const PackageCard = ({
  pkg,
  onWishlistToggle,
}: {
  pkg: Package;
  onWishlistToggle: (id: number) => void;
}) => (
  <Card className="overflow-hidden border-none shadow-lg transition-transform duration-300 hover:scale-105">
    <CardContent className="p-0">
      <div className="relative">
        <Image
          src={pkg.image}
          alt={pkg.title}
          width={600}
          height={400}
          className="h-48 w-full object-cover"
          data-ai-hint={pkg.hint}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 rounded-full bg-background/70 hover:bg-background"
          onClick={() => onWishlistToggle(pkg.id)}
        >
          <Heart
            className={`h-5 w-5 ${
              pkg.isWishlisted ? "text-primary fill-current" : "text-foreground"
            }`}
          />
        </Button>
      </div>
      <div className="p-4">
        <h3 className="font-headline text-lg font-bold truncate">{pkg.title}</h3>
        <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{pkg.destination}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{pkg.duration}</span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 text-accent fill-current" />
            <span className="font-bold">{pkg.rating}</span>
          </div>
          <div className="text-lg font-bold text-foreground">
            <span className="text-sm font-normal">From ₹</span>
            {pkg.price}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const FilterSheet = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" className="gap-2 shrink-0">
        <Filter className="h-4 w-4" />
        Filters
      </Button>
    </SheetTrigger>
    <SheetContent side="bottom" className="rounded-t-2xl max-h-[80vh] overflow-y-auto">
      <SheetHeader className="text-left">
        <SheetTitle>Filters</SheetTitle>
        <SheetDescription>
          Refine your search for the perfect getaway.
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-6 py-6">
        <div className="grid gap-3">
          <Label htmlFor="destination">Destination</Label>
          <Select defaultValue="all">
            <SelectTrigger id="destination">
              <SelectValue placeholder="Select a destination" />
            </SelectTrigger>
            <SelectContent>
              {destinations.map((dest) => (
                <SelectItem key={dest} value={dest.toLowerCase()}>
                  {dest}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="budget">Budget (per person)</Label>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹10k</span>
            <span>₹1L+</span>
          </div>
          <Slider defaultValue={[40000]} max={100000} min={10000} step={1000} />
        </div>
        <div className="grid gap-3">
          <Label>Duration</Label>
          <RadioGroup defaultValue="any" className="flex flex-wrap gap-2">
            {['Any', '1-3 Days', '4-6 Days', '7+ Days'].map(d => (
              <div key={d} className="flex items-center">
                <RadioGroupItem value={d.toLowerCase().replace(' ','-')} id={`d-${d}`} className="sr-only" />
                <Label htmlFor={`d-${d}`} className="border rounded-full px-4 py-2 cursor-pointer has-[[data-state=checked]]:bg-primary has-[[data-state=checked]]:text-primary-foreground has-[[data-state=checked]]:border-primary">
                  {d}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="grid gap-3">
          <Label>Rating</Label>
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-8 w-8 ${i < 4 ? 'text-accent fill-current' : 'text-muted'}`} />
            ))}
          </div>
        </div>
      </div>
      <SheetFooter>
        <Button variant="ghost">Clear</Button>
        <Button type="submit" className="flex-1">Apply Filters</Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);

export default function Home() {
  const [packageList, setPackageList] = React.useState<Package[]>(packages);
  const [activeDestination, setActiveDestination] = React.useState("All");

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
          <AppHeader />
          <main className="flex-1 overflow-y-auto">
            <section className="p-6 text-center">
              <h2 className="text-3xl font-bold font-headline tracking-tight">
                Your Southeast Asian Adventure Awaits
              </h2>
              <p className="mt-2 text-muted-foreground">
                Buy pre-packaged tours directly from local experts. No markups.
              </p>
              <div className="relative mt-6">
                <Input
                  placeholder="Search for destinations or packages"
                  className="pl-10 h-12 text-base rounded-full shadow-md"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </section>

            <section>
              <div className="overflow-x-auto px-6 pb-6 scrollbar-hide">
                <div className="flex gap-3">
                  {destinations.map((dest) => (
                    <Button
                      key={dest}
                      variant={activeDestination === dest ? "default" : "secondary"}
                      className="rounded-full shrink-0"
                      onClick={() => setActiveDestination(dest)}
                    >
                      {dest}
                    </Button>
                  ))}
                </div>
              </div>
            </section>

            <section className="px-6 pb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold font-headline">
                  Popular Packages
                </h3>
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
            </section>

            <section className="bg-muted py-12 px-6">
               <h3 className="text-xl font-bold font-headline text-center mb-6">
                What Our Travelers Say
              </h3>
              <Carousel
                opts={{ align: "start", loop: true }}
                className="w-full"
              >
                <CarouselContent>
                  {testimonials.map((testimonial) => (
                    <CarouselItem key={testimonial.id} className="md:basis-1/1 lg:basis-1/1">
                      <div className="p-1">
                        <Card className="border-none shadow-lg">
                          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                             <Avatar className="w-16 h-16 mb-4 border-2 border-accent">
                                <AvatarImage src={testimonial.avatar} data-ai-hint={testimonial.hint} />
                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <p className="italic">"{testimonial.quote}"</p>
                            <p className="mt-4 font-bold font-headline text-foreground">
                              - {testimonial.name}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                 <div className="hidden sm:block">
                    <CarouselPrevious className="left-[-10px]" />
                    <CarouselNext className="right-[-10px]" />
                </div>
              </Carousel>
            </section>
          </main>

          <footer className="p-6 text-center text-sm text-muted-foreground">
            <div className="flex justify-center gap-6 mb-4">
                <a href="#" className="hover:text-primary">About Us</a>
                <a href="#" className="hover:text-primary">Contact</a>
                <a href="#" className="hover:text-primary">Terms & Conditions</a>
                <a href="#" className="hover:text-primary">Privacy Policy</a>
            </div>
            <p>&copy; {new Date().getFullYear()} Roam Southeast. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
