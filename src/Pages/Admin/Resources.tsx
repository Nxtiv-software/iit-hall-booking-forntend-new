import { AppSidebar1 } from "@/components/app-sidebar-admin-1"
import { AppSidebar2 } from "@/components/app-sidebar-admin-2"
import { AppSidebar3 } from "@/components/app-sidebar-admin-3"
import { AppSidebar4 } from "@/components/app-sidebar-admin-4"
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

const AdminResources = () => {
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

  // Fetch all resources
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

  const SidebarComponent = {
    "1": AppSidebar1,
    "2": AppSidebar2,
    "3": AppSidebar3,
    "4": AppSidebar4,
  }[adminData?.admin?.adminLevel || "1"];

  if (resourcesLoading || adminLoading ) {
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
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold mb-4">Resources</h2>
              {/* Creating a resource */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mb-4" variant="outline">
                    <Plus className="h-4 w-4" />
                    Add Resource
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Resource</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div>
                      <Label className="mb-3">Name</Label>
                      <Input value={resourceName} onChange={(e) => setResourceName(e.target.value)} />
                    </div>

                    <div>
                      <Label className="mb-3">Department</Label>
                      <Select value={departmentId} onValueChange={setDepartmentId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departmentsData.map((department) => (
                            <SelectItem key={department.id} value={department.id}>
                              {department.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="mb-3">Availability</Label>
                      <Switch 
                        checked={availability}
                        onCheckedChange={setAvailability}
                      />
                    </div>

                    <Button onClick={() => createMutation.mutate()}>
                      Create Resource
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Updating the resources */}
              <Dialog
                open={!!editingResource}
                onOpenChange={(open) => !open && setEditingResource(null)}
              >
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Resource</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-3">Name</Label>
                      <Input value={editName} onChange={(e) => setEditName(e.target.value)}/>
                    </div>

                    <div>
                      <Label className="mb-3">Department</Label>
                      <Select value={editDepartmentId} onValueChange={setEditDepartmentId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departmentsData.map((department) => (
                            <SelectItem key={department.id} value={department.id}>
                              {department.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="mb-3">Availability</Label>
                      <Switch
                        checked={editAvailability}
                        onCheckedChange={setEditAvailability}
                      />
                    </div>
                    <Button
                      onClick={() => updateMutation.mutate()}
                      disabled={updateMutation.isPending}
                    >
                      {updateMutation.isPending ? "Updating..." : "Update Resource"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <Table>
                {/* <TableCaption>List of resources</TableCaption> */}
                <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead></TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {resourcesData.map((resources) => (
                    <TableRow key={resources.id}>
                    <TableCell>{resources.name}</TableCell>
                    <TableCell>{resources.department?.name}</TableCell>
                    <TableCell>{resources.isAvailable ? "Available" : "Unavailable"}</TableCell>
                    <TableCell>{new Date(resources.createdAt).toLocaleString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>...</DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingResource(resources)
                              setEditDepartmentId(resources.department?.id)
                              setEditName(resources.name)
                              setEditAvailability(resources.isAvailable)
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              toast.warning("Delete resource?", {
                                description: "This action cannot be undone.",
                                style: {
                                  fontSize: "14px", 
                                  padding: "16px",
                                  borderRadius: "12px",
                                },
                                action: {
                                  label: "Delete",
                                  onClick: () => deleteMutation.mutate(resources.id),
                                },
                                cancel: {
                                  label: "Cancel",
                                },
                              })
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
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

export default AdminResources
