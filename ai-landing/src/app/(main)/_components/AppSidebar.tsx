"use client";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sidebarData } from "@/constants";
import { usePathname, useRouter } from "next/navigation";

export const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarContent className="px-2">
        <SidebarMenu>
          {sidebarData.navMain.map((item :any, index:any) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton
                tooltip={item.title}
                onClick={() => router.push(item.url)}
                className={`${pathname === item.url ? "bg-blue-500 text-sidebar-accent dark:text-primary hover:bg-blue-500 hover:text-sidebar-accent" : ""}`}
              >
                <item.icon className="h-5 w-5" />
                <span className="ml-2">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};