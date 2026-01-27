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
  FieldDescription,
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


export function SignupFormStudent({ ...props }: React.ComponentProps<typeof Card>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
      username: "",
      iitIdNumber: "",
      societyName: "",
      societyPosition: "",
    }
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    // Transform data to match API format
    const payload = {
      email: data.email,
      password: data.password,
      username: data.username,
      iitIdNumber: data.iitIdNumber,
      societyName: data.societyName,
      societyPosition: data.societyPosition,
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

      // Then, create the student using the superadmin ID
      const response = await fetch(`http://localhost:8800/super-admins/${superAdminId}/students`, {
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
              <Field className="md:col-span-2">
                <FieldLabel htmlFor="iitIdNumber">IIT ID Number</FieldLabel>
                <Input 
                  id="iitIdNumber" 
                  type="text" 
                  placeholder="2020123" 
                  {...register("iitIdNumber", { required: "IIT ID number is required" })}
                />
                {errors.iitIdNumber && (
                  <span className="text-red-500 text-sm">{errors.iitIdNumber.message}</span>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="societyName">Society Name</FieldLabel>
                <Input 
                  id="societyName" 
                  type="text" 
                  placeholder="Computer Science Society" 
                  {...register("societyName", { required: "Society name is required" })}
                />
                {errors.societyName && (
                  <span className="text-red-500 text-sm">{errors.societyName.message}</span>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="societyPosition">Society Position</FieldLabel>
                <Input 
                  id="societyPosition" 
                  type="text" 
                  placeholder="President" 
                  {...register("societyPosition", { required: "Society position is required" })}
                />
                {errors.societyPosition && (
                  <span className="text-red-500 text-sm">{errors.societyPosition.message}</span>
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
