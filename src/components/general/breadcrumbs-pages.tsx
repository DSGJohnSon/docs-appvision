"use client";

import React from "react";
import { Separator } from "../ui/separator";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

function BreadcrumbPages() {
  //Get pathname
  const pathname = usePathname();
  //Split pathname in array
  const pathArray = pathname.split("/");
  //Remove empty strings from array
  pathArray.shift();

  return (
    <div className="flex items-center gap-2">
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            {/* For Main Page Only */}
            {pathArray.length <= 1 && (
              <BreadcrumbPage className="capitalize">
                {pathArray[0]}
              </BreadcrumbPage>
            )}
            {/* If there is more than 1 page */}
            {pathArray.length > 1 && (
              <BreadcrumbLink
                href={`/${pathArray.slice(0, 1).join("/")}`}
                className="capitalize">
                {pathArray[0]}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {/* If there is more than 1 page */}
          {pathArray.length > 1 && <BreadcrumbSeparator />}
          {/* If there is more than 1 page and less than 3 */}
          {pathArray.length > 1 &&
            pathArray.length <= 4 &&
            pathArray.map(
              (item, index) =>
                0 < index &&
                index < pathArray.length - 1 && (
                  <div key={index} className="flex items-center gap-3">
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href={`/${pathArray.slice(0, index + 1).join("/")}`}
                        className="capitalize">
                        {item}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </div>
                )
            )}
          {/* If there is more than 1 page and less than 3 */}
          {pathArray.length > 4 && (
            <>
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {pathArray.map(
                      (item, index) =>
                        0 < index &&
                        index < pathArray.length - 2 && (
                          <DropdownMenuItem key={index} asChild>
                            <Link
                              href={`/${pathArray
                                .slice(0, index + 1)
                                .join("/")}`}
                              className="capitalize">
                              {item}
                            </Link>
                          </DropdownMenuItem>
                        )
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/${pathArray[pathArray.length - 2]}`}
                  className="capitalize">
                  {pathArray[pathArray.length - 2]}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          {/* Finally, always render last page of the pathname */}
          {pathArray.length > 1 && (
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">
                {pathArray[pathArray.length - 1]}
              </BreadcrumbPage>
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export default BreadcrumbPages;
