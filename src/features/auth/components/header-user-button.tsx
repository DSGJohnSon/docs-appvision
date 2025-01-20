"use client";

import {
  LucideBadgeCheck,
  LucideBell,
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
import Link from "next/link";
import { useLogout } from "@/features/auth/api/use-logout";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { useCurrent } from "../api/use-current";
import { Skeleton } from "@/components/ui/skeleton";

function HeaderUserButton() {
  const { data: user, isLoading } = useCurrent();
  const { theme, setTheme } = useTheme();
  const { mutate: logout } = useLogout();

  if (isLoading) {
    return (
      <>
        <Skeleton className="block h-8 w-8 rounded-lg" />
      </>
    );
  }

  if (!user) {
    return null;
  }

  const name = user.data.name;
  const email = user.data.email;
  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase() ?? "U";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8 rounded-lg border">
            <AvatarImage src={user.profile?.avatarUrl} alt={name} />
            <AvatarFallback className="rounded-lg">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          side={"bottom"}
          align="start"
          sideOffset={4}>
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.profile?.avatarUrl} alt={name} />
                <AvatarFallback className="rounded-lg">
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{name}</span>
                <span className="truncate text-xs">{email}</span>
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
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={"/profile"} title="Voir mon compte" passHref>
                <LucideBadgeCheck className="size-4" />
                Compte
              </Link>
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
          <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
            <LucideLogOut className="size-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default HeaderUserButton;
