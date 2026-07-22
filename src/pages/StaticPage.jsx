import React from 'react';

const StaticPage = ({ title, content }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-serif text-[var(--color-secondary)] mb-8 text-center">{title}</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {content}
      </div>
    </div>
  );
};

export default StaticPage;
