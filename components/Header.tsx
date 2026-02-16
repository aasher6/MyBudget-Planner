import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            {/* Custom Notebook Icon matching the user's image */}
            <div className="relative w-10 h-10 flex-shrink-0">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
                {/* Notebook Body */}
                <rect x="15" y="10" width="75" height="80" rx="10" fill="white" stroke="#E2E8F0" strokeWidth="2"/>
                
                {/* Binding / Spirals */}
                <rect x="10" y="22" width="10" height="6" rx="3" fill="#000"/>
                <rect x="10" y="38" width="10" height="6" rx="3" fill="#000"/>
                <rect x="10" y="54" width="10" height="6" rx="3" fill="#000"/>
                <rect x="10" y="70" width="10" height="6" rx="3" fill="#000"/>

                {/* Green Checkmarks */}
                <path d="M35 35l5 5 10-10" stroke="#10B981" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M35 55l5 5 10-10" stroke="#10B981" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>

                {/* Entry Lines */}
                <rect x="55" y="40" width="25" height="5" rx="2.5" fill="#000"/>
                <rect x="55" y="60" width="25" height="5" rx="2.5" fill="#000"/>

                {/* Dollar Badge */}
                <circle cx="75" cy="25" r="15" fill="#10B981"/>
                <text x="75" y="31" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Inter">$</text>
              </svg>
            </div>
            
            <div className="flex flex-col -space-y-1">
              <h1 className="text-xl font-black text-gray-900 tracking-tight">
                MyBudget <span className="text-emerald-600">Planner</span>
              </h1>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-500 hover:text-emerald-600 font-semibold text-sm transition-colors">Dashboard</button>
            <button className="text-gray-500 hover:text-emerald-600 font-semibold text-sm transition-colors">Insights</button>
            <button className="text-gray-500 hover:text-emerald-600 font-semibold text-sm transition-colors">Reports</button>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 font-bold text-xs">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Live Tracking
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;