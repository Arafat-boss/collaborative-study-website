import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useUploadeMaterials from '../../../Hooks/useUploadeMaterials';

const ViewAllMaterials = () => {
     const [loading, setLoading] = useState(true);
     const [allMaterial, setAllMaterial] = useState([]);
     const axiosPublic = useAxiosPublic();
     const {user} = useAuth();
     const [materials, refetch] = useUploadeMaterials()

     // Fetch user-specific data
      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axiosPublic.get(`/materials/${user.email}`);
            setAllMaterial(data);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);
          }
        };

        if (user?.email) {
          fetchData();
        }
      }, [axiosPublic, user?.email]);
      console.log(allMaterial);

      //handel delete
      const handelDelete= async(id)=>{
        // const {data: material = [], refetch} = useQuery({
        //     queryKey:['material'],
        //     queryFn: async()=>{
        //         const res = await axiosPublic.delete(`/materials/${id}`)
        //         return res.data
        //     }
        //   })

         await axiosPublic.delete(materials`${id}`)
        .then(res =>{
            console.log(res.data);
            if(deletedCount > 0){
                refetch()
                toast.success(`Successfully ${allMaterial.sessionTitle} delete!`);
            }
        })
      }

    return (
        <div>
            <SectionTitle header={'view All Materials'} subHeader={'The "View All Materials" section provides students and tutors with quick access to all uploaded resources, including documents, videos, and presentations, ensuring seamless and organized learning support for sessions.'}></SectionTitle>
            {/* TODO: kaj baki ase */}
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-5'>
                {
                    allMaterial.map(item =>  <div key={item._id} className="card bg-base-100 shadow-xl group">
                        <figure>
                          <img
                            src={item.materialImage}
                            alt="Course Thumbnail"
                            className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-90"
                          />
                        </figure>
                        <div className="card-body">
                          <h2 className="card-title text-lg">
                            {item.sessionTitle}
                          </h2>
                          <p className="text-sm text-gray-600">
                            Study Session Material Id:{" "}
                            <span className="font-semibold">
                              {item.sessionId}
                            </span>
                          </p>
                          <p className="text-md">
                            <span className="font-bold">Material Link:</span> {item.materialLink}
                          </p>
                          <div className="card-actions  flex justify-between mt-4">
                            <button className="btn btn-primary">Update</button>
                            <button onClick={()=>handelDelete(item._id)} className="btn btn-warning">Delete</button>
                          </div>
                        </div>
                      </div>)
                }
            </div>
        </div>
    );
};

export default ViewAllMaterials;

