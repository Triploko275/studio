
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Heart, MapPin, MessageSquare, Send, Share2, Star, User, Users } from "lucide-react";
import { packages as allPackages, agents, testimonials } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";


const PackageHeader = ({ title, pkg }: { title: string, pkg: any }) => {
    const [isWishlisted, setIsWishlisted] = React.useState(pkg.isWishlisted);
    const { toast } = useToast();

    const handleWishlistToggle = () => {
        setIsWishlisted(!isWishlisted);
        toast({
            title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
            description: `"${pkg.title}" has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
        });
    };
    
    return (
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
            <Button variant="ghost" size="icon" onClick={handleWishlistToggle}>
              <Heart className={`h-5 w-5 ${isWishlisted ? 'text-primary fill-current' : ''}`} />
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
}

const AskAgentDialog = ({ agent }: { agent: (typeof agents)[0] }) => {
  const [message, setMessage] = React.useState("");
  const { toast } = useToast();

  const handleSend = () => {
    if (message.trim()) {
      toast({
        title: "Message Sent!",
        description: `Your question has been sent to ${agent.name}. They will get back to you shortly.`,
      });
      setMessage("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full text-lg" size="lg">
          <MessageSquare className="mr-2 h-5 w-5" />
          Ask Your Agent
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ask {agent.name}</DialogTitle>
          <DialogDescription>
            Have a question about the itinerary, inclusions, or anything else? Send them a message directly.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
          />
        </div>
        <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleSend} disabled={!message.trim()}>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


export default function PackageDetailsPage() {
  const params = useParams();
  const packageId = parseInt(params.id as string, 10);
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
    { day: 6, title: "Island Hopping", description: "Explore nearby islands, swim in crystal clear waters, and enjoy a beach barbecue." },
    { day: 7, title: "Wildlife Safari", description: "Go on a safari to see local wildlife in their natural habitat." },
    { day: 8, title: "Mountain Trek", description: "Hike through scenic mountain trails and enjoy panoramic views." },
    { day: 9, title: "Cooking Class", description: "Learn to cook local delicacies in a hands-on cooking class." },
    { day: 10, title: "Farewell Dinner", description: "Enjoy a special farewell dinner with cultural performances." },
  ];

  return (
    <div className="bg-background text-foreground">
      <div className="mx-auto max-w-4xl">
        <div className="flex min-h-screen w-full flex-col">
          <PackageHeader title={pkg.title} pkg={pkg} />
          <main className="flex-1 overflow-y-auto pb-24">
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
                  <p className="flex items-center justify-center gap-1 text-lg font-bold">
                    <Users className="h-5 w-5" />
                    Up to 12
                  </p>
                </div>
                 <div className="rounded-lg bg-card p-4 shadow">
                  <p className="text-sm text-muted-foreground">Activity</p>
                  <p className="flex items-center justify-center gap-1 text-lg font-bold">
                    <User className="h-5 w-5" />
                    Sightseeing
                  </p>
                </div>
              </div>
              
              <div className="mb-6 rounded-lg bg-card p-6 shadow">
                <h3 className="text-xl font-bold font-headline mb-4">
                  Tour Operator
                </h3>
                <div className="flex items-start gap-4">
                  <Link href={`/agents/${agent.id}`} passHref>
                    <Avatar className="w-16 h-16 border-2 border-primary">
                      <AvatarImage src={agent.logo} data-ai-hint={agent.hint} />
                      <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="flex-1">
                    <Link href={`/agents/${agent.id}`} passHref>
                      <p className="font-bold text-lg hover:underline">{agent.name}</p>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-1">
                      Verified Local Partner
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-accent fill-current" />
                      <span className="font-semibold">{agent.rating}</span>
                      <a href="#reviews" className="text-muted-foreground hover:underline">({agent.reviews} reviews)</a>
                    </div>
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

              <div className="mb-6" id="reviews">
                 <h3 className="text-xl font-bold font-headline mb-4">
                  What Travelers Are Saying
                </h3>
                <div className="space-y-4">
                  {testimonials.slice(0,2).map(testimonial => (
                      <Card key={testimonial.id} className="border-none shadow-lg">
                        <CardContent className="p-6">
                           <div className="flex items-start gap-4">
                              <Avatar className="w-12 h-12 border-2 border-accent">
                                  <AvatarImage src={testimonial.avatar} data-ai-hint={testimonial.hint} />
                                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-bold font-headline text-foreground">{testimonial.name}</p>
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star key={i} className="h-4 w-4 text-accent fill-current" />
                                    ))}
                                  </div>
                                </div>
                                <p className="italic text-sm text-muted-foreground">"{testimonial.quote}"</p>
                              </div>
                           </div>
                        </CardContent>
                      </Card>
                  ))}
                </div>
              </div>

            </div>
          </main>
          <footer className="fixed bottom-0 left-0 right-0 w-full bg-background/80 backdrop-blur-sm border-t">
            <div className="mx-auto max-w-4xl p-4">
              <div className="flex gap-4">
                <AskAgentDialog agent={agent} />
                <Button size="lg" className="w-full text-lg">Request to Book</Button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

    