import { AppSidebar1 } from "@/components/app-sidebar-admin-1"
import { AppSidebar2 } from "@/components/app-sidebar-admin-2"
import { AppSidebar3 } from "@/components/app-sidebar-admin-3"
import { AppSidebar4 } from "@/components/app-sidebar-admin-4"
import { AppSidebar5 } from "@/components/app-sidebar-admin-5"
import { AppSidebar6 } from "@/components/app-sidebar-admin-6"
import Theme from "@/components/Theme"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import IITLoader from "@/components/IITLoader"
import { fetchAdminProfile, fetchAdmin1All} from "@/Services/Admin"
import { auth } from "@/Firebase/config"

const AdminLecturers = () => {
  // Fetch admin profile
  const { data: adminData, isLoading: adminLoading } = useQuery({
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

  // Fetch all lecturers
  const { data: lecturersData = [], isLoading: lecturersLoading} = useQuery({
      queryKey: ["lecturers"],
      queryFn: async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");

      const idToken = await currentUser.getIdToken();
      return fetchAdmin1All(idToken);
    },
    retry: false, 
    retryOnMount: false,
  });

  const SidebarComponent = ({
    "1": AppSidebar1,
    "2": AppSidebar2,
    "3": AppSidebar3,
    "4": AppSidebar4,
    "5": AppSidebar5,
    "6": AppSidebar6,
  } as const)[String(adminData?.admin?.adminLevel || "1")] || AppSidebar1;

  if (lecturersLoading || adminLoading ) {
    return <IITLoader/>
  }

  return (
    <SidebarProvider>
      <SidebarComponent />
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
                <BreadcrumbPage>Lecturers</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
            <Theme/>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold mb-4">Lecturers</h2>
            </div>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>University Email</TableHead>
                    <TableHead>Username</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {lecturersData.map((lecturers) => (
                    <TableRow key={lecturers.id}>
                        <TableCell>{lecturers.user?.firstName}</TableCell>
                        <TableCell>{lecturers.user?.lastName}</TableCell>
                        <TableCell>{lecturers.user?.uniEmail}</TableCell>
                        <TableCell>{lecturers.user?.username}</TableCell>                
                    </TableRow>
                ))}
                </TableBody>
            </Table>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AdminLecturers
