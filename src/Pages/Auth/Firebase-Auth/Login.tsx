import { useForm } from "react-hook-form";
import { useAuth } from "../../../AuthProvider/FirebaseProvider/AuthProvider";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/IITLoader";

const Login = () => {
  const { loginUser, isAuthenticated, loading, user } = useAuth();
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

  if (isAuthenticated() && user) {
    if (user.superAdmin) {
      return <Navigate to="/super-admin-create-admin" replace />;
    }
    if (user.admin) {
      const level = user.admin.adminLevel;
      if (level === 1) return <Navigate to="/admin1-dashboard" replace />;
      if (level === 2) return <Navigate to="/admin2-dashboard" replace />;
      if (level === 3) return <Navigate to="/admin3-dashboard" replace />;
      if (level === 4) return <Navigate to="/admin4-dashboard" replace />;
      if (level === 5) return <Navigate to="/admin5-dashboard" replace />;
      if (level === 6) return <Navigate to="/admin6-dashboard" replace />;
    }
    return <Navigate to="/student-dashboard" replace />;
  }

  if (loading) {
    return (
      <div className="flex flex-col flex-1 absolute left-0 top-0 right-0 bottom-0 w-full h-full bg-white/50 dark:bg-black/50 z-50">
        <div className="flex flex-col justify-center flex-1 w-full mx-auto">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 relative">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-00 text-3xl dark:text-gray-900 sm:text-title-md">
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
                  <Label className="text-gray-900 dark:text-gray-900">
                    Email <span className="text-red-500">*</span>{" "}
                  </Label>
                  <Input
                    placeholder="info@gmail.com"
                    className="dark:border-gray-400 dark:text-black"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <span className="dark:text-red-500 mt-1">
                      Email is required
                    </span>
                  )}
                </div>

                <div>
                  <Label className="text-gray-900 dark:text-gray-900">
                    Password <span className="text-red-500">*</span>{" "}
                  </Label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="dark:border-gray-400 dark:text-black"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <span className="dark:text-red-500 mt-1 block">
                      Password is required
                    </span>
                  )}
                  <div className="mt-2 text-right">
                    <Link
                      to="/reset-password"
                      className="text-sm text-gray-500 hover:underline dark:text-gray-400"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <Button
                  className="w-full cursor-pointer mt-2"
                  variant="secondary"
                  type="submit"
                >
                  Login
                </Button>

                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  By signing in, you agree to our Terms of Service and Privacy
                  Policy
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Powered by{" "}
          <span className="font-semibold text-red-500">Nxtiv Software</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
