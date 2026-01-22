import * as React from "react"
import { Link } from "react-router-dom";
import IITLogo from "./../assets/images/general/IIT_logo_cropped.png";

import { SearchForm } from "@/components/search-form"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button";
import { useAuth } from "@/AuthProvider/FirebaseProvider/AuthProvider";

const data = {
  navMain: [
    {
      title: "Menu",
      items: [
        { title: "Dashboard", url: "/super-admin-dashboard", isActive: true},
        { title: "Users", 
          url: "/super-admin-users",
          items: [
            { title: "Pending Requests", url: "/admin-requests-pending" },
            { title: "Rejected Requests", url: "/admin-requests-rejected" },
          ] 
        }, 
        { title: "Bookings", url: "/admin-bookings" }, 
        { title: "Resources", url: "/admin-resources" },
        { title: "Venues", url: "/admin-venues" },
      ],
    },
    {
      title: "General",
      items: [
        { title: "Settings", url: "/super-admin-settings" },
        // { title: "Help Desk", url: "/help-desk" },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/super-admin-dashboard">
                <div className="bg-accent text-sidebar-primary-foreground flex aspect-square size-11 items-center justify-center rounded-lg">
                  <img src={IITLogo} alt="IIT logo" className="size-10"/>
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Welcome to</span>
                  <span className="">IIT HALL BOOKING</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((group) => (
              <SidebarMenuItem key={group.title}>
                <SidebarMenuButton>{group.title}</SidebarMenuButton>
                {group.items?.length > 0 && (
                  <SidebarMenuSub>
                    {group.items.map((item) => (
                      <SidebarMenuSubItem key={item.title} className="mb-3">
                        <SidebarMenuSubButton asChild>
                          <Link to={item.url}>{item.title}</Link>
                        </SidebarMenuSubButton>
                        {item.items?.length > 0 && (
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title} className="mb-3">
                                <SidebarMenuSubButton asChild>
                                  <Link to={subItem.url}>{subItem.title}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        )}
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <Button onClick={handleLogout} className="mt-auto mb-5 mx-5">
        Log Out
      </Button>
    </Sidebar>
  )
}
