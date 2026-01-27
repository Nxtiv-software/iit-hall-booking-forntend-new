import { AppSidebar } from "@/components/app-sidebar-admin"
import Theme from "@/components/Theme"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { useQuery } from "@tanstack/react-query"
import { fetchTotalStudentCount } from "@/Services/Students"
import IITLoader from "@/components/IITLoader"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"

import { auth } from "../Firebase/config"

const AdminLayout = () => {
  // Fetch the admin details
  const { data: adminData, isLoading: adminLoading, error: adminError } = useQuery({
    queryKey: ["adminProfile"],
    queryFn: async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");

      const idToken = await currentUser.getIdToken();
      return fetchAdminProfile(idToken);
    },
    retry: false, 
    retryOnMount: false,
  });

  const adminId = adminData?.admin?.id;
  const username = adminData?.admin?.user?.username;

  // Fetch total booking count
  const { data: bookingCountData, isLoading: bookingLoading } = useQuery({
    queryKey: ["totalBookings"],
    queryFn: async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");
      const idToken = await currentUser.getIdToken();
      return fetchTotalBookingCount(idToken);
    },
  });

  // Fetch total student count
  const { data: studentCountData, isLoading: studentLoading } = useQuery({
    queryKey: ["totalStudents"],
    queryFn: async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");
      const idToken = await currentUser.getIdToken();
      return fetchTotalStudentCount(idToken);
    },
  });

  //Helper function to create the date format
  const formatDate = (date: Date) => {
    const day = date.getDate()

    const getOrdinal = (n: number) => {
      const s = ["th", "st", "nd", "rd"]
      const v = n % 100
      return s[(v - 20) % 10] || s[v] || s[0]
    }

    const weekday = date.toLocaleDateString("en-US", { weekday: "long" })
    const month = date.toLocaleDateString("en-US", { month: "long" })

    return `${weekday}, ${day}${getOrdinal(day)} of ${month}`
  }

  if(adminLoading || bookingLoading || studentLoading){
    return <IITLoader/>
  }

  // Handle 404 error - Admin profile not found
  if (adminError) {
    const error = adminError as { response?: { status?: number } };
    if (error?.response?.status === 404) {
      return (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <div className="ml-auto flex items-center gap-3">
                <Theme/>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 items-center justify-center">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Super Admin Profile Not Found</CardTitle>
                  <CardDescription>
                    Your super admin profile hasn't been created yet. Please contact the system administrator or complete your profile setup.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Error: The endpoint <code className="bg-muted px-1 py-0.5 rounded">/admins/me</code> returned a 404 status.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => window.location.reload()} variant="outline" className="w-full">
                    Retry
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </SidebarInset>
        </SidebarProvider>
      );
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Menu
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center gap-3">
            <Button variant="outline" size="icon" className="flex items-center gap-3 px-4 py-1 h-auto w-auto">
              <div className="flex flex-col text-left leading-tight">
                <span className="text-sm font-medium">
                  {adminData?.admin?.user?.username ?? "Username"}
                </span>
                <span className="text-xs text-muted-foreground">
                  Admin
                </span>
              </div>
              <div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={adminData?.admin?.user?.avatarUrl} alt="User avatar image" />
                  <AvatarFallback><User></User></AvatarFallback>
                </Avatar>
              </div>
            </Button>
            <Theme/>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* <div className="bg-muted/50 rounded-xl">
            <div></div>
            <Card className="@container/card">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-4xl">
                  {`Hey, welcome back ${username ? username.charAt(0).toUpperCase() + username.slice(1) : "User"}`}
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  {formatDate(new Date())}
                </div>
              </CardFooter>
            </Card>
          </div> */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 rounded-xl">
              <Card className="@container/card">
                <CardHeader>
                  <CardDescription className="line-clamp-1 flex gap-2 font-medium text-xl">Total Admins</CardDescription>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-4xl">
                    {bookingLoading ? "Loading..." : bookingCountData?.totalBookings ?? 0}
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
                  <CardDescription className="line-clamp-1 flex gap-2 font-medium text-xl">Total Students</CardDescription>
                  <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-4xl">
                    {studentLoading ? "Loading..." : studentCountData?.totalStudents ?? 0}
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
          
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AdminLayout
