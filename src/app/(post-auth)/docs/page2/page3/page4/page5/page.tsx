import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Page() {
  return (
    <div>
      Page 5
      <Button asChild>
        <Link href="/docs/page2/page3/page4">Page 4</Link>
      </Button>
      <Button asChild>
        <Link href="/docs/page2/page3/page4/page5/page6">Page 6</Link>
      </Button>
    </div>
  );
}

export default Page;
