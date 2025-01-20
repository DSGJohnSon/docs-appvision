import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Page() {
  return (
    <div>
      Page 2
      <Button asChild>
        <Link href="/docs">Page Docs</Link>
      </Button>
      <Button asChild>
        <Link href="/docs/page2/page3">Page 3</Link>
      </Button>
    </div>
  );
}

export default Page;
