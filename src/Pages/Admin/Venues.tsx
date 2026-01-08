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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchAllVenues } from "@/Services/Venues"
import IITLoader from "@/components/IITLoader"
import { createVenue, deleteVenue, fetchAdminProfile, updateVenue } from "@/Services/Admin"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { fetchAllBuildings } from "@/Services/Buildings"

const Venues = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");
  console.log(token)

  // Fetch admin profile
    const { data: adminData, isLoading: adminLoading } = useQuery({
        queryKey: ["adminProfile"],
        queryFn: () => fetchAdminProfile(token!),
        enabled: !!token,
    });

  // Fetch all venues
  const { data: venueData = [], isLoading: venueLoading } = useQuery({
      queryKey: ["venues"],
      queryFn: () => fetchAllVenues(token!),
      enabled: !!token,
  });

  // Fetch all buildings
  const { data: buildingData = [], isLoading: buildingLoading } = useQuery({
      queryKey: ["buildings"],
      queryFn: () => fetchAllBuildings(token!),
      enabled: !!token,
  });

  const adminId = adminData?.admin?.id;
  // const buildingId = adminData?.admin?.building?.id;

  const [ venueName, setVenueName ] = useState<string>("");
  const [ buildingId, setBuildingId ] = useState<string>("");
  const [ availability, setAvailability ] = useState<boolean>(true);
  const [ capacityAcademic, setCapacityAcademic ] = useState<string>("");
  const [ capacityExamination, setCapacityExamination ] = useState<string>("");
  const [ floorNumber, setFloorNumber ] = useState<string>("");

  const [ editingVenue, setEditingVenue ] = useState<any>(null)
  const [ editName, setEditName ] = useState("")
  const [ editBuildingId, setEditBuildingId ] = useState("")
  const [ editAvailability, setEditAvailability ] = useState(true)
  const [ editCapacityAcademic, setEditCapacityAcademic ] = useState("")
  const [ editCapacityExamination, setEditCapacityExamination ] = useState("")
  const [ editFloorNumber, setEditFloorNumber ] = useState("")
  
  
  const createMutation = useMutation({
    mutationFn: () =>
      createVenue(
        adminId!,
        buildingId!,
        {
          name: venueName,
          isAvailable: availability,
          capacityAcademic: capacityAcademic,
          capacityExamination: capacityExamination,
          floorNumber: floorNumber,
        },
        token!
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venues"] });
      setVenueName("");
      setAvailability(true);
      setCapacityAcademic("");
      setCapacityExamination("");
      setFloorNumber("");

      toast.success("Venue created successfully");
    },

    onError: (err: any) => {
      console.log("Create Venue Failed", err.response?.data || err);
      toast.error("Venue creation failed");
    },
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      updateVenue(
        adminId!,
        editBuildingId!,
        editingVenue.id,
        { 
          name: editName, 
          isAvailable: editAvailability, 
          capacityAcademic: editCapacityAcademic,
          capacityExamination: editCapacityExamination,
          floorNumber: editFloorNumber, 
        },
        token!
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venues"] })
      setEditingVenue(null)
      toast.success("Venue updated successfully");
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (venueId: string) =>
      deleteVenue(adminId!, buildingId!, venueId, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venues"] })
      toast.success("Venue deleted successfully");
    },
  })

  if ( adminLoading || venueLoading || buildingLoading ) {
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
                <BreadcrumbPage>Venues</BreadcrumbPage>
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
              <h2 className="text-lg font-semibold mb-4">Venues</h2>
              {/* Creating a venue */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mb-4" variant="outline">
                    <Plus className="h-4 w-4" />
                    Add Venue
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Venue</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div>
                      <Label className="mb-3">Name</Label>
                      <Input value={venueName} onChange={(e) => setVenueName(e.target.value)} />
                    </div>

                    <div>
                      <Label className="mb-3">Availability</Label>
                      <Switch 
                        checked={availability}
                        onCheckedChange={setAvailability}
                      />
                    </div>

                    <div>
                      <Label className="mb-3">Building</Label>
                      <Select value={buildingId} onValueChange={setBuildingId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a building" />
                        </SelectTrigger>
                        <SelectContent>
                          {buildingData.map((building) => (
                            <SelectItem key={building.id} value={building.id}>
                              {building.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="mb-3">Academic Capacity</Label>
                      <Input value={capacityAcademic} onChange={(e) => setCapacityAcademic(e.target.value)} />
                    </div>

                    <div>
                      <Label className="mb-3">Examination Capacity</Label>
                      <Input value={capacityExamination} onChange={(e) => setCapacityExamination(e.target.value)} />
                    </div>

                    <div>
                      <Label className="mb-3">Floor Number</Label>
                      <Input value={floorNumber} onChange={(e) => setFloorNumber(e.target.value)} />
                    </div>

                    <Button onClick={() => createMutation.mutate()}>
                      Create Venue
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Updating the venues */}
              <Dialog
                open={!!editingVenue}
                onOpenChange={(open) => !open && setEditingVenue(null)}
              >
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Venue</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-3">Name</Label>
                      <Input value={editName} onChange={(e) => setEditName(e.target.value)}/>
                    </div>
                    <div>
                      <Label className="mb-3">Availability</Label>
                      <Switch
                        checked={editAvailability}
                        onCheckedChange={setEditAvailability}
                      />
                    </div>
                    <div>
                      <Label className="mb-3">Building</Label>
                      <Select value={editBuildingId} onValueChange={setEditBuildingId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a building" />
                        </SelectTrigger>
                        <SelectContent>
                          {buildingData.map((building) => (
                            <SelectItem key={building.id} value={building.id}>
                              {building.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="mb-3">Academic Capacity</Label>
                      <Input value={editCapacityAcademic} onChange={(e) => setEditCapacityAcademic(e.target.value)} />
                    </div>
                    <div>
                      <Label className="mb-3">Examination Capacity</Label>
                      <Input value={editCapacityExamination} onChange={(e) => setEditCapacityExamination(e.target.value)} />
                    </div>
                    <div>
                      <Label className="mb-3">Floor Number</Label>
                      <Input value={editFloorNumber} onChange={(e) => setEditFloorNumber(e.target.value)} />
                    </div>
                    <Button
                      onClick={() => updateMutation.mutate()}
                      disabled={updateMutation.isPending}
                    >
                      {updateMutation.isPending ? "Updating..." : "Update Venue"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <Table>
                {/* <TableCaption>List of venues</TableCaption> */}
                <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Building</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead>Floor Number</TableHead>
                    <TableHead>Academic Capacity</TableHead>
                    <TableHead>Examination Capacity</TableHead>
                    <TableHead>Created At</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {venueData.map((venues) => (
                    <TableRow key={venues.id}>
                    <TableCell>{venues.name}</TableCell>
                    <TableCell>{venues.building?.name}</TableCell>
                    <TableCell>{venues.isAvailable ? "Available" : "Unavailable"}</TableCell>
                    <TableCell>{venues.floorNumber}</TableCell>
                    <TableCell>{venues.capacityAcademic}</TableCell>
                    <TableCell>{venues.capacityExamination}</TableCell>
                    <TableCell>{new Date(venues.createdAt).toLocaleString()}</TableCell>
                    <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>...</DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setEditingVenue(venues)
                            setEditName(venues.name)
                            setEditBuildingId(venues.building?.id)
                            setEditAvailability(venues.isAvailable)
                            setEditCapacityAcademic(venues.capacityAcademic)
                            setEditCapacityExamination(venues.capacityExamination)
                            setEditFloorNumber(venues.floorNumber)
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            toast.warning("Delete venue?", {
                              description: "This action cannot be undone.",
                              style: {
                                fontSize: "14px", 
                                padding: "16px",
                                borderRadius: "12px",
                              },
                              action: {
                                label: "Delete",
                                onClick: () => deleteMutation.mutate(venues.id),
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

export default Venues
