import React from 'react';

const SectionTitle = ({header, subHeader}) => {
    return (
        <div className='text-center md:w-6/12 mx-auto my-8'>
            <h3 className='text-4xl uppercase border-b py-4 '>{header}</h3>
            <p className='text-yellow-500'>{subHeader}</p>
        </div>
    );

};

export default SectionTitle;