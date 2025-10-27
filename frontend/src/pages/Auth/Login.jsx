// // import React, { useState, useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link, useLocation, useNavigate } from "react-router-dom";
// // import { useLoginMutation } from "../../redux/api/userApiSlice";
// // import { setCredentials } from "../../redux/features/auth/authSlice";
// // import { toast } from "react-toastify";
// // import Loader from "../../components/Loader";

// // const Login = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const [login, { isLoading }] = useLoginMutation();
// //   const { userInfo } = useSelector((state) => state.auth);
// //   const { search } = useLocation();
// //   const sp = new URLSearchParams(search);
// //   const redirect = sp.get("redirect") || "/";

// //   useEffect(() => {
// //     if (userInfo) {
// //       navigate(redirect);
// //     }
// //   }, [navigate, redirect, userInfo]);

// //   const submitHandler = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await login({ email, password }).unwrap();
// //       dispatch(setCredentials({ ...res }));
// //       toast.success("Login Successfully");
// //     } catch (error) {
// //       toast.error(error?.data?.message || error.message);
// //     }
// //   };
// //   return (
// //     <div>
// //       <section className="pl-[10rem] flex flex-wrap w-[90rem] ml-[10rem] ">
// //         <div className="mr-[4rem] mt-[2rem]">
// //           <h1 className="text-2xl font-semibold mb-4">Login In</h1>
// //           <form action="container w-[40rem]" onSubmit={submitHandler}>
// //             <div className="my-[2rem]">
// //               <label htmlFor="email" className="block text-sm font-medium ">
// //                 Email
// //               </label>
// //               <input
// //                 type="email"
// //                 id="email"
// //                 className="mt-1 p-2 border rounded w-full"
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 value={email}
// //               />
// //             </div>

// //             <div className="my-[2rem]">
// //               <label htmlFor="password" className="block text-sm font-medium ">
// //                 Password
// //               </label>
// //               <input
// //                 type="password"
// //                 id="password"
// //                 className="mt-1 p-2 border rounded w-full"
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 value={password}
// //               />
// //             </div>
// //             <button
// //               disabled={isLoading}
// //               type="submit"
// //               className="bg-black text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
// //             >
// //               {isLoading ? "Logging In" : "Log In"}
// //             </button>
// //             {isLoading && <Loader />}
// //           </form>
// //           <div className="mt-4">
// //             <p>
// //               New Customer ? {""}
// //               <Link to="/register" className="text-blue-500 hover:underline">
// //                 Register
// //               </Link>
// //             </p>
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default Login;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useLoginMutation } from "../../redux/api/userApiSlice";
// import { setCredentials } from "../../redux/features/auth/authSlice";
// import { toast } from "react-toastify";
// import Loader from "../../components/Loader";
// import {
//   FaEnvelope,
//   FaLock,
//   FaShoppingBag,
//   FaArrowRight,
// } from "react-icons/fa";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [login, { isLoading }] = useLoginMutation();
//   const { userInfo } = useSelector((state) => state.auth);
//   const { search } = useLocation();
//   const sp = new URLSearchParams(search);
//   const redirect = sp.get("redirect") || "/";

