import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Page() {
  return (
    <div>
      Page 3
      <Button asChild>
        <Link href="/docs/page2">Page 2</Link>
      </Button>
      <Button asChild>
        <Link href="/docs/page2/page3/page4">Page 4</Link>
      </Button>
    </div>
  );
}

export default Page;
