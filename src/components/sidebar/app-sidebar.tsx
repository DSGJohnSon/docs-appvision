"use client";

import * as React from "react";
import { LucideChevronsLeft, LucideChevronsRight } from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavProjects } from "@/components/sidebar/nav-projects";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { useCurrent } from "@/features/auth/api/use-current";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { temp } from "@/data/temp";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: user, isLoading } = useCurrent();

  const { toggleSidebar, open } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="text-sidebar-foreground/70 flex gap-4"
              asChild>
              <div>
                {open ? (
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={toggleSidebar}>
                    <LucideChevronsLeft className="text-sidebar-foreground/70" />
                  </Button>
                ) : (
                  <LucideChevronsRight
                    className="text-sidebar-foreground/70 cursor-pointer"
                    onClick={toggleSidebar}
                  />
                )}
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
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {!open ? (
            <SidebarMenuItem className="space-y-4 mt-2">
              <Link
                href={"/"}
                title="Retour à la doc"
                className="flex items-center justify-center">
                <Image
                  src={"/favicon/favicon-prysm.ico"}
                  alt="Prysm"
                  className="hover:animate-spin"
                  width={24}
                  height={24}
                />
              </Link>
              <Separator />
            </SidebarMenuItem>
          ) : null}
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={temp.navMain} />
        <NavProjects projects={temp.projects} />
      </SidebarContent>
      <SidebarFooter>
        {user ? (
          <NavUser
            user={user.data}
            profile={user.profile}
            isLoading={isLoading}
          />
        ) : null}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
