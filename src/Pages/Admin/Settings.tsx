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
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useQuery } from "@tanstack/react-query"
import { fetchAdminProfile } from "@/Services/Admin"

const Settings = () => {
  const token = localStorage.getItem("token");
  console.log(token)

  // Fetch admin profile
  const { data: adminData } = useQuery({
      queryKey: ["adminProfile"],
      queryFn: () => fetchAdminProfile(token!),
      enabled: !!token,
  });

  console.log(adminData);

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
                <BreadcrumbPage>Settings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
            <Theme/>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min p-4">
              <h2 className="text-lg font-semibold mb-4">Settings</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                    <Avatar className="size-20">
                        <AvatarImage src={adminData.admin.user.avatarUrl} alt="User avatar image" />
                        <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                    <div>
                      {adminData.admin.user.uniEmail}
                    </div>
                </div>
                <div className="col-span-2">
                    <div>
                        <h2>Personal Information</h2>
                        <div>First Name</div>
                        <div>Last Name</div>
                        <div>Username</div>
                        <div>Phone number</div>
                        <div>Gender</div>
                    </div>
                    <div>
                        <h2>Workplace Information</h2>
                        <div>University Email</div>
                        <div>Building Name</div>
                        <div>Department Name</div>
                    </div>
                </div>
              </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Settings
