"use client";

import {
  LucideBadgeCheck,
  LucideBell,
  LucideChevronsUpDown,
  LucideExternalLink,
  LucideLifeBuoy,
  LucideLogOut,
  LucideMoon,
  LucideSun,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import UserButton from "@/features/auth/components/user-button";
import { Models } from "node-appwrite";
import Link from "next/link";
import { useLogout } from "@/features/auth/api/use-logout";
import { useTheme } from "next-themes";
import { Switch } from "../ui/switch";

export function NavUser({
  user,
  profile,
  isLoading,
}: {
  user: Models.User<Models.Preferences> | null | undefined;
  profile: Models.Document | null | undefined;
  isLoading: boolean;
}) {
  const { theme, setTheme } = useTheme();
  const { isMobile } = useSidebar();
  const { mutate: logout } = useLogout();

  if (!user) {
    return null;
  }

  const { name, email } = user;
  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase() ?? "U";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <UserButton user={user} profile={profile} isLoading={isLoading} />
              <LucideChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={profile?.avatarUrl} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {avatarFallback}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  href="https://www.prysm-software.com"
                  target="_blank"
                  title="Visitez le site officiel Prysm"
                  className="flex items-center gap-2">
                  <LucideExternalLink className="size-4" />
                  Prysm Software
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="https://prysmsupport.freshdesk.com/fr/support/login"
                  target="_blank"
                  title="Visitez le support officiel Prysm"
                  className="flex items-center gap-2">
                  <LucideLifeBuoy className="size-4" />
                  Support
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem disabled>
                <LucideBadgeCheck className="size-4" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <LucideBell className="size-4" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="w-full justify-between cursor-pointer"
                onClick={() => {
                  if (theme === "light") {
                    setTheme("dark");
                  } else {
                    setTheme("light");
                  }
                }}>
                <div className="flex items-center gap-2">
                  {theme === "light" ? (
                    <LucideSun className="size-4" />
                  ) : (
                    <LucideMoon className="size-4" />
                  )}
                  Mode sombre
                </div>
                <Switch checked={theme === "dark"} />
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => logout()}
              className="cursor-pointer">
              <LucideLogOut className="size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
