import React, { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";

const AllTutor = () => {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setAllData(data));
  }, []);

  const tutors = allData.filter((item) => item.role === "tutor");
  console.log(tutors);

  return (
    <>
    <SectionTitle header={'ALl tutor'}></SectionTitle>
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 my-10 lg:px-20 md:px-10 px-5">
      {tutors.map((tutor) => (
        <div key={tutor.sessionTitle} className="max-w-md p-6 overflow-hidden rounded-lg shadow bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-800">
          <article>
            <h2 className="text-xl font-bold">
              {tutor.sessionTitle}
            </h2>
            <p className="mt-4 text-gray-400 dark:text-gray-600">
             {tutor.sessionDescription}
            </p>
            <div className="flex items-center mt-8 space-x-4">
              <img
                src="https://source.unsplash.com/100x100/?portrait"
                alt=""
                className="w-10 h-10 rounded-full bg-gray-500 dark:bg-gray-500"
              />
              <div>
                <h3 className="text-sm font-medium">{tutor.tutorName}</h3>
                <time
                  datetime="2021-02-18"
                  className="text-sm text-gray-400 dark:text-gray-600"
                >
                 {tutor.registrationEndDate}
                </time>
              </div>
            </div>
          </article>
        </div>
      ))}
    </div>
    </>
  );
};

export default AllTutor;
