import React from 'react';
import { PropagateLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <PropagateLoader
                color="#0d75f8"
                cssOverride={{}}
                loading
                size={20}
                speedMultiplier={1}
            />
        </div>
    );
};

export default Loader;
