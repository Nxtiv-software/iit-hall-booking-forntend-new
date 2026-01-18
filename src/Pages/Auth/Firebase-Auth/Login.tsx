import { useForm } from "react-hook-form";
import { useAuth } from "../../../AuthProvider/FirebaseProvider/AuthProvider";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const { loginUser, isAuthenticated, isAdmin } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await loginUser(data.email, data.password);
      toast.success("Login successful!");
    } catch (error: any) {
      toast.error(error.message || "Login failed.");
    }
  };

  if (isAuthenticated) {
    return <Navigate to={isAdmin() ? "/admin-dashboard" : "/dashboard"} replace />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", { required: true })}
        placeholder="Email"
        type="email"
      />
      {errors.email && <span>Email is required</span>}

      <input
        {...register("password", { required: true })}
        placeholder="Password"
        type="password"
      />
      {errors.password && <span>Password is required</span>}

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
