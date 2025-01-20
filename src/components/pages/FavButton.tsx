"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { LucideBookmark, LucideBookmarkCheck } from "lucide-react";

function FavButton() {
  const [isSaved, setIsSaved] = useState(false);

  if (isSaved) {
    return (
      <Button variant={"outline"} size={"sm"} onClick={() => setIsSaved(false)}>
        <LucideBookmark className="w-2 h-2" />
        <span className="hidden md:block text-normal">Save (13)</span>
      </Button>
    );
  } else {
    return (
      <Button variant={"default"} size={"sm"} onClick={() => setIsSaved(true)}>
        <LucideBookmarkCheck className="w-2 h-2" />
        <span className="hidden md:block text-normal">Saved</span>
      </Button>
    );
  }
}

export default FavButton;
