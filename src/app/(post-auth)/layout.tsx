import ActionsHeader from "@/components/general/actions-header";
import BreadcrumbPages from "@/components/general/breadcrumbs-pages";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { NavBarMobile } from "@/components/sidebar/nav-mobile";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getCurrent } from "@/features/auth/actions";
import HeaderUserButton from "@/features/auth/components/header-user-button";
import { redirect } from "next/navigation";

export default async function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrent();
  if (!user) {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="fixed top-0 bg-background w-full md:w-[calc(100%-var(--sidebar-width))] flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 md:group-has-[[data-collapsible=icon]]/sidebar-wrapper:w-[calc(100%-var(--sidebar-width-icon))] border-b px-4">
          <div className="flex md:hidden items-center gap-4">
            <NavBarMobile />
            <HeaderUserButton />
          </div>
          <div className="hidden md:block">
            <BreadcrumbPages />
          </div>
          <ActionsHeader />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-20 group-has-[[data-collapsible=icon]]/sidebar-wrapper:pt-[4rem]">
          <div className="md:hidden">
            <BreadcrumbPages />
          </div>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
