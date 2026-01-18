// import { useForm } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";
// import { login } from "../../Services/AuthServices";
// import toast from "react-hot-toast";
// import { useAuth } from "../../AuthProvider/AuthProvider";
// import { Navigate } from "react-router-dom";

// const Login = () => {
//   const {loginUser,isAuthenticated,isAdmin} = useAuth()

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const { mutate } = useMutation({
//     mutationFn: login,
//     onSuccess: (data) => {
//       toast.success(`Welcome back, ${data.user.username}!`, {
//         duration: 4000,
//       });
//       console.log("Login Success", data.user.username);
//       loginUser(data)
//     },
//    onError: (error) => {
//       console.error("Login failed:", error);
//       toast.error(
//         error?.response?.data?.message ||
//           error?.message ||
//           "Login failed. Please check your credentials.",
//         {
//           duration: 4000,
//         }
//       );
//     },
//   });

//   function onSubmit(data) {
//     console.log(`Submitting... ${JSON.stringify(data)}`);
//     mutate(data);
//   }

//   if(isAuthenticated) {
//     if(isAdmin()) {
//       return <Navigate to="/admin-dashboard" replace />
//     }
//     return <Navigate to="/dashboard" replace/>
//   }

//   return (
//     <div className="min-h-screen w-full bg-red-500 flex items-center justify-center p-8 font-sans">
//       <div className="bg-white rounded-xl p-12 shadow-2xl w-full max-w-lg backdrop-blur-sm border border-white/20">
//         <div className="mb-8">
//           <h2 className="text-1xl font-bold text-gray-800 dark:text-white/90">
//             Login
//           </h2>
//           <h1 className="mt-1 text-lg text-gray-600 dark:text-gray-300">
//             IIT Hall Booking System
//           </h1>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
//           <div className="mb-6">
//             <label
//               htmlFor="text"
//               className="block font-semibold text-gray-700 mb-2 text-sm"
//             >
//               UserName
//             </label>
//             <input
//               id="text"
//               type="text"
//               placeholder="Enter your email address"
//               className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-base transition-all duration-200 focus:outline-none focus:border-indigo-700 focus:ring-4 focus:ring-indigo-100 placeholder-gray-400"
//               {...register("UserName", { required: true })}
//             />
//             {errors.Email && (
//               <span className="text-red-600 text-sm font-medium mt-2 block">
//                 Please enter a valid email
//               </span>
//             )}
//           </div>

//           <div className="mb-6">
//             <label
//               htmlFor="password"
//               className="block font-semibold text-gray-700 mb-2 text-sm"
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               placeholder="Enter your password"
//               className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-base transition-all duration-200 focus:outline-none focus:border-indigo-700 focus:ring-4 focus:ring-indigo-100 placeholder-gray-400"
//               {...register("Password", { required: true })}
//             />
//             {errors.Password && (
//               <span className="text-red-600 text-sm font-medium mt-2 block">
//                 Password is required
//               </span>
//             )}
//           </div>

//           <button
//             type="submit"
//             // disabled={isPending}
//             className="w-full bg-red-500 text-white border-none py-4 px-8 rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 shadow-lg shadow-black-700/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black-700/40 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//           >
//             Sign in
//           </button>
//         </form>

//         <div className="text-center">
//           <p className="text-slate-600 text-sm leading-relaxed m-0 font-normal">
//             Please enter your credentials to access the system. Both
//             administrators and exco members can log in here.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
