// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { setCredentials } from "../../redux/features/auth/authSlice";
// import { toast } from "react-toastify";
// import Loader from "../../components/Loader";
// import { useRegisterMutation } from "../../redux/api/userApiSlice";

// const Register = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const { userInfo } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [register, error, isLoading] = useRegisterMutation();
//   const { search } = useLocation();
//   const sp = new URLSearchParams(search);
//   const redirect = sp.get("redirect") || "/";

//   useEffect(() => {
//     if (userInfo) {
//       navigate(redirect);
//     }
//   }, [navigate, userInfo, redirect]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       username === "" ||
//       email === "" ||
//       password === "" ||
//       confirmPassword === ""
//     ) {
//       toast.error("Please fill in all fields");
//     } else if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//     } else {
//       try {
//         const res = await register({ username, email, password }).unwrap();
//         // dispatch(setCredentials({...res}))
//         navigate("/");
//         toast.success("User Registered Successfully");
//       } catch (error) {
//         toast.error(error?.data?.message || error.message);
//       }
//     }
//   };

//   return (
//     <div>
//       <section className="pl-[10rem] flex flex-wrap w-[90rem] ml-[10rem]">
//         <div className="mr-[4rem] mt-[2rem]">
//           <h1 className="text-2xl font-semibold mb-4">Register</h1>
//           <form action="container w-[40rem]" onSubmit={handleSubmit}>
//             <div className="my-[2rem]">
//               <label htmlFor="username" className="block text-sm font-medium ">
//                 USERNAME
//               </label>
//               <input
//                 type="text"
//                 id="username"
//                 className="mt-1 p-2 border rounded w-full"
//                 onChange={(e) => setUsername(e.target.value)}
//                 value={username}
//               />
//             </div>

//             <div className="my-[2rem]">
//               <label htmlFor="email" className="block text-sm font-medium ">
//                 EMAIL
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className="mt-1 p-2 border rounded w-full"
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//               />
//             </div>

//             <div className="my-[2rem]">
//               <label htmlFor="password" className="block text-sm font-medium ">
//                 PASSWORD
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className="mt-1 p-2 border rounded w-full"
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//               />
//             </div>
//             <div className="my-[2rem]">
//               <label
//                 htmlFor="confirmPassword"
//                 className="block text-sm font-medium "
//               >
//                 CONFIRM PASSWORD
//               </label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 className="mt-1 p-2 border rounded w-full"
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 value={confirmPassword}
//               />
//             </div>
//             <button
//               disabled={isLoading}
//               type="submit"
//               className="bg-white text-black px-4 py-2 rounded cursor-pointer my-[1rem]"
//             >
//               {isLoading ? "Loading" : "Register"}
//             </button>
//             {isLoading && <Loader />}
//           </form>
//           <div className="mt-4">
//             <p>
//               Already have an account ? {""}
//               <Link to="/login" className="text-blue-500 hover:underline">
//                 Login
//               </Link>
//             </p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Register;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaShoppingBag,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const validateForm = () => {
    if (!username.trim() || !email.trim() || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return false;
    }

    if (username.length < 3) {
      toast.error("Username must be at least 3 characters");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await register({ username, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Account created successfully!");
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const passwordStrength = () => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
      { strength: 0, label: "Very Weak", color: "bg-red-500" },
      { strength: 1, label: "Weak", color: "bg-orange-500" },
      { strength: 2, label: "Fair", color: "bg-yellow-500" },
      { strength: 3, label: "Good", color: "bg-blue-500" },
      { strength: 4, label: "Strong", color: "bg-green-500" },
      { strength: 5, label: "Very Strong", color: "bg-green-600" },
    ];

    return levels[strength];
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 lg:ml-20">
      <div className="w-full max-w-6xl flex gap-8 items-center">
        {/* Left Side - Branding */}
        {/* <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gray-800/50 backdrop-blur-sm p-12 rounded-3xl border border-gray-700">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <FaShoppingBag className="text-white text-2xl" />
                </div>
                <h2 className="text-3xl font-bold text-white">ShopHub</h2>
              </div>

              <h3 className="text-4xl font-bold text-white mb-4">
                Join Our Community
              </h3>
              <p className="text-gray-400 text-lg mb-8">
                Create an account and unlock exclusive shopping benefits.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <FaCheckCircle className="text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      Exclusive Deals
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Access member-only discounts and offers
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <FaCheckCircle className="text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      Fast Checkout
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Save your info for quick purchases
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <FaCheckCircle className="text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      Order Tracking
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Track all your orders in one place
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Right Side - Register Form */}
        <div className="relative ml-[21rem]">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl"></div>
          <div className="relative bg-gray-800/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-gray-700 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Create Account
              </h1>
              <p className="text-gray-400">Sign up to start shopping today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-gray-300 mb-2"
                >
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="eg.johndoe"
                    required
                  />
                </div>
              </div>

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
                    className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
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
                    className="w-full pl-12 pr-12 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
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

                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            passwordStrength().color
                          } transition-all duration-300`}
                          style={{
                            width: `${
                              (passwordStrength().strength / 5) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span
                        className={`text-xs font-medium ${passwordStrength().color.replace(
                          "bg-",
                          "text-"
                        )}`}
                      >
                        {passwordStrength().label}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-300 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="mt-1 text-xs text-red-400">
                    Passwords do not match
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/50 mt-6"
              >
                {isLoading ? (
                  <>
                    <Loader />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <FaArrowRight />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-800 text-gray-400">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-purple-500 hover:text-purple-400 font-semibold transition-colors"
              >
                Sign In Instead
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
