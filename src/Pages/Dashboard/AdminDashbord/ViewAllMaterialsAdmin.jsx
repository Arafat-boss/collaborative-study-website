import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import toast from "react-hot-toast";

const ViewAllMaterialsAdmin = () => {
    // const [materials, refetch] = useUploadeMaterials()
  const publicAxios = useAxiosPublic();


  const { data: allMaterials = [], refetch } = useQuery({
    queryKey: ["allMaterials"],
    queryFn: async () => {
      const res = await publicAxios.get("/materials");
      return res.data;
    },
  });

  // Add a function for handling the delete button
const handleDelete = async (id) => {
    try {
        const res = await publicAxios.delete(`/materials/${id}`);
        if (res.data.deletedCount > 0) {
          toast.success("Material deleted successfully!");
          refetch(); 
        } else {
          toast.error("Failed to delete the material.");
        }
      } catch (error) {
        console.error("Error deleting material:", error);
        toast.error("An error occurred while deleting the material.");
      }
};


  return (
    <div>
        <SectionTitle header={'View All Materials'} subHeader={"The All Resources page displays instructor-created learning resources, including notes, guides and articles, allowing users to search, browse and filter content based on topic topics"}></SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {allMaterials.map((material) => (
          <div
            key={material.sessionId}
            className="border rounded-lg shadow-lg p-4 flex flex-col items-center bg-white"
          >
            <img
              src={material.materialImage}
              alt={material.sessionTitle || "Material"}
              className="w-full h-32 object-cover rounded-md"
            />
            <h2 className="text-lg font-bold mt-2">
              {material.sessionTitle || "Untitled Material"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              ID: {material.sessionId}
            </p>
            <a
              href={`mailto:${material.tutorEmail}`}
              className="text-blue-500 underline mt-2"
            >
              {material.tutorEmail}
            </a>
            <button
              onClick={() => handleDelete(material._id)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};



export default ViewAllMaterialsAdmin;
