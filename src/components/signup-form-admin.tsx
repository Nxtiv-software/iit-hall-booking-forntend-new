import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,

  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm, Controller } from "react-hook-form"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { auth } from "@/Firebase/config"


export function SignupFormAdmin({ ...props }: React.ComponentProps<typeof Card>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buildings, setBuildings] = useState<{ id: string; name: string }[]>([]);
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
  const [isLoadingBuildings, setIsLoadingBuildings] = useState(true);
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(true);

  useEffect(() => {
      const fetchBuildings = async () => {
        try {
          const user = auth.currentUser;
          if (!user) {
            toast.error("Please login to continue");
            return;
          }
    
          const token = await user.getIdToken(); 
          
          const res = await fetch("http://localhost:8800/buildings/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const data = await res.json();
          setBuildings(Array.isArray(data) ? data : []);
          console.log("buildings" , data)
        } catch (error) {
          console.error("Error fetching buildings:", error);
          toast.error("Failed to load buildings");
        } finally {
          setIsLoadingBuildings(false);
        }
      };

      const fetchDepartments = async () => {
        try {
          const user = auth.currentUser;
          if (!user) {
            toast.error("Please login to continue");
            return;
          }
    
          const token = await user.getIdToken(); 
          
          const res = await fetch("http://localhost:8800/departments/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const data = await res.json();
          setDepartments(Array.isArray(data) ? data : []);
          console.log("departments" , data)
        } catch (error) {
          console.error("Error fetching departments:", error);
          toast.error("Failed to load departments");
        } finally {
          setIsLoadingDepartments(false);
        }
      };

  
      fetchBuildings();
      fetchDepartments();
    }, []);
  
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
      username: "",
      firstName: "",
      lastName: "",
      adminLevel: "",
      gender: "",
      phoneNum: "",
      buildingId: "",
      departmentId: "",
    }
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    // Transform data to match API format
    const payload = {
      email: data.email,
      password: data.password,
      username: data.username,
      adminLevel: parseInt(data.adminLevel), // Convert string to number
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      phoneNum: data.phoneNum,
      buildingId: data.buildingId,
      departmentId: data.departmentId,
    };
    
    console.log("Form Data:", payload);
    
    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error("Please login to continue");
        setIsSubmitting(false);
        return;
      }

      const token = await user.getIdToken(); 

      // First, fetch the superadmin ID
      const meResponse = await fetch("http://localhost:8800/super-admins/me", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!meResponse.ok) {
        throw new Error("Failed to fetch superadmin details");
      }

      const superAdminData = await meResponse.json();
      const superAdminId = superAdminData.id;

      // Then, create the admin using the superadmin ID
      const response = await fetch(`http://localhost:8800/super-admins/${superAdminId}/admins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || `Failed to create account (${response.status})`);
      }
      
      toast.success("Account created successfully!");
      console.log("Response:", responseData);
     
    } catch (error: any) {
      console.error("Error creating account:", error);
      toast.error(error.message || "Failed to create account");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card {...props} className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field className="md:col-span-2">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="newadmin@iit.ac.lk" 
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email.message}</span>
                )}
              </Field>
              <Field className="md:col-span-2">
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input 
                  id="username" 
                  type="text" 
                  placeholder="newadmin" 
                  {...register("username", { required: "Username is required" })}
                />
                {errors.username && (
                  <span className="text-red-500 text-sm">{errors.username.message}</span>
                )}
              </Field>
              <Field className="md:col-span-2">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters"
                    }
                  })}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">{errors.password.message}</span>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                <Input 
                  id="firstName" 
                  type="text" 
                  placeholder="John" 
                  {...register("firstName", { required: "First name is required" })}
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm">{errors.firstName.message}</span>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                <Input 
                  id="lastName" 
                  type="text" 
                  placeholder="Doe" 
                  {...register("lastName", { required: "Last name is required" })}
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm">{errors.lastName.message}</span>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="adminLevel">Admin Level</FieldLabel>
                <Controller
                  name="adminLevel"
                  control={control}
                  rules={{ required: "Admin level is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="adminLevel">
                        <SelectValue placeholder="Select admin level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Level 1</SelectItem>
                        <SelectItem value="2">Level 2</SelectItem>
                        <SelectItem value="3">Level 3</SelectItem>
                        <SelectItem value="4">Level 4</SelectItem>
                        <SelectItem value="5">Level 5</SelectItem>
                        <SelectItem value="6">Level 6</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.adminLevel && (
                  <span className="text-red-500 text-sm">{errors.adminLevel.message}</span>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="gender">Gender</FieldLabel>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.gender && (
                  <span className="text-red-500 text-sm">{errors.gender.message}</span>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="phoneNum">Phone Number</FieldLabel>
                <Input 
                  id="phoneNum" 
                  type="text" 
                  placeholder="+1234567890" 
                  {...register("phoneNum", { required: "Phone number is required" })}
                />
                {errors.phoneNum && (
                  <span className="text-red-500 text-sm">{errors.phoneNum.message}</span>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="buildingId">Building</FieldLabel>
                <Controller
                  name="buildingId"
                  control={control}
                  rules={{ required: "Building is required" }}
                  render={({ field }) => (
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                      disabled={isLoadingBuildings}
                    >
                      <SelectTrigger id="buildingId">
                        <SelectValue placeholder={isLoadingBuildings ? "Loading buildings..." : "Select building"} />
                      </SelectTrigger>
                      <SelectContent>
                        {buildings.map((building) => (
                          <SelectItem key={building.id} value={building.id}>
                            {building.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.buildingId && (
                  <span className="text-red-500 text-sm">{errors.buildingId.message}</span>
                )}
              </Field>
              <Field className="md:col-span-2">
                <FieldLabel htmlFor="departmentId">Department</FieldLabel>
                <Controller
                  name="departmentId"
                  control={control}
                  rules={{ required: "Department is required" }}
                  render={({ field }) => (
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                      disabled={isLoadingDepartments}
                    >
                      <SelectTrigger id="departmentId">
                        <SelectValue placeholder={isLoadingDepartments ? "Loading departments..." : "Select department"} />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((department) => (
                          <SelectItem key={department.id} value={department.id}>
                            {department.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.departmentId && (
                  <span className="text-red-500 text-sm">{errors.departmentId.message}</span>
                )}
              </Field>
            </div>
            
            <FieldGroup className="mt-6">
              <Field>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
