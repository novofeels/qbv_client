"use client";

// app/dashboard/page.tsx
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { useSelector } from "react-redux";

// Import detailed component views
import AwarenessDetails from "@/components/AwarenessDetails";
import PerceptionDetails from "@/components/PerceptionDetails";
import CompetitionDetails from "@/components/CompetitionDetails";
import InsightDetails from "@/components/InsightDetails";

// Import utility functions
import { getRingColor, getStatusColor } from "@/utils/colorUtils";

export default function DashboardPage() {
  // Get data from Redux store
  const pinnacleData = useSelector((state) => state.dashboard.pinnacleData);
  const constructs = useSelector((state) => state.dashboard.constructs);
  
  const [selectedConstructIndex, setSelectedConstructIndex] = useState<number | null>(null); // No default selection
  

  const handleConstructClick = (index: number) => {

    setSelectedConstructIndex(index);
  };

  // Get the selected construct data if a construct is selected
  const selectedConstruct = selectedConstructIndex !== null ? constructs[selectedConstructIndex] : null;
  
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Centered Q logo + greeting */}



      {/* Main Report Card with Overall QBV Score */}
      <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
        <div className="text-center mb-6">
  

   

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {pinnacleData.name} QBV Report
          </h2>
          
          <div className="mt-4 flex justify-center">
            <div 
              className="w-28 h-28 rounded-full flex items-center justify-center text-white text-3xl font-bold relative group cursor-help"
              style={{ backgroundColor: getRingColor(pinnacleData.overallScore) }}
            >
              {pinnacleData.overallScore}
              
              {/* Overall score tooltip */}
              <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-gray-900 text-white p-3 rounded shadow-lg text-xs w-64 left-1/2 transform -translate-x-1/2 -bottom-48">
                <p className="font-bold mb-2 border-b pb-1">QBV Score Breakdown</p>
                <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                  {constructs.map((construct, idx) => (
                    <React.Fragment key={idx}>
                      <span>{construct.name}:</span>
                      <span>{construct.value}/100</span>
                    </React.Fragment>
                  ))}
                </div>
                <p className="mt-2 text-xs italic">The QBV score aggregates multiple factors to evaluate your overall digital brand presence.</p>
              </div>
            </div>
          </div>
          <p className={`mt-2 font-semibold text-xl ${getStatusColor(pinnacleData.status)}`}>
            {pinnacleData.status}
          </p>
        </div>

 
        <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">
          QBV Construct Scores
        </h3>
        <p className="text-center text-gray-600 mb-8">
          Select a construct to view detailed analysis
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-10">
          {constructs.map((construct, idx) => (
            <motion.div
              key={idx}
              className="cursor-pointer flex flex-col items-center"
              onClick={() => handleConstructClick(idx)}
              animate={{ 
                scale: selectedConstructIndex === idx ? 1.1 : 1,
                opacity: selectedConstructIndex === idx ? 1 : 0.8
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Outer ring (colored border) */}
              <div
                className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center"
                style={{
                  border: `6px solid ${getRingColor(construct.value)}`,
                  boxShadow: selectedConstructIndex === idx ? '0 0 12px rgba(0,0,0,0.2)' : 'none'
                }}
              >
                {/* Inner circle (white background + numeric score) */}
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-white text-gray-800 text-lg md:text-xl font-bold">
                  {construct.value}
                </div>
              </div>
              <div className={`text-center mt-2 text-sm md:text-base font-medium ${selectedConstructIndex === idx ? 'text-gray-800' : 'text-gray-500'}`}>
                {construct.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* The 4 Constructs Circle Display */}
     

      {/* Render the appropriate detail component based on selected construct */}
      {selectedConstruct && (
        <>
          {selectedConstructIndex === 0 && (
            <AwarenessDetails 
              constructData={selectedConstruct.data} 
              pinnacleData={pinnacleData} 
            />
          )}
          
          {selectedConstructIndex === 1 && (
            <PerceptionDetails 
              constructData={selectedConstruct.data} 
              pinnacleData={pinnacleData} 
            />
          )}
          
          {selectedConstructIndex === 2 && (
            <CompetitionDetails 
              constructData={selectedConstruct.data} 
              pinnacleData={pinnacleData} 
            />
          )}
          
          {selectedConstructIndex === 3 && (
            <InsightDetails 
              constructData={selectedConstruct.data} 
              pinnacleData={pinnacleData} 
            />
          )}
        </>
      )}
    </div>
  );
}