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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchAllResources } from "@/Services/Resources"
import IITLoader from "@/components/IITLoader"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { createResource, updateResource, deleteResource, fetchAdminProfile} from "@/Services/Admin"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { fetchAllDepartments } from "@/Services/Departments"
import { auth } from "@/Firebase/config"

const Users = () => {
  const queryClient = useQueryClient()
  
  const [token, setToken] = useState<string>("")

  useEffect(() => {
    const user = auth.currentUser
    if (!user) return
    user.getIdToken().then(setToken)
  }, [])

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

  // Fetch all users
  const { data: resourcesData = [], isLoading: resourcesLoading} = useQuery({
      queryKey: ["resources"],
      queryFn: async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");

      const idToken = await currentUser.getIdToken();
      return fetchAllResources(idToken);
    },
    retry: false, 
    retryOnMount: false,
  });

  // Fetch all departments
  const { data: departmentsData = [], isLoading: departmentsLoading} = useQuery({
      queryKey: ["departments"],
      queryFn: async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("Not authenticated");

      const idToken = await currentUser.getIdToken();
      return fetchAllDepartments(idToken);
    },
    retry: false, 
    retryOnMount: false,
  });

  const adminId = adminData?.admin?.id;
  // const departmentId = adminData?.admin?.department?.id;

  const [ resourceName, setResourceName ] = useState<string>("");
  const [ departmentId, setDepartmentId ] = useState<string>("");
  const [ availability, setAvailability ] = useState<boolean>(true);

  const [ editDepartmentId, setEditDepartmentId ] = useState("")
  const [ editingResource, setEditingResource ] = useState<any>(null)
  const [ editName, setEditName ] = useState("")
  const [ editAvailability, setEditAvailability ] = useState(true)

  
  const createMutation = useMutation({
    mutationFn: () =>
      createResource(
        adminId!,
        departmentId!,
        {
          name: resourceName,
          isAvailable: availability,
        },
        token!
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      setResourceName("");
      setAvailability(true);
      toast.success("Resource created successfully");
    },

    onError: (err: any) => {
      console.log("Create Resource Failed", err.response?.data || err);
      toast.error("Resource creation failed");
    },
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      updateResource(
        adminId!,
        editDepartmentId!,
        editingResource.id,
        { name: editName, isAvailable: editAvailability },
        token!
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] })
      setEditingResource(null)
      toast.success("Resource updated successfully");
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (resourceId: string) =>
      deleteResource(adminId!, departmentId!, resourceId, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] })
      toast.success("Resource deleted successfully");
    },
  })


  if (resourcesLoading || adminLoading ) {
    return <IITLoader/>
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
                <BreadcrumbPage>Resources</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
            <Theme/>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Users
