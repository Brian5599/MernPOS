import React, { useState } from "react";
import {
  FaHome,
  FaShoppingBag,
  FaShoppingCart,
  FaHeart,
  FaRegUser,
  FaChevronDown,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import { RiLoginBoxLine } from "react-icons/ri";
import { HiOutlineUserAdd } from "react-icons/hi";
import { MdDashboard, MdCategory } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import FavouriteCount from "../Products/FavouriteCount";
import CartCount from "../Products/CartCount";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const Navigation = () => {
  const userInfo = useSelector((state) => state.auth?.userInfo);
  const [dropDown, setDropDown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const toggleDropdown = () => setDropDown(!dropDown);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(clearCartItems());
      toast.success("Logged out successfully");
      navigate("/");
      setDropDown(false);
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  const navLinks = [
    { to: "/", icon: FaHome, label: "HOME" },
    { to: "/shop", icon: FaShoppingBag, label: "SHOP" },
    { to: "/cart", icon: FaShoppingCart, label: "CART", badge: <CartCount /> },
    {
      to: "/favorite",
      icon: FaHeart,
      label: "FAVORITE",
      badge: <FavouriteCount />,
    },
  ];

  const adminLinks = [
    { to: "/admin/dashboard", icon: MdDashboard, label: "Dashboard" },
    { to: "/admin/productlist", icon: BsBoxSeam, label: "Products" },
    { to: "/admin/categorylist", icon: MdCategory, label: "Categories" },
    { to: "/admin/orderlist", icon: FaShoppingCart, label: "Orders" },
    { to: "/admin/userlist", icon: FaRegUser, label: "Users" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-[10000] p-3 bg-black/90 backdrop-blur-sm rounded-lg lg:hidden text-white hover:bg-pink-600 transition-colors"
      >
        {showSidebar ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div
        style={{ zIndex: 9999 }}
        className={`
          ${
            showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
          fixed top-0 left-0 h-screen
          bg-gradient-to-b from-black via-gray-900 to-black
          border-r border-gray-800
          transition-all duration-300 ease-in-out
          lg:w-20 lg:hover:w-64
          w-64
          group
        `}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3 mb-8 pt-4 lg:pt-0">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <FaShoppingBag className="text-white" size={20} />
            </div>
            <span className="text-white font-bold text-xl lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
              LOGO
            </span>
          </div>

          {/* Main Navigation Links */}
          <nav className="flex-1 space-y-2">
            {/* {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setShowSidebar(false)}
                className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 group/item relative"
              >
                <link.icon size={22} className="flex-shrink-0" />
                <span className="lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 font-medium">
                  {link.label}
                </span>
                {link.badge && (
                  <div className="lg:absolute lg:top-2 lg:left-12 lg:opacity-0 lg:group-hover:opacity-100">
                    {link.badge}
                  </div>
                )}
              </Link>
            ))} */}
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setShowSidebar(false)}
                className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 group/item relative"
              >
                <div className="relative">
                  <link.icon size={22} className="flex-shrink-0" />
                  {link.badge && link.badge}
                </div>
                <span className="lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 font-medium">
                  {link.label}
                </span>
              </Link>
            ))}

            {/* Auth Links for Non-logged in Users */}
            {!userInfo && (
              <div className="pt-4 mt-4 border-t border-gray-800">
                <Link
                  to="/login"
                  onClick={() => setShowSidebar(false)}
                  className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <RiLoginBoxLine size={22} className="flex-shrink-0" />
                  <span className="lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 font-medium">
                    LOGIN
                  </span>
                </Link>
                <Link
                  to="/register"
                  onClick={() => setShowSidebar(false)}
                  className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <HiOutlineUserAdd size={22} className="flex-shrink-0" />
                  <span className="lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 font-medium">
                    REGISTER
                  </span>
                </Link>
              </div>
            )}
          </nav>

          {/* User Menu */}
          {userInfo && (
            <div className="mt-auto pt-4 border-t border-gray-800">
              <button
                onClick={toggleDropdown}
                className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaRegUser size={18} />
                </div>
                <div className="flex-1 text-left lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium truncate">
                    {userInfo.username}
                  </p>
                  <p className="text-xs text-gray-400">
                    {userInfo.isAdmin ? "Admin" : "User"}
                  </p>
                </div>
                <FaChevronDown
                  className={`transition-transform duration-200 lg:opacity-0 lg:group-hover:opacity-100 ${
                    dropDown ? "rotate-180" : ""
                  }`}
                  size={16}
                />
              </button>

              {/* Dropdown Menu */}
              {dropDown && (
                <div className="mt-2 py-2 bg-gray-900 rounded-lg border border-gray-800 shadow-xl lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                  {userInfo.isAdmin && (
                    <>
                      <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase">
                        Admin Panel
                      </div>
                      {adminLinks.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          onClick={() => {
                            setDropDown(false);
                            setShowSidebar(false);
                          }}
                          className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <link.icon size={18} />
                          <span>{link.label}</span>
                        </Link>
                      ))}
                      <div className="my-2 border-t border-gray-800"></div>
                    </>
                  )}

                  <Link
                    to="/profile"
                    onClick={() => {
                      setDropDown(false);
                      setShowSidebar(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <FaRegUser size={18} />
                    <span>Profile</span>
                  </Link>

                  <button
                    onClick={logoutHandler}
                    className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                  >
                    <RiLoginBoxLine size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] lg:hidden"
        />
      )}
    </>
  );
};

export default Navigation;
