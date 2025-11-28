import React from 'react';

export const LoadingSpinner = ({ size = 'md', message = 'Carregando...' }) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizes[size]} mb-4`}></div>
      {message && <p className="text-gray-600">{message}</p>}
    </div>
  );
};