import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LucideBookOpenText } from "lucide-react";
import Link from "next/link";
import React from "react";

function Page() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <LucideBookOpenText size={16} />
        Page Listing Documents
      </div>
      <Separator className="my-8" />
      <div>
        <p>
          Page{" "}
          <span className="bg-foreground/10 text-muted-foreground py-1 px-2 rounded-md">
            Demo
          </span>
        </p>
      </div>
      <Separator className="my-8" />
      <div>
        <Button>
          <Link href="/admin/documents/demo" className="capitalize">
            Edit page Demo
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Page;
