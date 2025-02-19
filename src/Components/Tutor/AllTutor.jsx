import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import useUsers from "../../Hooks/useUsers";
import useAuth from "../../Hooks/useAuth";
import Marquee from "react-fast-marquee";

const AllTutor = () => {
  const { user } = useAuth();
  const [users, refetch] = useUsers();
  const tutors = users.filter((item) => item.role === "tutor");
  console.log(tutors);

  return (
    <div className="lg:mx-32 bg-blue-50 rounded-md">
      <SectionTitle header={"All Tutors"} subHeader={`A platform connecting students with expert tutors for personalized learning in academics, test prep, and skill development. Flexible, accessible, and tailored to help you achieve your goals.`}></SectionTitle>
      <Marquee
        pauseOnHover={true}
        direction="right" 
        gradient={true}
      >
        <div className="flex gap-5  my-5 lg:px-10 md:px-5">
          {tutors.map((tutor) => (
            <div
              key={tutor._id}
              className="max-w-sm p-4 overflow-hidden rounded-lg shadow-lg bg-blue-300"
            >
              <article className="flex items-center space-x-4">
                {" "}
                {/* Added flex for left-right layout */}
                {/* Left Side Image */}
                <img
                  src={tutor.image}
                  alt={tutor.name}
                  className="w-16 h-16 rounded-full bg-gray-500 dark:bg-gray-500"
                />
                {/* Right Side Information */}
                <div>
                  <h2 className="text-lg font-bold">{tutor.name}</h2>
                  <p className="text-sm ">
                    {tutor.email}
                  </p>
                  <span className="mt-2 inline-block text-sm font-medium text-blue-500">
                    {tutor.role}
                  </span>
                </div>
              </article>
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default AllTutor;