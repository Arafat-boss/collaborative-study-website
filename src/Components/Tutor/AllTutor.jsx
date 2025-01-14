import React, { useEffect, useState } from 'react';

const AllTutor = () => {

        const [allData, setAllData] = useState([]);
    
        useEffect(()=>{
            fetch('/data.json')
            .then(res => res.json())
            .then(data => setAllData(data))
        },[])

        const tutors = allData.filter(item => item.role ==='tutor')
        console.log(tutors);

    return (
        <div>
            
        </div>
    );
};

export default AllTutor;