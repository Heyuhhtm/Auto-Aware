import React, { useEffect, useState } from "react";

// To use your own images:
// 1. Place your image files in the 'src' folder (e.g., inside a folder named 'assets')
// 2. Import them here:
// import aiImage from './assets/ai-detection.png';
// import analyticsImage from './assets/analytics.png';
// import iotImage from './assets/iot.png';

const LoadingPage = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Trigger the progress bar animation
    const progressTimer = setTimeout(() => setProgress(100), 100);

    // Wait for 8 seconds before finishing
    const finishTimer = setTimeout(() => {
      onFinish(); // move to main app
    }, 3000); 

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className="min-h-screen bg-white text-black-900 flex flex-col font-sans relative overflow-hidden">
      
      <div className="w-full px-6 py-3 flex justify-between items-center shadow-sm" style={{ backgroundColor: '#adcaf3ff' }}>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          SafeSphere <span className="text-black-600">Technologies Pvt. Ltd.</span>
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
          <span className="font-semibold">Sign In</span>
        </button>
      </div>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col justify-start items-center px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
        
        {/* Brand / Hero */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <p className="text-xl text-black-500 leading-relaxed max-w-2xl mx-auto">
            AutoAware is a smart road infrastructure monitoring system that uses IoT and AI to
            detect accidents in real time, identify high-risk road zones, and support proactive road
            maintenance.
          </p>
        </div>

        {/* Loading Bar */}
        <div className="w-full max-w-md mb-16">
          <div className="flex justify-between text-xs font-semibold text-black-400 uppercase tracking-wider mb-2">
            <span>System Initialization</span>
            <span>{progress === 100 ? 'Ready' : 'Loading...'}</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all ease-out" 
              style={{ width: `${progress}%`, transitionDuration: '3000ms' }}
            ></div>
          </div>
        </div>

        {/* Project Details / Image Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {/* Card 1 */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-gray-200 rounded-xl mb-6 flex items-center justify-center text-gray-400 text-sm font-medium overflow-hidden">
              {/* Replace src string below with your imported image variable (e.g., src={aiImage}) */}
              <img 
                src="https://placehold.co/400x300/e2e8f0/94a3b8?text=AI+Detection" 
                alt="AI Detection" 
                className="w-full h-full object-cover" 
              />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">AI-Powered Detection</h3>
            <p className="text-black-600 text-sm">
              Advanced computer vision algorithms analyzing traffic feeds in real-time to detect anomalies instantly.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-gray-200 rounded-xl mb-6 flex items-center justify-center text-gray-400 text-sm font-medium overflow-hidden">
              {/* Replace src string below with your imported image variable */}
              <img 
                src="https://placehold.co/400x300/e2e8f0/94a3b8?text=Analytics" 
                alt="Predictive Analytics" 
                className="w-full h-full object-cover" 
              />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Predictive Analytics</h3>
            <p className="text-black-600 text-sm">
              Identifying blackspots and danger zones using historical data to prevent future accidents.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-gray-200 rounded-xl mb-6 flex items-center justify-center text-gray-400 text-sm font-medium overflow-hidden">
              {/* Replace src string below with your imported image variable */}
              <img 
                src="https://placehold.co/400x300/e2e8f0/94a3b8?text=IoT+Integration" 
                alt="IoT Integration" 
                className="w-full h-full object-cover" 
              />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">IoT Integration</h3>
            <p className="text-black-600 text-sm">
              Seamless connection with emergency services and hospital networks for rapid response coordination.
            </p>
          </div>
        </div>

        {/* About Us Section */}
        <div className="w-full max-w-6xl mt-12 p-8 rounded-2xl border-2 border-sky-400 bg-white text-left shadow-sm">
          <h3 className="text-3xl font-bold text-blue-700 mb-4 font-serif">About Us</h3>
          <p className="text-black text-lg leading-relaxed">
            SafeSphere Technologies is a technology-driven startup focused on enhancing road safety and smart 
            infrastructure through AI, IoT, and real-time data analytics. We develop intelligent systems that 
            detect accidents, identify accident-prone road segments, and provide actionable insights to support 
            proactive road maintenance and faster emergency response. Our solutions help authorities and smart 
            cities move from manual inspections to data-driven, preventive decision-making, enabling safer, smarter, 
            and more reliable road networks.
          </p>
        </div>

      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-blue-800 text-xs border-t border-gray-200">
        © 2025 SafeSphere Technologies Pvt. Ltd. | Powered by AutoAware AI & IoT
      </footer>
    </div>
  );
};

export default LoadingPage;
