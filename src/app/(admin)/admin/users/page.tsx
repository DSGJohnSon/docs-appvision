import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LucideUsers } from "lucide-react";
import Link from "next/link";
import React from "react";

function Page() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <LucideUsers size={16} />
        Page Listing Users
      </div>
      <Separator className="my-8" />
      <div>
        <p>
          Florkowski Frédérick{" "}
          <span className="bg-foreground/10 text-muted-foreground py-1 px-2 rounded-md">
            67878202001638c226ae
          </span>
        </p>
      </div>
      <Separator className="my-8" />
      <div>
        <Button disabled>
          <Link href="#" className="capitalize">
            Edit
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Page;
