import React from 'react';
import { Fade } from 'react-awesome-reveal';
import Banner from '../../Components/Banner/Banner';
import StudySession from '../../Components/StudySession/StudySession';
import AllTutor from '../../Components/Tutor/AllTutor';
import FastSection from '../../Components/ExtraSection/FastSection';
import SkillsPlatform from '../../Components/ExtraSection/SkillsPlatform';
import CorporatePartners from '../../Components/ExtraSection/CorporatePartners';

const Home = () => {
    return (
        <div className="overflow-x-hidden space-y-2">
            <Fade triggerOnce>
                <Banner />
            </Fade>
            <Fade triggerOnce fraction={0.15}>
                <SkillsPlatform />
            </Fade>
            <Fade triggerOnce fraction={0.15}>
                <StudySession />
            </Fade>
            <Fade triggerOnce fraction={0.15}>
                <FastSection />
            </Fade>
            <Fade triggerOnce fraction={0.15}>
                <AllTutor />
            </Fade>
            <Fade triggerOnce fraction={0.15}>
                <CorporatePartners />
            </Fade>
        </div>
    );
};

export default Home;