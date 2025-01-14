import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import StudySessionCard from "../StudySessionCard/StudySessionCard";

const StudySession = () => {
    const [allData, setAllData] = useState([]);

    useEffect(()=>{
        fetch('/data.json')
        .then(res => res.json())
        .then(data => setAllData(data))
    },[])



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
