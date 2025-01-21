"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCurrent } from "@/features/auth/api/use-current";
import {
  LucideLandmark,
  LucidePencil,
  LucideRectangleEllipsis,
} from "lucide-react";
import React from "react";

function Page() {
  const { data: user, isLoading } = useCurrent();

  const avatarFallback = user?.data.name
    ? user?.data.name.charAt(0).toUpperCase()
    : user?.data.email.charAt(0).toUpperCase() ?? "U";

  return (
    <div className="w-full min-h-full flex flex-col items-center pt-16">
      <Avatar className="h-32 w-32 rounded-lg border">
        <AvatarImage src={user?.profile.avatarUrl} alt={user?.data.name} />
        <AvatarFallback className="rounded-lg">{avatarFallback}</AvatarFallback>
      </Avatar>
      <div className="mt-4 text-2xl font-bold">{user?.data.name}</div>
      <div className="text-gray-500">{user?.data.email}</div>
      <Separator className="my-8 w-1/4" />
      <div className="space-x-4">
        <Button disabled>
          <LucideRectangleEllipsis className="mr-1" />
          Change password
        </Button>
        <Button variant={"outline"} disabled>
          <LucidePencil className="mr-1" />
          Edit profile
        </Button>
      </div>
      <Separator className="my-8 w-1/4" />
      <div className="flex items-center gap-4 border rounded-lg px-4 py-2">
        <LucideLandmark className="w-8 h-8" />
        <div>
          <div className="text-lg font-bold">Company</div>
          <div className="text-sm text-gray-500">/--/</div>
        </div>
      </div>
    </div>
  );
}

export default Page;
