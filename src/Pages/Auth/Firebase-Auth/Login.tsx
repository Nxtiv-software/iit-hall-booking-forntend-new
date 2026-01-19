import { useForm } from "react-hook-form";
import { useAuth } from "../../../AuthProvider/FirebaseProvider/AuthProvider";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  const { loginUser, isAuthenticated, isAdmin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await loginUser(data.email, data.password);
      toast.success("Login successful!");
    } catch (error: any) {
      toast.error(error.message || "Login failed.");
    }
  };

  if (isAuthenticated) {
    return (
      <Navigate to={isAdmin() ? "/admin-dashboard" : "/dashboard"} replace />
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
    <div>
      <div className="mb-5 sm:mb-8">
        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
          Sign In
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter your email and password to sign in!
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div>
              <Label>
                Email <span className="text-error-500">*</span>{" "}
              </Label>
              <Input
                placeholder="info@gmail.com"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {/* <input
              {...register("email", { required: true })}
              placeholder="Email"
              type="email"
            /> */}
            {errors.email && <span>Email is required</span>}

            <div>
              <Label>
                Password <span className="text-error-500">*</span>{" "}
              </Label>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
              />
            </div>
            {/* <input
          {...register("password", { required: true })}
          placeholder="Password"
          type="password"
        /> */}
            {errors.password && <span>Password is required</span>}

            <Button type="submit">Login</Button>
          </div>
        </form>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