//   useEffect(() => {
//     if (userInfo) {
//       navigate(redirect);
//     }
//   }, [navigate, redirect, userInfo]);

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     try {
//       const res = await login({ email, password }).unwrap();
//       dispatch(setCredentials({ ...res }));
//       toast.success("Welcome back!");
//       navigate(redirect);
//     } catch (error) {
//       toast.error(error?.data?.message || error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center p-4 lg:ml-20">
//       <div className="w-full max-w-6xl flex gap-8 items-center">
//         {/* Left Side - Branding */}
//         {/* <div className="hidden lg:block">
//           <div className="relative">
//             <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
//             <div className="relative bg-gray-800/50 backdrop-blur-sm p-12 rounded-3xl border border-gray-700">
//               <div className="flex items-center gap-3 mb-8">
//                 <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
//                   <FaShoppingBag className="text-white text-2xl" />
//                 </div>
//                 <h2 className="text-3xl font-bold text-white">ShopHub</h2>
//               </div>

//               <h3 className="text-4xl font-bold text-white mb-4">
//                 Welcome Back!
//               </h3>
//               <p className="text-gray-400 text-lg mb-8">
//                 Sign in to continue your shopping journey and access exclusive
//                 deals.
//               </p>

//               <div className="space-y-4">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
//                     <span className="text-green-400 text-xl">✓</span>
//                   </div>
//                   <p className="text-gray-300">Track your orders</p>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
//                     <span className="text-green-400 text-xl">✓</span>
//                   </div>
//                   <p className="text-gray-300">Save favorite products</p>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
//                     <span className="text-green-400 text-xl">✓</span>
//                   </div>
//                   <p className="text-gray-300">Fast checkout</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div> */}

//         {/* Right Side - Login Form */}
//         <div className="relative ml-[20rem]">
//           <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-3xl blur-2xl"></div>
//           <div className="relative bg-gray-800/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-gray-700 shadow-2xl">
//             <div className="text-center mb-8">
//               <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
//                 Sign In
//               </h1>
//               <p className="text-gray-400">
//                 Enter your credentials to access your account
//               </p>
//             </div>

//             <form onSubmit={submitHandler} className="space-y-6">
//               {/* Email Field */}
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-semibold text-gray-300 mb-2"
//                 >
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <FaEnvelope className="text-gray-400" />
//                   </div>
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all"
//                     placeholder="you@example.com"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Password Field */}
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-semibold text-gray-300 mb-2"
//                 >
//                   Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <FaLock className="text-gray-400" />
//                   </div>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full pl-12 pr-12 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all"
//                     placeholder="••••••••"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
//                   >
//                     {showPassword ? "Hide" : "Show"}
//                   </button>
//                 </div>
//               </div>

//               {/* Forgot Password Link */}
//               <div className="flex justify-end">
//                 <Link
//                   to="/forgot-password"
//                   className="text-sm text-pink-500 hover:text-pink-400 transition-colors"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-black text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-red-600/50"
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader />
//                     <span>Signing In...</span>
//                   </>
//                 ) : (
//                   <>
//                     <span>Sign In</span>
//                     <FaArrowRight />
//                   </>
//                 )}
//               </button>
//             </form>

//             {/* Divider */}
//             <div className="relative my-8">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-700"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-4 bg-gray-800 text-gray-400">
//                   Are You New Here?
//                 </span>
//               </div>
//             </div>

//             {/* Register Link */}
//             <div className="text-center">
//               <p className="text-gray-400">
//                 Don't have an account?{" "}
//                 <Link
//                   to={redirect ? `/register?redirect=${redirect}` : "/register"}
//                   className="text-pink-500 hover:text-pink-400 font-semibold transition-colors"
//                 >
//                   Create Account
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import {
  FaEnvelope,
  FaLock,
  FaShoppingBag,
  FaArrowRight,
} from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Welcome back!");
      navigate(redirect);
    } catch (error) {
      // Handle invalid email/password
      const errorMessage =
        error?.data?.message ||
        (error?.status === 401
          ? "Invalid email or password. Please try again."
          : "Login failed. Please check your credentials.");

      // Reset password field for security
      setPassword("");

      // Show toast
      toast.error(errorMessage);
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 lg:ml-20">
      <div className="w-full max-w-6xl flex gap-8 items-center">
        <div className="relative ml-[20rem]">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-3xl blur-2xl"></div>
          <div className="relative bg-gray-800/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-gray-700 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Sign In
              </h1>
              <p className="text-gray-400">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={submitHandler} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-300 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-pink-500 hover:text-pink-400 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-red-600/50"
              >
                {isLoading ? (
                  <>
                    <Loader />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <FaArrowRight />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-800 text-gray-400">
                  Are You New Here?
                </span>
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                  className="text-pink-500 hover:text-pink-400 font-semibold transition-colors"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
