"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { LucideMenu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NavUser } from "./nav-user";
import { useCurrent } from "@/features/auth/api/use-current";
import { NavMain } from "./nav-main";
import { temp } from "@/data/temp";
import { NavProjects } from "./nav-projects";
import { ScrollArea } from "../ui/scroll-area";

export function NavBarMobile() {
  const { data: user, isLoading } = useCurrent();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size={"iconSm"}>
          <LucideMenu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="h-full flex flex-col justify-between">
        <SheetHeader className="border-b pb-6">
          <VisuallyHidden>
            <SheetTitle>Prysm Docs</SheetTitle>
          </VisuallyHidden>
          <Link
            href={"/"}
            title="Retour à la doc"
            className="flex items-center gap-2">
            <Image
              src={"/favicon/favicon-prysm.ico"}
              alt="Prysm"
              width={24}
              height={24}
            />
            <span className="font-bold truncate">Prysm Docs</span>
          </Link>
        </SheetHeader>
        <ScrollArea className="flex flex-col space-y-2 h-full">
          <NavMain items={temp.navMain} />
          <NavProjects projects={temp.projects} />
        </ScrollArea>
        <SheetFooter className="border-t pt-6">
          {user ? (
            <NavUser
              user={user.data}
              profile={user.profile}
              isLoading={isLoading}
            />
          ) : null}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
