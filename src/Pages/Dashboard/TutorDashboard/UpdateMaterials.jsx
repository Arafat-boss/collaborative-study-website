import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { useLoaderData, useParams } from 'react-router-dom';

const UpdateMaterials = () => {
    const item = useLoaderData();
    const dd = useParams()
    console.log(item, dd);

    return (
        <div>
             <SectionTitle header={'update materials'}></SectionTitle>
             {/* TODO: Kaj baki ase */}
        </div>
    );
};

export default UpdateMaterials;