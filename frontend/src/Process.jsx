import React, { useState, useEffect, useRef } from 'react';
import { Battery, Truck, Wrench, Cog, Droplets, Recycle } from 'lucide-react';

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  const stepsRef = useRef([]);

  const recyclingSteps = [
    {
      title: "Collection",
      description: "EV batteries are collected from vehicles at end-of-life and transported to recycling facilities in specialized containers.",
      icon: <Truck className="text-green-600" size={32} />,
    },
    {
      title: "Disassembly",
      description: "Batteries are manually disassembled to separate casings, electronics, and modules in a controlled environment.",
      icon: <Wrench className="text-green-600" size={32} />,
    },
    {
      title: "Shredding",
      description: "Battery modules are mechanically shredded into smaller pieces to prepare materials for separation processes.",
      icon: <Cog className="text-green-600" size={32} />,
    },
    {
      title: "Separation",
      description: "Materials are separated using techniques like flotation, filtering, and magnetic separation to isolate valuable components.",
      icon: <Droplets className="text-green-600" size={32} />,
    },
    {
      title: "Recovery",
      description: "Chemical processes extract valuable metals like lithium, cobalt, nickel, and manganese for reuse in new products.",
      icon: <Battery className="text-green-600" size={32} />,
    },
    {
      title: "Reuse",
      description: "Recovered materials are transformed into new batteries or other products, completing the circular economy cycle.",
      icon: <Recycle className="text-green-600" size={32} />,
    },
  ];

  useEffect(() => {
    const calculateVisibility = () => {
      const container = containerRef.current;
      if (!container) return;
      
      // References for steps container
      const stepsContainer = stepsRef.current[0]?.parentElement;
      if (!stepsContainer) return;
      
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      
      // Calculate steps section position
      const stepsTop = stepsContainer.getBoundingClientRect().top + scrollPosition;
      const stepsHeight = stepsContainer.offsetHeight;
      
      // Calculate progress based on steps section only
      const scrollPercentage = Math.min(
        Math.max(0, (scrollPosition - stepsTop + windowHeight) / stepsHeight),
        1
      ) * 100;
      setScrollProgress(scrollPercentage);

      // Find which step is most visible
      let mostVisibleIndex = 0;
      let highestVisibility = 0;
      
      stepsRef.current.forEach((step, index) => {
        if (!step) return;
        
        const rect = step.getBoundingClientRect();
        const elemTop = rect.top;
        const elemBottom = rect.bottom;
        
        // Calculate how much of the element is visible
        const visibleTop = Math.max(0, elemTop < 0 ? 0 : elemTop);
        const visibleBottom = Math.min(windowHeight, elemBottom);
        const visibleHeight = visibleBottom - visibleTop;
        
        // Get percentage of element that's visible
        const visibilityPercentage = visibleHeight / rect.height;
        
        if (visibilityPercentage > highestVisibility) {
          highestVisibility = visibilityPercentage;
          mostVisibleIndex = index;
        }
      });
      
      setActiveStep(mostVisibleIndex);
    };

    window.addEventListener('scroll', calculateVisibility);
    window.addEventListener('resize', calculateVisibility);
    
    // Initial calculation
    setTimeout(calculateVisibility, 100);
    
    return () => {
      window.removeEventListener('scroll', calculateVisibility);
      window.removeEventListener('resize', calculateVisibility);
    };
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans" ref={containerRef}>
      {/* Header Section */}
      <header className="bg-gradient-to-r from-green-500 to-yellow-400 py-12 px-4 md:px-12 text-white shadow-lg rounded-b-2xl">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Our Recycling Process</h1>
          <p className="text-lg md:text-xl max-w-3xl">
            Recycling lithium-ion batteries from electric vehicles is crucial for sustainability. 
            It reduces environmental impact, conserves valuable resources, and makes electric 
            transportation more environmentally friendly.
          </p>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <div className="h-2 bg-gray-200 w-full">
          <div 
            className="h-full bg-gradient-to-r from-green-500 to-yellow-400 transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 gap-16 mb-12">
          {recyclingSteps.map((step, index) => (
            <div 
              ref={el => stepsRef.current[index] = el}
              key={index}
              className={`
                transition-all duration-500 ease-in-out rounded-2xl shadow-lg
                ${activeStep === index ? 'bg-white border-l-4 border-green-500 transform scale-105' : 'bg-gray-50'}
              `}
            >
              <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Step Number & Icon */}
                <div className={`
                  flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full
                  transition-all duration-300
                  ${activeStep === index ? 'bg-green-100' : 'bg-gray-200'}
                `}>
                  <div className="flex items-center justify-center">
                    {step.icon}
                    <span className="absolute text-sm font-bold text-gray-700">{index + 1}</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-grow">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{step.title}</h2>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              </div>
              
              {/* Timeline connector */}
              {index < recyclingSteps.length - 1 && (
                <div 
                  className={`h-16 w-1 ml-12 md:ml-12 -mb-12 transition-colors duration-500 ${
                    activeStep > index 
                      ? 'bg-gradient-to-b from-green-500 to-yellow-400 opacity-100' 
                      : 'bg-gray-300 opacity-70'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        
        {/* Footer Info */}
        <div className="mt-12 bg-gray-100 rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Why Recycling EV Batteries Matters</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">•</span>
              <span>Reduces the need for environmentally harmful mining of new materials</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">•</span>
              <span>Recovers valuable materials like lithium, cobalt, and nickel</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">•</span>
              <span>Prevents toxic materials from entering landfills</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-1">•</span>
              <span>Creates a circular economy for EV components</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}