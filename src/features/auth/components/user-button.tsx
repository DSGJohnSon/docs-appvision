"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Models } from "node-appwrite";
import { Skeleton } from "@/components/ui/skeleton";

function UserButton({
  user,
  profile,
  isLoading,
}: {
  user: Models.User<Models.Preferences> | null | undefined;
  profile: Models.Document | null | undefined;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <>
        <Skeleton className="h-8 w-8 rounded-lg" />
        <div className="grid flex-1 leading-tight space-y-2">
          <Skeleton className="h-2 w-full"></Skeleton>
          <Skeleton className="h-2 w-full"></Skeleton>
        </div>
      </>
    );
  }

  if (!user) {
    return null;
  }

  const { name, email } = user;
  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase() ?? "U";

  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src={profile?.avatarUrl} alt={user.name} />
        <AvatarFallback className="rounded-lg">{avatarFallback}</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{user.name}</span>
        <span className="truncate text-xs">{user.email}</span>
      </div>
    </>
  );
}

export default UserButton;
