import React from 'react';

const BenefitCard = ({ icon, title, description }) => {
  return (
    <div className="card">
      {icon}
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default BenefitCard; 