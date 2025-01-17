import React from "react";
import useUsers from "../../../Hooks/useUsers";
import { FiEdit } from "react-icons/fi";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaSearch } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ViewAllUser = () => {
  const [users, refetch] = useUsers();
  const axiosSecure = useAxiosSecure()
  console.log(users);

  const handelMakeAdmin = (user)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "Do you want to give admin access",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Admin it!"
      }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res=>{
                console.log(res.data);
                if(res.data.modifiedCount > 0){
                    refetch()
                    Swal.fire({
                        title: "Admin",
                        text: `${user.name} is an Admin Now!`,
                        icon: "success"
                      });
                }
            })
        }
      });
    console.log(user);

  }

  return (
    <div>
      <SectionTitle header={"all user"}></SectionTitle>
      <div className="flex justify-between">
        <h3 className="text-xl">
          User: <span className="badge badge-warning">{users.length}</span>
        </h3>
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search User Name/Email" />
            <FaSearch></FaSearch>
        </label>
      </div>
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Email</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Role</span>
                    </th>
                    
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Update role
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {index+1}.
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {user.name}
                      </td>

                      {/* <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                          {format(new Date(post.deadline), "P")}
                        </td> */}
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-2">
                          <p>{user.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-yellow-100/60 text-yellow-500`}
                        >
                          <span className={``}>{user.role}</span>
                          <h2 className="text-sm font-normal ">{}</h2>
                        </div>
                      </td>
                      
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {/* update button */}
                          <button onClick={()=>handelMakeAdmin(user)} title="Mark Complete" className="flex gap-1 border px-2 py-1 rounded-lg">
                            <FiEdit className="text-cyan-400" size={25} /> Update
                          </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllUser;
