
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Map,
  Heart,
  UserRound,
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  Home as HomeIcon,
  Briefcase,
  Gem
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
<<<<<<< HEAD
  SheetClose,
=======
  SheetClose
>>>>>>> a719621 (in the home page, can we get these at bottom , ( Home, My trips, Shortli)
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
import { packages as allPackages, destinations, testimonials, agents } from "@/lib/data";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { LoginDialog } from "@/components/auth/login-dialog";

type Package = (typeof allPackages)[0];

const AppHeader = () => (
  <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
    <div className="mx-auto flex max-w-2xl items-center justify-between p-4">
      <Link href="/" className="flex items-center gap-2">
        <Map className="h-7 w-7 text-primary" />
        <h1 className="text-xl font-bold text-foreground font-headline">
          Roam Southeast
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/shortlist">
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Wishlist</span>
          </Button>
        </Link>
        <LoginDialog />
      </div>
    </div>
  </header>
);

export const PackageCard = ({
  pkg,
  onWishlistToggle,
}: {
  pkg: Package & { isWishlisted: boolean };
  onWishlistToggle: (id: number) => void;
}) => {
    const agent = agents.find(a => a.id === pkg.agentId);
    return (
        <Card className="overflow-hidden border-none shadow-lg transition-transform duration-300 hover:scale-105 flex flex-col">
            <CardContent className="p-0 flex flex-col flex-grow">
            <div className="relative">
                <Link href={`/packages/${pkg.slug}`} passHref>
                    <Image
                        src={pkg.image}
                        alt={pkg.title}
                        width={600}
                        height={400}
                        className="h-48 w-full object-cover"
                        data-ai-hint={pkg.hint}
                    />
                </Link>
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
            <div className="p-4 flex flex-col flex-grow">
                <Link href={`/packages/${pkg.slug}`} passHref>
                    <h3 className="font-headline text-lg font-bold truncate hover:underline">{pkg.title}</h3>
                </Link>
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
                 <div className="border-t my-4"></div>
                 <div className="flex items-center gap-3 mt-auto">
                    {agent && (
                        <Link href={`/agents/${agent.id}`} passHref>
                            <Avatar className="w-10 h-10 border-2 border-primary">
                                <AvatarImage src={agent.logo} data-ai-hint={agent.hint} />
                                <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </Link>
                    )}
                    <div>
                        <Link href={`/agents/${agent.id}`} passHref>
                           <p className="font-semibold text-sm hover:underline">{agent?.name}</p>
                        </Link>
                         <p className="text-xs text-muted-foreground">Tour Operator</p>
                    </div>
                </div>
            </div>
            </CardContent>
        </Card>
    );
};

export const FilterSheet = ({ onApplyFilters }: { onApplyFilters?: (filters: any) => void }) => {
    const [destination, setDestination] = React.useState('all');
    const [budget, setBudget] = React.useState([100000]);
    const [duration, setDuration] = React.useState('any');
    const [rating, setRating] = React.useState(1);

    const handleApply = () => {
        if (onApplyFilters) {
            onApplyFilters({
                destination,
                budget: budget[0],
                duration,
                rating
            });
        }
    }
    
    const handleClear = () => {
        setDestination('all');
        setBudget([100000]);
        setDuration('any');
        setRating(1);
        if (onApplyFilters) {
             onApplyFilters({
                destination: 'all',
                budget: 100000,
                duration: 'any',
                rating: 1
            });
        }
    }

  return (
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
          <Select value={destination} onValueChange={setDestination}>
            <SelectTrigger id="destination">
              <SelectValue placeholder="Select a destination" />
            </SelectTrigger>
            <SelectContent>
              {destinations.map((dest) => (
                <SelectItem key={dest} value={dest}>
                  {dest}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="budget">Budget (per person) - ₹{budget[0].toLocaleString()}</Label>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹10k</span>
            <span>₹1L+</span>
          </div>
          <Slider value={budget} onValueChange={setBudget} max={100000} min={10000} step={1000} />
        </div>
        <div className="grid gap-3">
          <Label>Duration</Label>
          <RadioGroup value={duration} onValueChange={setDuration} className="flex flex-wrap gap-2">
            {['any', '1-3', '4-6', '7+'].map(d => (
              <div key={d} className="flex items-center">
                <RadioGroupItem value={d} id={`d-${d}`} className="sr-only" />
                <Label htmlFor={`d-${d}`} className="border rounded-full px-4 py-2 cursor-pointer has-[[data-state=checked]]:bg-primary has-[[data-state=checked]]:text-primary-foreground has-[[data-state=checked]]:border-primary capitalize">
                  {d === 'any' ? 'Any' : (d === '7+' ? '7+ Days' : `${d} Days`)}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="grid gap-3">
          <Label>Rating</Label>
           <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
                <Star key={i} onClick={() => setRating(i + 1)} className={`h-8 w-8 cursor-pointer ${i < rating ? 'text-accent fill-current' : 'text-muted'}`} />
            ))}
          </div>
        </div>
      </div>
      <SheetFooter>
        <Button variant="ghost" onClick={handleClear}>Clear</Button>
        <SheetClose asChild>
            <Button type="submit" className="flex-1" onClick={handleApply}>Apply Filters</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
  )
};

export const BottomNavBar = () => {
    const pathname = usePathname();

    const navItems = [
        { href: "/", icon: HomeIcon, label: "Home" },
        { href: "/my-trips", icon: Briefcase, label: "My Trips" },
        { href: "/shortlist", icon: Heart, label: "Shortlist" },
        { href: "/honeymoon", icon: Gem, label: "Honeymoon" },
    ];

    return (
        <footer className="fixed bottom-0 left-0 right-0 w-full bg-background/80 backdrop-blur-sm border-t md:hidden">
            <div className="mx-auto max-w-2xl">
                <div className="flex justify-around items-center p-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link href={item.href} key={item.label} passHref>
                                <div className={cn(
                                    "flex flex-col items-center justify-center gap-1 w-20 h-16 rounded-lg transition-colors",
                                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                                )}>
                                    <item.icon className="h-6 w-6" />
                                    <span className="text-xs font-medium">{item.label}</span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </footer>
    );
};


export default function Home() {
  const [packageList, setPackageList] = React.useState<Package[]>(allPackages.slice(0, 4));
  const [activeDestination, setActiveDestination] = React.useState("All");
  
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

  React.useEffect(() => {
    if (activeDestination === "All") {
      setPackageList(allPackages.slice(0, 4));
    } else {
      setPackageList(allPackages.filter(p => p.destination === activeDestination).slice(0, 4));
    }
  }, [activeDestination]);

  return (
    <div className="bg-background text-foreground">
      <div className="mx-auto max-w-2xl">
        <div className="flex min-h-screen w-full flex-col">
          <AppHeader />
          <main className="flex-1 overflow-y-auto pb-24">
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

            <section className="px-6 pb-6">
               <Carousel
                opts={{
                  align: "start",
                  dragFree: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2">
                  {destinations.map((dest) => (
                    <CarouselItem key={dest} className="basis-auto pl-2">
                      <Button
                        variant={activeDestination === dest ? "default" : "secondary"}
                        className="rounded-full"
                        onClick={() => setActiveDestination(dest)}
                      >
                        {dest}
                      </Button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
              </Carousel>
            </section>

            <section className="px-6 pb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold font-headline">
                  Popular Packages
                </h3>
                <Link href="/packages" className="text-sm font-medium text-primary hover:underline">
                  See all
                </Link>
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
            
             <footer className="p-6 text-center text-sm text-muted-foreground hidden md:block">
                <div className="flex justify-center gap-6 mb-4">
                    <a href="#" className="hover:text-primary">About Us</a>
                    <a href="#" className="hover:text-primary">Contact</a>
                    <a href="#" className="hover:text-primary">Terms & Conditions</a>
                    <a href="#" className="hover:text-primary">Privacy Policy</a>
                </div>
                <p>&copy; {new Date().getFullYear()} Roam Southeast. All rights reserved.</p>
             </footer>
          </main>

          <BottomNavBar />
        </div>
      </div>
    </div>
  );
}
