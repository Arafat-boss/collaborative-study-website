import React, { useState, useEffect } from "react";
import useUsers from "../../../Hooks/useUsers";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { LuUsers, LuShield, LuGraduationCap, LuBookOpen, LuTrash2 } from "react-icons/lu";

const ViewAllUser = () => {
  const [users, refetch] = useUsers();
  const { user: currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  // Handle Role Change
  const handleRoleChange = (userId, newRole) => {
    Swal.fire({
      title: "Update User Role?",
      text: `Are you sure you want to assign the role "${newRole}" to this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Update Role",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/users/role/${userId}`, { role: newRole });
          if (res.data.modifiedCount > 0 || res.status === 200) {
            refetch();
            Swal.fire("Role Updated!", `User role successfully changed to ${newRole}.`, "success");
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to update user role. Please try again.", "error");
        }
      }
    });
  };

  // Handle User Deletion
  const handleDeleteUser = (userId, userName, userEmail) => {
    if (currentUser?.email === userEmail) {
      Swal.fire({
        icon: "info",
        title: "Action Restricted",
        text: "You cannot delete your own active administrator account.",
      });
      return;
    }

    Swal.fire({
      title: "Delete User Account?",
      text: `Are you sure you want to permanently delete "${userName || userEmail}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete User",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/users/${userId}`);
          if (res.data.deletedCount > 0 || res.status === 200) {
            refetch();
            Swal.fire("Deleted!", "The user account has been successfully removed.", "success");
          } else {
            Swal.fire("Error", "Could not delete user. Please try again.", "error");
          }
        } catch (err) {
          console.error("Delete user error:", err);
          Swal.fire("Error", "Failed to delete user. Please try again.", "error");
        }
      }
    });
  };

  // Filter users safely based on search query
  useEffect(() => {
    const q = searchQuery.toLowerCase();
    const results = (users || []).filter((user) => {
      const name = (user.name || "").toLowerCase();
      const email = (user.email || "").toLowerCase();
      return name.includes(q) || email.includes(q);
    });
    setFilteredUsers(results);
  }, [searchQuery, users]);

  return (
    <div className="space-y-6">
      <SectionTitle
        header="Platform User Management"
        subHeader="View, monitor, search, and manage roles or remove registered accounts."
      />

      {/* Top Filter & Count Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <LuUsers className="text-xl" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Total Registered</span>
            <div className="text-lg font-black text-gray-900 dark:text-white">
              {filteredUsers.length} <span className="text-xs font-normal text-gray-500 dark:text-slate-400">Users</span>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-slate-500">
            <FaSearch />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all"
            placeholder="Search name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-gray-100 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                <th className="py-4 px-4 sm:px-6">#</th>
                <th className="py-4 px-4 sm:px-6">User Profile</th>
                <th className="py-4 px-4 sm:px-6">Email Address</th>
                <th className="py-4 px-4 sm:px-6">Current Role</th>
                <th className="py-4 px-4 sm:px-6">Change Role</th>
                <th className="py-4 px-4 sm:px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800 text-sm text-gray-700 dark:text-slate-300">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => {
                  const roleBadge =
                    user?.role === "admin"
                      ? "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                      : user?.role === "tutor"
                      ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                      : "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800";

                  const isSelf = currentUser?.email === user.email;

                  return (
                    <tr key={user._id || index} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-mono text-xs text-gray-400 dark:text-slate-500">
                        {index + 1}
                      </td>

                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <img
                            referrerPolicy="no-referrer"
                            src={user.image || "https://placehold.co/80x80?text=User"}
                            alt={user.name || "User"}
                            className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-slate-700"
                          />
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-900 dark:text-white truncate max-w-[140px] sm:max-w-[200px]">
                              {user.name || "Anonymous"}
                            </span>
                            {isSelf && (
                              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
                                (You)
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-gray-600 dark:text-slate-400 truncate max-w-[180px] sm:max-w-[240px]">
                        {user.email}
                      </td>

                      <td className="py-4 px-4 sm:px-6">
                        <span className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${roleBadge}`}>
                          {user.role === "admin" ? <LuShield /> : user.role === "tutor" ? <LuGraduationCap /> : <LuBookOpen />}
                          <span>{user?.role || "student"}</span>
                        </span>
                      </td>

                      <td className="py-4 px-4 sm:px-6">
                        <select
                          className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-gray-700 dark:text-slate-200 focus:outline-none focus:border-blue-500 shadow-sm"
                          value={user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        >
                          <option value="student">Student</option>
                          <option value="tutor">Tutor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-center">
                        <button
                          onClick={() => handleDeleteUser(user._id, user.name, user.email)}
                          disabled={isSelf}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all text-xs font-semibold ${
                            isSelf
                              ? "opacity-35 cursor-not-allowed border-gray-200 dark:border-slate-800 text-gray-400"
                              : "border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 dark:hover:text-white shadow-sm"
                          }`}
                          title={isSelf ? "Cannot delete own account" : "Delete User Account"}
                        >
                          <LuTrash2 className="text-sm" />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-500 dark:text-slate-400">
                    No users matching "{searchQuery}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewAllUser;
