import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import StudySessionCard from "../StudySessionCard/StudySessionCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const StudySession = () => {
    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic()

    
    const fetchData = async () => {
      try {
        const { data } = await axiosPublic.get('/studySession');
        setAllData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    if (loading) {
      fetchData();
    }


  return (
    <div>
      <SectionTitle
        header={"Study Session"}
        subHeader="Our study sessions are designed to help you master your subjects through collaboration and expert guidance."
      ></SectionTitle>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 lg:px-20 md:px-10 px-5">
        {
           allData.map(data =><StudySessionCard key={data.sessionTitle} data={data}></StudySessionCard>) 
        }
      </div>
    </div>
  );
};

export default StudySession;
