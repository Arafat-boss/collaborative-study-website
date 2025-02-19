import React from 'react';
import img from '../../assets/1.png';

const CorporatePartners = () => {
  const companies = [
    { name: 'Unilever', logo: '../../assets/1.png' },
    { name: 'Samsung', logo: '/path/to/samsung-logo.png' },
    { name: 'BRAC', logo: '/path/to/brac-logo.png' },
    { name: 'IPDC Finance', logo: '/path/to/ipdc-logo.png' },
    { name: 'United Group', logo: '/path/to/united-group-logo.png' },
    { name: 'Apex', logo: '/path/to/apex-logo.png' }
  ];

  return (
    <div className="bg-gray-900 text-white p-8 rounded-xl text-center mx-auto w-11/12 my-5">
      <h2 className="text-lg md:text-xl font-semibold mb-4">
        The country’s top institutions trust our Corporate Skill Development Program
      </h2>
      <div className="flex flex-wrap justify-center gap-8 mb-6">
        {companies.map((company, index) => (
          <p>{company.name}</p>
        ))}
      </div>
      <p className="text-sm md:text-base">
        Learn more by <a href="#" className="text-green-500 hover:underline">emailing us</a> or <a href="#" className="text-green-500 hover:underline">calling us</a>
      </p>
    </div>
  );
};

export default CorporatePartners;
