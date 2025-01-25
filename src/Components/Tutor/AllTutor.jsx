import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import useUsers from "../../Hooks/useUsers";
import useAuth from "../../Hooks/useAuth";

const AllTutor = () => {
  const { user } = useAuth();
  const [users, refetch] = useUsers();
  const tutors = users.filter((item) => item.role === "tutor");
  console.log(tutors);

  return (
    <>
      <SectionTitle header={"All Tutors"}></SectionTitle>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5 my-10 lg:px-10 md:px-5 px-5">
        {tutors.map((tutor) => (
          <div
            key={tutor._id}
            className="max-w-sm p-4 overflow-hidden rounded-lg shadow bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800"
          >
            <article className="flex items-center space-x-4"> {/* Added flex for left-right layout */}
              {/* Left Side Image */}
              <img
                src={tutor.image}
                alt={tutor.name}
                className="w-16 h-16 rounded-full bg-gray-500 dark:bg-gray-500"
              />
              {/* Right Side Information */}
              <div>
                <h2 className="text-lg font-bold">{tutor.name}</h2>
                <p className="text-sm text-gray-400 dark:text-gray-600">{tutor.email}</p>
                <span className="mt-2 inline-block text-sm font-medium text-blue-500">
                  {tutor.role}
                </span>
              </div>
            </article>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllTutor;
