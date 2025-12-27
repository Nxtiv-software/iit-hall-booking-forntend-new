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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { useQuery } from "@tanstack/react-query"
import { fetchAdminProfile, updateAdminProfile } from "@/Services/Admin"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import adminFormSchema from "@/components/admin-profile-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { KeyRound, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import IITLoader from "@/components/IITLoader"


const Settings = () => {
  const token = localStorage.getItem("token");
  console.log(token)

  // Fetch admin profile
  const { data: adminData, isLoading } = useQuery({
      queryKey: ["adminProfile"],
      queryFn: () => fetchAdminProfile(token!),
      enabled: !!token,
  });

  const [isEditing, setIsEditing] = useState(false);
  console.log(adminData);

  //Zod client side validation for the form
  const adminForm = useForm<z.infer<typeof adminFormSchema>>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNum: "",
      gender: "male",
      uniEmail: "",
      buildingName: "",
      departmentName: "",
    },
  })

  useEffect(() => {
    if (adminData) {
      adminForm.reset({
        firstName: adminData.admin?.user?.firstName ?? "",
        lastName: adminData.admin?.user?.lastName ?? "",
        phoneNum: adminData.admin?.user?.phoneNum ?? "",
        gender: adminData.admin?.user?.gender ?? "male",
        uniEmail: adminData.admin?.user?.uniEmail ?? "",
        buildingName: adminData.admin?.building?.buildingName ?? "",
        departmentName: adminData.admin?.department?.departmentName ?? "",
      });
    }
  }, [adminData]);

  async function onSubmit(data: z.infer<typeof adminFormSchema>) {
    console.log("Submit called", data);
    try {
      const token = localStorage.getItem("token")!;
      await updateAdminProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        phoneNum: data.phoneNum,
      }, token);

      toast.success("Profile updated successfully!");
      console.log("??????");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error(error);
    }
  }
  

  if (isLoading) {
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1 flex flex-col gap-4 mt-3 md:ml-4">
                    <Avatar className="w-28 h-28">
                        <AvatarImage src={adminData?.admin?.user?.avatarUrl} alt="User avatar image" />
                        <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                    <div className="mb-10">
                      {adminData?.admin?.user?.uniEmail}
                    </div>
                    <div className="flex flex-col gap-3">
                      <p className="flex items-center gap-2">
                        <KeyRound className="w-4 h-4" />
                        Change Password
                      </p>

                      <p className="flex items-center gap-2 text-red-500">
                        <Trash2 className="w-4 h-4" />
                        Delete Account
                      </p>
                    </div>
                </div>
                <div className="col-span-2 flex flex-col gap-4">
                  <Card className="w-full ">
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your personal details below.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form id="form-rhf-input" onSubmit={adminForm.handleSubmit(onSubmit)}>
                        <FieldGroup>
                          <div className="flex flex-col md:flex-row gap-4">
                            <Controller
                              name="firstName"
                              control={adminForm.control}
                              render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                  <FieldLabel htmlFor="form-rhf-input-firstName">
                                    First Name
                                  </FieldLabel>
                                  <Input
                                    {...field}
                                    id="form-rhf-input-firstName"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Example: John"
                                    autoComplete="firstName"
                                    disabled={!isEditing}
                                    className={!isEditing ? "opacity-70 cursor-not-allowed" : ""}
                                  />
                                  {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                  )}
                                </Field>
                              )}
                            />
                            <Controller
                              name="lastName"
                              control={adminForm.control}
                              render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                  <FieldLabel htmlFor="form-rhf-input-lastName">
                                    Last Name
                                  </FieldLabel>
                                  <Input
                                    {...field}
                                    id="form-rhf-input-lastName"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Example: Anderson"
                                    autoComplete="lastName"
                                    disabled={!isEditing}
                                    className={!isEditing ? "opacity-70 cursor-not-allowed" : ""}
                                  />
                                  {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                  )}
                                </Field>
                              )}
                            />
                          </div>
                          <div className="flex flex-col md:flex-row gap-4">
                            <Controller
                              name="phoneNum"
                              control={adminForm.control}
                              render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                  <FieldLabel htmlFor="form-rhf-input-phoneNum">
                                    Phone Number
                                  </FieldLabel>
                                  <Input
                                    {...field}
                                    id="form-rhf-input-phoneNum"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Example: 077....."
                                    autoComplete="phoneNum"
                                    disabled={!isEditing}
                                    className={!isEditing ? "opacity-70 cursor-not-allowed" : ""}
                                  />
                                  {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                  )}
                                </Field>
                              )}
                            />
                            <Controller
                              name="gender"
                              control={adminForm.control}
                              render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                  <FieldLabel htmlFor="form-rhf-input-gender">
                                    Gender
                                  </FieldLabel>
                                  <Select
                                    value={field.value}
                                    onValueChange={field.onChange} 
                                    disabled={!isEditing}
                                    className={!isEditing ? "opacity-70 cursor-not-allowed" : ""}
                                  >
                                    <SelectTrigger id="form-rhf-input-gender" aria-invalid={fieldState.invalid}>
                                      <SelectValue placeholder="Select Gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="male">Male</SelectItem>
                                      <SelectItem value="female">Female</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                  )}
                                </Field>
                              )}
                            />
                          </div>
                          <Field>
                            <FieldLabel className="username-input">
                              Username
                            </FieldLabel>
                            <Input
                              value={adminData?.admin?.user?.username ?? ""}
                              disabled
                              className="opacity-70 cursor-not-allowed"
                            />
                          </Field>
                        </FieldGroup>
                      </form>
                    </CardContent>
                    <CardFooter>
                      <Field orientation="horizontal" className="gap-2">
                        <Button type="button" variant="outline" disabled={isEditing} onClick={() => setIsEditing(true)}>
                          Edit
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          disabled={!isEditing}
                          onClick={() => {
                            adminForm.reset();
                            setIsEditing(false);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={!isEditing} form="form-rhf-input">
                          Submit
                        </Button>
                      </Field>
                    </CardFooter>
                  </Card>
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle>Workplace Information</CardTitle>
                      <CardDescription>
                        View your workplace details below.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FieldGroup>
                        <Field>
                          <FieldLabel className="uni-email-input">
                            University Email
                          </FieldLabel>
                          <Input
                            value={adminData?.admin?.user?.uniEmail ?? ""}
                            disabled
                            className="opacity-70 cursor-not-allowed"
                          />
                        </Field>
                        <div className="flex flex-col md:flex-row gap-4">
                          <Field>
                            <FieldLabel className="building-input">
                              Building Name
                            </FieldLabel>
                            <Input
                              value={adminData?.admin?.building?.buildingName ?? ""}
                              disabled
                              className="opacity-70 cursor-not-allowed"
                            />
                          </Field>
                          <Field>
                            <FieldLabel className="department-input">
                              Department Name
                            </FieldLabel>
                            <Input
                              value={adminData?.admin?.department?.departmentName ?? ""}
                              disabled
                              className="opacity-70 cursor-not-allowed"
                            />
                          </Field>
                        </div>
                      </FieldGroup>
                    </CardContent>
                  </Card>
                </div>
              </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Settings
