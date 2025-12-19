import { AppSidebar } from "@/components/app-sidebar-student";
import Theme  from "@/components/Theme";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const breadcrumbMap: Record<string, { label: string; parent?: string }> = {
  "/dashboard": { label: "Dashboard" },
  "/dashboard/booking": { label: "Add a Booking", parent: "/dashboard" },
  // Add more routes as needed
};

const StudentLayout = () => {
  const location = useLocation();

  useEffect(
    function getLocation() {
      // const getBreadCrumbs = () => {
      //   const pathSegemnts = location.pathname.split('/').filter(Boolean);
      //   const breadcrumbs = [];
      //   let currentPath = ''
      //   pathSegemnts.forEach((segement, index) => {
      //     currentPath += `/${segement}`
      //     console.log(currentPath)
      //     const config = breadcrumbMap[currentPath]
      //     console.log(config)
      //     if(config) {
      //       breadcrumbs.push({label: config.label})
      //     }
      //   })
      // }
      // getBreadCrumbs()
    },
    [location]
  );

  const getBreadCrumbs = () => {
    const pathSegemnts = location.pathname.split("/").filter(Boolean);
    const breadcrumbs = [];

    let currentPath = "";

    pathSegemnts.forEach((segement, index) => {
      currentPath += `/${segement}`;
      console.log(currentPath);

      const config = breadcrumbMap[currentPath];
      console.log(config);

      if (config) {
        breadcrumbs.push({ label: config.label, isLast: index === pathSegemnts.length -1 });
      }
    });

    return breadcrumbs;
  };

  const breadcumbs = getBreadCrumbs();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 ">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              
              {breadcumbs.map((item) => (
                <BreadcrumbItem key={item.label}>
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
               {!item.isLast && (<BreadcrumbSeparator className="hidden md:block" />)}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          <div className="ml-auto">
            <Theme/>
          </div>
        </header>
        <div className="flex items-center justify-center flex-1 overflow-y-auto">

          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default StudentLayout;
