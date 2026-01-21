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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const breadcrumbMap: Record<string, { label: string; parent?: string }> = {
  "/dashboard": { label: "Dashboard" },
  "/dashboard/booking": { label: "Add a Booking", parent: "/dashboard" },
  // Add more routes as needed
};


const StudentLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
    const breadcrumbs: { label: string; isLast: boolean }[] = [];

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

  function handleBookingRequest() {
   navigate("/booking");
  }

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
        {/* <div className="flex items-center justify-center flex-1 overflow-y-auto"> */}

          {/* <Outlet /> */}
          
        {/* </div> */}
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="rounded-xl px-2 flex flex-col gap-2 items-start text-xl mb-5">
            <h1>Quick Actions</h1>
            <Button onClick={handleBookingRequest} className="">+ New Booking Request</Button>
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 rounded-xl">
              <Card className="@container/card">
                <CardHeader>
                  <CardDescription className="line-clamp-1 flex gap-2 font-medium text-xl">Upcoming Bokkings</CardDescription>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-4xl">
                    {/* {pendingLoading ? "Loading..." : pendingCountData?.totalPendings ?? 0} */}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                  <div className="line-clamp-1 flex gap-2 font-medium">
                    Down 20% this period 
                  </div>
                  <div className="text-muted-foreground">
                    Acquisition needs attention
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div className="bg-muted/50 rounded-xl">
              <Card className="@container/card">
                <CardHeader>
                  <CardDescription className="line-clamp-1 flex gap-2 font-medium text-xl">Pending Approvals</CardDescription>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-4xl">
                    {/* {bookingLoading ? "Loading..." : bookingCountData?.totalBookings ?? 0} */}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                  <div className="line-clamp-1 flex gap-2 font-medium">
                    Down 20% this period 
                  </div>
                  <div className="text-muted-foreground">
                    Acquisition needs attention
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div className="bg-muted/50 rounded-xl"> 
              <Card className="@container/card">
                <CardHeader>
                  <CardDescription className="line-clamp-1 flex gap-2 font-medium text-xl">Completed Events</CardDescription>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-4xl">
                    {/* {studentLoading ? "Loading..." : studentCountData?.totalStudents ?? 0} */}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                  <div className="line-clamp-1 flex gap-2 font-medium">
                    Down 20% this period 
                  </div>
                  <div className="text-muted-foreground">
                    Acquisition needs attention
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">Pending Approvals</CardTitle>
              <CardDescription>Events happening within the upcoming week</CardDescription>
            </CardHeader>
            {/* <CardContent className="space-y-2 max-h-[400px] overflow-y-auto">
              <ul className="space-y-2">
                {upcomingEventData.map((booking, index) => (
                  <li
                    key={booking.id}
                    className="flex items-start gap-3"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-md border-2 font-semibold translate-y-1">
                      {index + 1}
                    </span>

                    <div className="flex-1 p-4 border rounded-md bg-muted/50 flex flex-col md:flex-row md:justify-between md:items-center">
                      <div className="space-y-1">
                        <p>Student: {booking.request.student.user.username}</p>
                        <p>Venue: {booking.request.venue.name}</p>
                        <p>Date: {new Date(booking.request.createdAt).toLocaleString()}</p>
                      </div>

                      <div className="mt-2 md:mt-0 space-y-1">
                        <p>Admin: {booking.admin.user.name}</p>
                        <p>Status: {booking.request.status.name}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent> */}
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default StudentLayout;
