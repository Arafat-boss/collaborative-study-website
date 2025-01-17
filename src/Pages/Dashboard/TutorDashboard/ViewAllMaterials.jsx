import React, {  useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useUploadeMaterials from "../../../Hooks/useUploadeMaterials";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ViewAllMaterials = () => {
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const [materials, refetch] = useUploadeMaterials();


  //handel delete
  const handelDelete = async (id) => {
    try {
      const res = await axiosPublic.delete(`/materials/${id}`);
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
      <SectionTitle
        header={"view All Materials"}
        subHeader={
          'The "View All Materials" section provides students and tutors with quick access to all uploaded resources, including documents, videos, and presentations, ensuring seamless and organized learning support for sessions.'
        }
      ></SectionTitle>
      {/* TODO: kaj baki ase */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
        {materials.map((item) => (
          <div key={item._id} className="card bg-base-100 shadow-xl group">
            <figure>
              <img
                src={item.materialImage}
                alt="Course Thumbnail"
                className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-90"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-lg">{item.sessionTitle}</h2>
              <p className="text-sm text-gray-600">
                Study Session Material Id:{" "}
                <span className="font-semibold">{item.sessionId}</span>
              </p>
              <p className="text-md">
                <span className="font-bold">Material Link:</span>{" "}
                {item.materialLink}
              </p>
              <div className="card-actions  flex justify-between mt-4">
                <Link to={`/dashboard/updateMaterial/${item._id}`}>
                <button className="btn btn-primary">Update</button>
                </Link>
                <button
                  onClick={() => handelDelete(item._id)}
                  className="btn btn-warning"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllMaterials;
