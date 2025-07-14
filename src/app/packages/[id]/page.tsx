
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Heart, MapPin, Share2, Star } from "lucide-react";
import { packages as allPackages, agents } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PackageHeader = ({ title }: { title: string }) => (
  <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
    <div className="mx-auto flex max-w-4xl items-center justify-between p-4">
      <Link href="/" passHref>
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
      </Link>
      <h1 className="truncate text-xl font-bold text-foreground font-headline">
        {title}
      </h1>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Heart className="h-5 w-5" />
          <span className="sr-only">Wishlist</span>
        </Button>
        <Button variant="ghost" size="icon">
          <Share2 className="h-5 w-5" />
          <span className="sr-only">Share</span>
        </Button>
      </div>
    </div>
  </header>
);

export default function PackageDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const packageId = parseInt(params.id, 10);
  const pkg = allPackages.find((p) => p.id === packageId);
  const agent = pkg ? agents.find((a) => a.id === pkg.agentId) : null;

  if (!pkg || !agent) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Package not found.
      </div>
    );
  }

  const dummyItinerary = [
    { day: 1, title: "Arrival & City Exploration", description: "Arrive at the airport, transfer to your hotel, and enjoy a day exploring the local markets and landmarks." },
    { day: 2, title: "Cultural Immersion", description: "Visit ancient temples, museums, and historical sites to immerse yourself in the local culture." },
    { day: 3, title: "Adventure Day", description: "Embark on an exciting adventure, such as jungle trekking, snorkeling, or zip-lining, depending on your destination." },
    { day: 4, title: "Leisure & Relaxation", description: "Enjoy a day at your own pace. Relax on the beach, indulge in a spa treatment, or shop for souvenirs." },
    { day: 5, title: "Departure", description: "Enjoy a final breakfast before transferring to the airport for your departure." },
  ];

  return (
    <div className="bg-background text-foreground">
      <div className="mx-auto max-w-4xl">
        <div className="flex min-h-screen w-full flex-col">
          <PackageHeader title={pkg.title} />
          <main className="flex-1 overflow-y-auto">
            <div className="relative h-64 md:h-80">
              <Image
                src={pkg.image}
                alt={pkg.title}
                layout="fill"
                objectFit="cover"
                className="w-full"
                data-ai-hint={pkg.hint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h2 className="text-3xl font-bold text-white font-headline">
                  {pkg.title}
                </h2>
                <div className="mt-2 flex items-center gap-4 text-white">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{pkg.destination}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6">
                <div className="rounded-lg bg-card p-4 shadow">
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="text-lg font-bold">₹{pkg.price}</p>
                </div>
                <div className="rounded-lg bg-card p-4 shadow">
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="flex items-center justify-center gap-1 text-lg font-bold">
                    <Star className="h-5 w-5 text-accent fill-current" />
                    {pkg.rating}
                  </p>
                </div>
                <div className="rounded-lg bg-card p-4 shadow">
                  <p className="text-sm text-muted-foreground">Group Size</p>
                  <p className="text-lg font-bold">Up to 12</p>
                </div>
                 <div className="rounded-lg bg-card p-4 shadow">
                  <p className="text-sm text-muted-foreground">Activity</p>
                  <p className="text-lg font-bold">Sightseeing</p>
                </div>
              </div>
              
              <div className="mb-6 rounded-lg bg-card p-6 shadow">
                <h3 className="text-xl font-bold font-headline mb-4">
                  Tour Operator
                </h3>
                <div className="flex items-center gap-4">
                  <Link href={`/agents/${agent.id}`} passHref>
                    <Avatar className="w-16 h-16 border-2 border-primary">
                      <AvatarImage src={agent.logo} data-ai-hint={agent.hint} />
                      <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div>
                    <Link href={`/agents/${agent.id}`} passHref>
                      <p className="font-bold text-lg hover:underline">{agent.name}</p>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      Verified Local Partner
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                 <h3 className="text-xl font-bold font-headline mb-4">
                  Itinerary
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {dummyItinerary.slice(0, parseInt(pkg.duration)).map(item => (
                    <AccordionItem value={`item-${item.day}`} key={item.day}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-3">
                            <Badge className="h-8 w-8 flex items-center justify-center shrink-0">{item.day}</Badge>
                            <span className="font-bold text-left">{item.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-14">
                        {item.description}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

            </div>
          </main>
          <footer className="sticky bottom-0 bg-background border-t p-4">
            <Button size="lg" className="w-full text-lg">Book Now</Button>
          </footer>
        </div>
      </div>
    </div>
  );
}
