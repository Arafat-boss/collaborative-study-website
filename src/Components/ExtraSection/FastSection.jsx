import React from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";
import image from '../../assets/courch.png'

const FastSection = () => {

    return (
      <div className="bg-[#3c1313] text-white py-10 px-6 rounded-2xl max-w-5xl mx-auto lg:mt-10">
        <div className="text-center mb-6">
          <button className="bg-red-600 text-white px-4 py-2 rounded-full">Offline Center</button>
          <h2 className="text-2xl font-semibold mt-4">
            After teaching English to over 500,000 students online, we are now offline
          </h2>
        </div>
        
        <div className="flex justify-center gap-3 flex-wrap">
          {['Uttara', 'Panthapath', 'Mirpur', 'Moghbazar', 'Chawkbazar, Chattogram'].map((location, index) => (
            <button key={index} className="bg-[#4b1d1d] flex items-center gap-2 px-4 py-2 rounded-lg">
              <FaMapMarkerAlt /> {location}
            </button>
          ))}
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {courses.map((course, index) => (
            <div key={index} className="bg-[#4b1d1d] p-4 rounded-lg flex flex-col">
              <img src={image} className="w-16 rounded" />
              <p className="text-yellow-400 mt-2">Book a Free Class</p>
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-sm text-gray-300">{course.description}</p>
            </div>
          ))}
        </div>
  
        <div className="text-center mt-6">
          <button className="text-green-400 font-semibold">Book a Free Class →</button>
          <button className="text-blue-400 font-semibold ml-4">Learn More</button>
        </div>
      </div>
    );
};


const courses = [
  {
    title: "Spoken English Junior",
    description: "For students of grades 4-10",
    image: "../../assets/authentication2.png",
  },
  {
    title: "IELTS Programme",
    description: "Access to 1,000+ practice materials",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "English Foundation Programme",
    description: "Detailed classes on essential grammar topics",
    image: "https://via.placeholder.com/150",
  },
  ];
  
export default FastSection;