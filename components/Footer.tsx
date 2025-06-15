
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800/50 border-t border-slate-700 mt-auto">
      <div className="container mx-auto px-4 py-6 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} AIツールプラン診断. All rights reserved.</p>
        <p className="mt-1">最適なAIツール選びをお手伝いします。</p>
      </div>
    </footer>
  );
};

export default Footer;
