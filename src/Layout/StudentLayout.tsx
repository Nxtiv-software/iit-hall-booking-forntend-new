import { AppSidebar } from "@/components/app-sidebar-student";
import Theme from "@/components/Theme";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Plus, Calendar, MapPin } from "lucide-react";
import { fetchPendingRequestCount, fetchRejectedRequestCount, fetchStudentBookingCount, fetchStudentProfile, fetchStudentUpcomingBookings } from "@/Services/Students";
import { useQuery } from "@tanstack/react-query";
import { auth } from "@/Firebase/config";
import IITLoader from "../components/IITLoader";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const breadcrumbMap: Record<string, { label: string; parent?: string }> = {
  "/student-dashboard": { label: "Dashboard" },
  "/student-dashboard/student-add-booking": {
    label: "Add a Booking",
    parent: "/student-dashboard",
  },
  "/student-dashboard/student-bookings": {
    label: "Bookings",
    parent: "/student-dashboard",
  },
  "/student-dashboard/student-settings": {
    label: "Settings",
    parent: "/student-dashboard",
  },
  "/student-dashboard/student-venues": {
    label: "Venues",
    parent: "/student-dashboard",
  },
  "/student-dashboard/student-pending-requests": {
    label: "Pending Requests",
    parent: "/student-dashboard",
  },
  "/student-dashboard/student-rejected-requests": {
    label: "Rejected Requests",
    parent: "/student-dashboard",
  },
  // Add more routes as needed
};

const StudentLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch student profile
  const { data: studentData, isLoading: studentLoading } = useQuery({
    queryKey: ["studentProfile"],
    queryFn: async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");

      const idToken = await currentUser.getIdToken();
      return fetchStudentProfile(idToken);
    },
    retry: false, 
    retryOnMount: false,
  });

  const studentId = studentData?.student?.id;  

  // Fetch pending request count
  const { data: pendingCount, isLoading: pendingCountLoading } = useQuery({
    queryKey: ["pendingCount"],
    queryFn: async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) throw new Error("Not authenticated");
  
        const idToken = await currentUser.getIdToken();
        return fetchPendingRequestCount(idToken, studentId!);
      },
      enabled: !!studentId,
      retry: false, 
  });

  // Fetch rejected request count
  const { data: rejectedCount, isLoading: rejectedCountLoading } = useQuery({
    queryKey: ["rejectedCount"],
    queryFn: async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) throw new Error("Not authenticated");
  
        const idToken = await currentUser.getIdToken();
        return fetchRejectedRequestCount(idToken, studentId!);
      },
      enabled: !!studentId,
      retry: false, 
  });

  // Fetch booking request count
  const { data: bookingCount, isLoading: bookingCountLoading } = useQuery({
    queryKey: ["bookingCount"],
    queryFn: async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) throw new Error("Not authenticated");
  
        const idToken = await currentUser.getIdToken();
        return fetchStudentBookingCount(idToken, studentId!);
      },
      enabled: !!studentId,
      retry: false, 
  });

  // Fetch upcoming events
  const { data: upcomingEventData = [], isLoading: upcomingLoading } = useQuery({
    queryKey: ["upcomingEvents"],
    queryFn: async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");
      const idToken = await currentUser.getIdToken();
      return fetchStudentUpcomingBookings(idToken, studentId!);
    },
    enabled: !!studentId,
    retry: false, 
  });

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
    [location],
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
        breadcrumbs.push({
          label: config.label,
          isLast: index === pathSegemnts.length - 1,
        });
      }
    });

    return breadcrumbs;
  };

  const breadcumbs = getBreadCrumbs();

  function handleBookingRequest() {
    navigate("/student-add-booking");
  }

  function handleViewBookings() {
    navigate("/student-bookings");
  }

  function handleViewVenues() {
    navigate("/student-venues");
  }

  if ( studentLoading || bookingCountLoading || pendingCountLoading || rejectedCountLoading || upcomingLoading ) {
    return <IITLoader/>
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
                  {!item.isLast && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          <div className="ml-auto">
            <Theme />
          </div>
        </header>
        {/* <div className="flex items-center justify-center flex-1 overflow-y-auto"> */}

        {/* <Outlet /> */}

        {/* </div> */}
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div>
            <CardTitle className="text-xl mb-2">Quick Actions</CardTitle>
            <div className="rounded-xl grid auto-rows-min gap-4 md:grid-cols-3 text-xl mb-5">
              
              <Card onClick={handleBookingRequest} className="@container/card w-full">
                <CardHeader className="flex items-center gap-4">
                  <div className="rounded bg-muted/50 p-3">
                    <Plus
                      className="h-5 w-5 cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <CardTitle className="font-medium text-sm">
                      Add a Booking
                    </CardTitle>
                    <CardDescription>
                      Reserve a venue for your event or activity
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>

             <Card onClick={handleViewBookings} className="@container/card w-full">
                <CardHeader className="flex items-center gap-4">
                  <div className="rounded bg-muted/50 p-3">
                    <Calendar
                      className="h-5 w-5 cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <CardTitle className="font-medium text-sm">
                     View Bookings
                    </CardTitle>
                    <CardDescription>
                      Track and manage your venue reservations
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>

              <Card onClick={handleViewVenues} className="@container/card w-full">
                <CardHeader className="flex items-center gap-4">
                  <div className="rounded bg-muted/50 p-3">
                    <MapPin
                      className="h-5 w-5 cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <CardTitle className="font-medium text-sm">
                      View Venues
                    </CardTitle>
                    <CardDescription>
                      Browse available venues and facilities
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>

            </div>
          </div>

          <div>
            <CardTitle className="text-xl mb-2">Booking Statistics</CardTitle>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 rounded-xl">
              <Card className="@container/card">
                <CardHeader>
                  <CardDescription className="line-clamp-1 flex gap-2 font-medium text-xl">
                    Your Bookings
                  </CardDescription>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-4xl">
                    { pendingCount?.count ?? 0 }
                  </CardTitle>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                  <div className="text-muted-foreground">
                    Check recent activity
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div className="bg-muted/50 rounded-xl">
              <Card className="@container/card">
                <CardHeader>
                  <CardDescription className="line-clamp-1 flex gap-2 font-medium text-xl">
                    Pending Requests
                  </CardDescription>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-4xl">
                    { bookingCount?.count ?? 0 }
                  </CardTitle>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                  <div className="text-muted-foreground">
                    Review pending actions
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div className="bg-muted/50 rounded-xl">
              <Card className="@container/card">
                <CardHeader>
                  <CardDescription className="line-clamp-1 flex gap-2 font-medium text-xl">
                    Rejected Requests
                  </CardDescription>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-4xl">
                    { rejectedCount?.count ?? 0 }
                  </CardTitle>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                  <div className="text-muted-foreground">
                    Requires attention
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
          </div>
          {/* <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">Upcoming bookings</CardTitle>
              <CardDescription>
                Events happening within the upcoming week
              </CardDescription>
            </CardHeader> */}
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
          {/* </Card> */}
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">Upcoming Events</CardTitle>
              <CardDescription>Events happening within the upcoming week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[400px] overflow-y-auto">
              <ul className="space-y-3">
                {upcomingEventData.map((booking) => (
                  <li
                    key={booking.id}
                    className="flex flex-col gap-8 p-4 border rounded-lg bg-muted/50 hover:bg-muted/70 transition sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex-shrink-0">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={booking.request.student.user.avatarUrl} alt="Student avatar" />
                        <AvatarFallback>{booking.request.student.user.username.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <p className="text-sm text-muted-foreground  font-medium">Event</p>
                      <p className="font-semibold text-base line-clamp-1">
                        {booking.request.title}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Requestor</p>
                      <p className="font-medium">{booking.request.student.user.username}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Venue</p>
                      <p className="font-medium">{booking.request.venue.name}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">
                        {new Date(booking.request.requiredDate).toLocaleDateString(undefined, {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default StudentLayout;
