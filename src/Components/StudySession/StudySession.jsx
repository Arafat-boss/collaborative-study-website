
import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import StudySessionCard from "../StudySessionCard/StudySessionCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const StudySession = () => {
    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false); // State to manage showing all cards
    const axiosPublic = useAxiosPublic();

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

    useEffect(() => {
      fetchData();
    }, []);

    const allSessions = allData.filter((session) => session.status === "success");

    // Slice the array to show only 6 items by default
    const sessionsToShow = showAll ? allSessions : allSessions.slice(0, 6);

    return (
        <div>
            <SectionTitle
                header={"Study Session"}
                subHeader="Our study sessions are designed to help you master your subjects through collaboration and expert guidance."
            ></SectionTitle>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 lg:px-20 md:px-10 px-5">
                {sessionsToShow.map(data => (
                    <StudySessionCard key={data.sessionTitle} data={data}></StudySessionCard>
                ))}
            </div>
            {!showAll && allSessions.length > 6 && (
                <div className="flex justify-center mt-5 mb-5">
                    <button
                        onClick={() => setShowAll(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Show All
                    </button>
                </div>
            )}
        </div>
    );
};

export default StudySession;
