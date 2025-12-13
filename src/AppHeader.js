import React from 'react';

const IconShieldCheckmark = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width={size} height={size} viewBox="0 0 512 512">
    <path d="M467.5 125.1L256 16.5l-211.5 108.6A48.04 48.04 0 0016 167.3V448a48 48 0 0048 48h384a48 48 0 0048-48V167.3a48.04 48.04 0 00-20.5-42.2zM256 384a80 80 0 1180-80 80.09 80.09 0 01-80 80zm48-128h-96a48 48 0 000 96h96a48 48 0 000-96z" fill="currentColor"></path>
  </svg>
);

const AppHeader = ({ isEmergency, onToggleView }) => (
  <div className={`w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden mb-8`}>
    <div className={`p-4 sm:p-6 flex justify-between items-center text-white ${isEmergency ? 'bg-red-700 animate-pulse' : 'bg-gray-800'}`}>
      <div className="flex items-center space-x-2">
        <IconShieldCheckmark size={24} className="text-white" />
        <h1 className="text-xl sm:text-2xl font-bold">Live Dashboard - {isEmergency ? 'Emergency Alert' : 'Monitoring'}</h1>
      </div>
      <button onClick={onToggleView} className="px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105" style={{ backgroundColor: isEmergency ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}>
        Switch to {isEmergency ? 'Monitoring' : 'Emergency'} View
      </button>
    </div>
  </div>
);

export default AppHeader;