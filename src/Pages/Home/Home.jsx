import React from 'react';
import Banner from '../../Components/Banner/Banner';
import StudySession from '../../Components/StudySession/StudySession';
import AllTutor from '../../Components/Tutor/AllTutor';
import FastSection from '../../Components/ExtraSection/FastSection';
import SkillsPlatform from '../../Components/ExtraSection/SkillsPlatform';
import CorporatePartners from '../../Components/ExtraSection/CorporatePartners';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <SkillsPlatform></SkillsPlatform>
            <StudySession></StudySession>
            <FastSection></FastSection>
            <AllTutor></AllTutor>
            <CorporatePartners></CorporatePartners>
        </div>
    );
};

export default Home;