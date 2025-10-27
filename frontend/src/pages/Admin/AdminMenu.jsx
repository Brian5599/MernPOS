import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTimes,
  FaBox,
  FaUsers,
  FaClipboardList,
  FaThLarge,
  FaTags,
  FaCubes,
} from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {/* Toggle Button */}
      <button
        className={`fixed top-5 right-7 z-50 p-3 rounded-xl bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-all duration-300 shadow-lg`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes size={20} color="white" />
        ) : (
          <>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
          </>
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-[260px] bg-[#0e0e0e]/95 backdrop-blur-xl shadow-xl transform transition-transform duration-500 ease-in-out z-40
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 mt-10">
          <h2 className="text-gray-300 font-semibold text-lg mb-8 tracking-wide">
            Admin Panel
          </h2>
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/admin/dashboard"
                className="flex items-center gap-3 py-2 px-4 rounded-lg text-gray-300 hover:text-greenyellow hover:bg-[#1f1f1f] transition-all duration-300"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                  backgroundColor: isActive ? "#1f1f1f" : "transparent",
                })}
              >
                <FaThLarge /> Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/categorylist"
                className="flex items-center gap-3 py-2 px-4 rounded-lg text-gray-300 hover:text-greenyellow hover:bg-[#1f1f1f] transition-all duration-300"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                  backgroundColor: isActive ? "#1f1f1f" : "transparent",
                })}
              >
                <FaTags /> Categories
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/productlist"
                className="flex items-center gap-3 py-2 px-4 rounded-lg text-gray-300 hover:text-greenyellow hover:bg-[#1f1f1f] transition-all duration-300"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                  backgroundColor: isActive ? "#1f1f1f" : "transparent",
                })}
              >
                <FaCubes /> Create Product
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/allproductslist"
                className="flex items-center gap-3 py-2 px-4 rounded-lg text-gray-300 hover:text-greenyellow hover:bg-[#1f1f1f] transition-all duration-300"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                  backgroundColor: isActive ? "#1f1f1f" : "transparent",
                })}
              >
                <FaBox /> All Products
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/userlist"
                className="flex items-center gap-3 py-2 px-4 rounded-lg text-gray-300 hover:text-greenyellow hover:bg-[#1f1f1f] transition-all duration-300"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                  backgroundColor: isActive ? "#1f1f1f" : "transparent",
                })}
              >
                <FaUsers /> Manage Users
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/orderlist"
                className="flex items-center gap-3 py-2 px-4 rounded-lg text-gray-300 hover:text-greenyellow hover:bg-[#1f1f1f] transition-all duration-300"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                  backgroundColor: isActive ? "#1f1f1f" : "transparent",
                })}
              >
                <FaClipboardList /> Orders
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default AdminMenu;
