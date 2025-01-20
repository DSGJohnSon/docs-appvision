import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Page() {
  return (
    <div>
      Page 6
      <Button asChild>
        <Link href="/docs/page2/page3/page4/page5">Page 5</Link>
      </Button>
    </div>
  );
}

export default Page;
