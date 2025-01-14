import React from 'react';
import Banner from '../../Components/Banner/Banner';
import StudySession from '../../Components/StudySession/StudySession';
import AllTutor from '../../Components/Tutor/AllTutor';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <StudySession></StudySession>
            <AllTutor></AllTutor>
        </div>
    );
};

export default Home;