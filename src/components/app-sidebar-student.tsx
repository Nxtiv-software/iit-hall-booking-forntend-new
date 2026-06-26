import * as React from "react";
import { SearchForm } from "@/components/search-form";
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
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/AuthProvider/FirebaseProvider/AuthProvider";
import IITLogo from "./../assets/images/general/IIT_logo_cropped.png";

const navdata = [
  { title: "Menu",
    items: [
      { title: "Dashboard", url: "/student-dashboard" },
      { title: "Add a Booking", url: "/student-add-booking" },
      { title: "Bookings", url: "/student-bookings" },
      { 
        title: "Requests", 
        url: "/student-pending-requests",
        items: [
          { title: "Pending Requests", url: "/student-pending-requests" },
          { title: "Rejected Requests", url: "/student-rejected-requests" },
        ]
      },
      { title: "Venues", url: "/student-venues" }
    ]
  },
  {
    title: "General",
    items: [
      { title: "Settings", url: "/student-settings" }
    ]
  }
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <Sidebar {...props}>
      <div>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link to="/dashboard">
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
          {/* <SearchForm /> */}
        </SidebarHeader>
        <SidebarContent>
                <SidebarGroup>
                  <SidebarMenu>
                    {navdata.map((group) => (
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
      </div>
      <Button onClick={handleLogout} className="mt-auto mb-5 mx-5">
        Log Out
      </Button>
    </Sidebar>
  );
}
