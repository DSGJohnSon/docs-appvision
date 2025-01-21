"use client";

import * as React from "react";
import {
  LucideBookOpenText,
  LucideChartArea,
  LucideChevronsLeft,
  LucideChevronsRight,
  LucideUsers,
} from "lucide-react";

import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
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

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { data: user, isLoading } = useCurrent();

  const { toggleSidebar, open } = useSidebar();

  const temp = {
    navMain: [
      {
        title: "Users",
        url: "/admin/users",
        icon: LucideUsers,
        isActive: true,
        category: "administration",
      },
      {
        title: "Documents",
        url: "/admin/documents",
        icon: LucideBookOpenText,
        isActive: true,
        category: "content",
      },
      {
        title: "Datas",
        url: "/admin/datas",
        icon: LucideChartArea,
        isActive: true,
        category: "datas",
      },
    ],
  };

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
            <Separator className="mt-2" />
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
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarMenu>
            {temp.navMain
              .filter((item) => item.category === "administration")
              .map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton tooltip={item.title} asChild>
                    <Link
                      href={item.url}
                      title={item.title}
                      className="flex items-center gap-2">
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
          <SidebarMenu>
            {temp.navMain
              .filter((item) => item.category === "content")
              .map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton tooltip={item.title} asChild>
                    <Link
                      href={item.url}
                      title={item.title}
                      className="flex items-center gap-2">
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Datas</SidebarGroupLabel>
          <SidebarMenu>
            {temp.navMain
              .filter((item) => item.category === "datas")
              .map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton tooltip={item.title} asChild>
                    <Link
                      href={item.url}
                      title={item.title}
                      className="flex items-center gap-2">
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroup>
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
