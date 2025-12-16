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
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import { fetchAllResources } from "@/Services/Resources"

const Resources = () => {
  const token = localStorage.getItem("token");
  console.log(token)

  // Fetch all resources
  const { data: resourcesData = []} = useQuery({
      queryKey: ["resources"],
      queryFn: () => fetchAllResources(token!),
      enabled: !!token,
  });

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
                <BreadcrumbPage>Resources</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
            <Theme/>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min p-4">
              <h2 className="text-lg font-semibold mb-4">Resources</h2>
              <Table>
                  <TableCaption>List of resources</TableCaption>
                  <TableHeader>
                  <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Department Name</TableHead>
                      <TableHead>Available</TableHead>
                      <TableHead>Created At</TableHead>
                  </TableRow>
                  </TableHeader>
                  <TableBody>
                  {resourcesData.map((resources) => (
                      <TableRow key={resources.id}>
                      <TableCell>{resources.name}</TableCell>
                      <TableCell>{resources.department.name}</TableCell>
                      <TableCell>{resources.isAvailable}</TableCell>
                      <TableCell>{new Date(resources.createdAt).toLocaleString()}</TableCell>
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

export default Resources
