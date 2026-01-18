import { useForm } from "react-hook-form";
import { signupUser } from "../../../Services/AuthServices";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchAllRoles } from "@/Services/Roles";
import { useQuery } from "@tanstack/react-query";

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Fetch roles
  const { data: rolesData, isLoading } = useQuery({
      queryKey: ["roles"],
      queryFn: () => fetchAllRoles(),
  });

  const onSubmit = async (data: any) => {
    try {
      await signupUser(data.email, data.password, data.roleId);
      toast.success("Signup successful!");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || "Signup failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", { required: true })}
        placeholder="Email"
        type="email"
      />
      {errors.email && <span>Email is required</span>}

      <input
        {...register("password", { required: true, minLength: 6 })}
        placeholder="Password"
        type="password"
      />
      {errors.password && <span>Password must be at least 6 characters</span>}

      <select {...register("roleId", { required: true })}>
        <option value="">Select Role</option>
        {rolesData?.map((role: any) => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>
      {errors.roleId && <span>Role is required</span>}

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
