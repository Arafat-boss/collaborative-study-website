import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const ViewAllStudySessions = () => {
    return (
        <div>
            <SectionTitle header={'View All Study Sessions'} subHeader={`The "View All Study Sessions" page offers filters for subjects, tutors, timings, and registration status, alongside highlights like popular, upcoming, and recent sessions, ensuring quick access to personalized learning opportunities.`}></SectionTitle>

            {/* TODO: added all session for specific tutor */}
        </div>
    );
};

export default ViewAllStudySessions;