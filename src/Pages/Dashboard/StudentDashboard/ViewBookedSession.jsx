import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import Card from "../../../Components/StudySessionCard/Card";

const ViewBookedSession = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: booked = [] } = useQuery({
    queryKey: ["booked"],
    queryFn: async () => {
      const result = await axiosPublic.get(`/bookedSessions/${user.email}`);
      return result.data;
    },
  });

  return (
    <div>
      <SectionTitle
        header={"View booked session"}
        subHeader={
          'The "View Booked Sessions" feature allows users to manage and track their scheduled study sessions efficiently, ensuring better organization.'
        }
      ></SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {booked.map((session) => (
          <Card key={session.sessionId} session={session} />
        ))}
      </div>
    </div>
  );
};

export default ViewBookedSession;
