import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { FaEdit, FaTrash, FaTimes, FaMinus, FaBox } from "react-icons/fa";
import Message from "../../pages/Admin/Message";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../redux/api/userApiSlice";

const Userlist = () => {
  const { data: users = [], refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [searchUsers, setSearchUsers] = useState("");
  const [modal, setModal] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [editUserName, setEditUsername] = useState("");
  const [editUserEmail, setEditUserEmail] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        toast.success("User deleted successfully");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  const closeModal = () => {
    setModal(false);
    setEditUserId(null);
    setEditUsername("");
    setEditUserEmail("");
  };

  const openEditModal = (user) => {
    setEditUserId(user._id);
    setEditUsername(user.username);
    setEditUserEmail(user.email);
    setModal(true);
  };

  const updateHandler = async () => {
    try {
      setIsUpdating(true);
      await updateUser({
        userId: editUserId,
        username: editUserName.trim(),
        email: editUserEmail.trim(),
      }).unwrap();
      toast.success("User updated successfully");
      closeModal();
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchUsers.toLowerCase())
  );

  if (isLoading) return <Loader />;
  if (error)
    return (
      <Message variant="danger">{error?.data?.message || error.error}</Message>
    );

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6 text-center text-white">
          User Management
        </h1>

        {/* 🔍 Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search user by name..."
            className="px-4 py-2 w-full max-w-md border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:border-white"
            value={searchUsers}
            onChange={(e) => setSearchUsers(e.target.value)}
          />
        </div>

        {filteredUsers.length === 0 ? (
          <div className="text-center py-16 bg-gray-800/50 rounded-xl">
            <FaBox className="mx-auto text-gray-600 text-6xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No users found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto w-[90%] ml-[7rem]">
            <table className="min-w-full bg-[#1a1a1a] rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-[#222] text-gray-300 text-sm uppercase">
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Admin</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-4 py-2 text-gray-400">
                      {user._id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-4 py-2 text-white">{user.username}</td>
                    <td className="px-4 py-2 text-gray-300">{user.email}</td>
                    <td className="px-4 py-2">
                      {user.isAdmin ? (
                        <span className="text-green-400 font-medium">Yes</span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        {!user.isAdmin ? (
                          <>
                            <button
                              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded flex items-center"
                              onClick={() => openEditModal(user)}
                              title="Edit User"
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded flex items-center"
                              onClick={() => deleteHandler(user._id)}
                              title="Delete User"
                            >
                              <FaTrash />
                            </button>
                          </>
                        ) : (
                          <button className="bg-gray-700 text-gray-300 font-bold py-2 px-3 rounded flex items-center cursor-not-allowed">
                            <FaMinus />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 🪟 Edit Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] rounded-lg p-6 w-96 max-w-[90vw]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Edit User</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Username *</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg bg-[#101011] text-white border-gray-600 focus:border-white focus:outline-none"
                value={editUserName}
                onChange={(e) => setEditUsername(e.target.value)}
                required
                disabled={isUpdating}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Email *</label>
              <input
                type="email"
                className="w-full p-3 border rounded-lg bg-[#101011] text-white border-gray-600 focus:border-white focus:outline-none"
                value={editUserEmail}
                onChange={(e) => setEditUserEmail(e.target.value)}
                required
                disabled={isUpdating}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button
                onClick={updateHandler}
                className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed"
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update User"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Userlist;
