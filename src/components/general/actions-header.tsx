import React from "react";
import { Button } from "../ui/button";
import { LucideDownload } from "lucide-react";
import FavButton from "../pages/FavButton";

function ActionsHeader() {
  return (
    <div className="flex items-center md:block space-x-4">
      <FavButton />
      <Button variant={"outline"} size={"sm"}>
        <LucideDownload className="w-2 h-2" />
        <span className="md:hidden text-normal">PDF</span>
      </Button>
    </div>
  );
}

export default ActionsHeader;
