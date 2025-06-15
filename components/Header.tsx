
import React from 'react';
import { LightBulbIcon } from '@heroicons/react/24/solid';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center sm:justify-start">
        <LightBulbIcon className="h-10 w-10 text-sky-400 mr-3" />
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
          AIツールプラン診断
        </h1>
      </div>
    </header>
  );
};

export default Header;
