import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Page() {
  return (
    <div>
      Page Docs
      <Button asChild>
        <Link href="/docs/page2">Page 2</Link>
      </Button>
    </div>
  );
}

export default Page;
