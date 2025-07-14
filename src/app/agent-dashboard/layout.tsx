
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Package,
  Users,
  MessageSquare,
  LogOut,
  Map,
  PanelLeft,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const AgentSidebar = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const navItems = [
    { href: "/agent-dashboard", icon: Package, label: "My Packages" },
    { href: "/agent-dashboard/customers", icon: Users, label: "Customers" },
    { href: "/agent-dashboard/messages", icon: MessageSquare, label: "Messages" },
  ];

  return (
    <nav className={cn("flex flex-col h-full bg-background border-r", className)}>
      <div className="flex items-center justify-center border-b h-16 shrink-0 px-4">
        <Link href="/agent-dashboard" className="flex items-center gap-2 font-semibold">
          <Map className="h-6 w-6 text-primary" />
          <span>Agent Panel</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <TooltipProvider>
            <ul className="space-y-1 px-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.label}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={item.href}>
                          <Button
                            variant={isActive ? "secondary" : "ghost"}
                            className="w-full justify-start gap-2"
                          >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{item.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  </li>
                );
              })}
            </ul>
        </TooltipProvider>
      </div>
      <div className="mt-auto border-t p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="company logo"/>
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>
                <div className="text-left">
                    <p className="text-sm font-medium">Siam Adventures</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Agent Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/agentlogin">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log Out</span>
                  </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
    </nav>
  );
};


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function AgentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <AgentSidebar />
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden">
           <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                >
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[280px]">
                <AgentSidebar />
              </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
                {/* Mobile Header content can go here */}
            </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
          {children}
        </main>
      </div>
    </div>
  );
}
