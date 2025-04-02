"use client";

// app/dashboard/page.tsx
import React, { useState } from "react";

import { motion } from "framer-motion";
import { ChevronUp, DollarSign, BarChart2, ToggleLeft, ToggleRight } from 'lucide-react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setCurrentCompany } from "@/features/dashboard/dashboardSlice"; // Import the new action

// Import detailed component views
import AwarenessDetails from "@/components/AwarenessDetails";
import PerceptionDetails from "@/components/PerceptionDetails";
import CompetitionDetails from "@/components/CompetitionDetails";
import InsightDetails from "@/components/InsightDetails";

// Import utility functions
import { getRingColor } from "@/utils/colorUtils";

export default function DashboardPage() {
  const dispatch = useDispatch();
  
  // Get the current company ID from Redux
  const currentCompanyId = useSelector((state: RootState) => state.dashboard.currentCompanyId);
  
  // Select the appropriate company data based on currentCompanyId
  const companyData = useSelector((state: RootState) => 
    currentCompanyId === 'pinnacle' 
      ? state.dashboard.pinnacleData 
      : state.dashboard.ghostcatData
  );
  
  // Select the appropriate constructs based on currentCompanyId
  const constructs = useSelector((state: RootState) => 
    currentCompanyId === 'pinnacle' 
      ? state.dashboard.constructs 
      : state.dashboard.ghostcatConstructs
  );
  
  const [selectedConstructIndex, setSelectedConstructIndex] = useState<number | null>(null);
  
  const handleConstructClick = (index: number) => {
    setSelectedConstructIndex(index);
  };
  
  // Function to toggle between companies
  const toggleCompany = () => {
    const newCompanyId = currentCompanyId === 'pinnacle' ? 'ghostcat' : 'pinnacle';
    dispatch(setCurrentCompany(newCompanyId));
  };

  // Tooltip content definitions
  const tooltipContent = [
    "Awareness measures your brand's visibility across digital channels including website traffic, social media presence, and industry mentions.",
    "Perception reflects consumer scores, employee ratings, and sentiment analysis from social media and news sources.",
    "Competition evaluates how well you are performing against your closest competitors in the market.",
    "Insight measures how effectively you are living up to your stated mission and purpose."
  ];

  // Get the selected construct data if a construct is selected
  const selectedConstruct = selectedConstructIndex !== null ? constructs[selectedConstructIndex] : null;
  
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Company Switcher */}
      <div className="max-w-4xl mx-auto mb-4 flex justify-end items-center">
        <span className={`mr-2 font-medium ${currentCompanyId === 'pinnacle' ? 'text-blue-700' : 'text-gray-500'}`}>
          Pinnacle
        </span>
        <div 
          onClick={toggleCompany}
          className="relative inline-flex items-center cursor-pointer"
        >
          {currentCompanyId === 'pinnacle' ? (
            <ToggleLeft className="w-10 h-6 text-blue-600" />
          ) : (
            <ToggleRight className="w-10 h-6 text-green-600" />
          )}
        </div>
        <span className={`ml-2 font-medium ${currentCompanyId === 'ghostcat' ? 'text-green-700' : 'text-gray-500'}`}>
          Ghost-Cat
        </span>
      </div>

      {/* Main Report Card with Overall QBV Score */}
      <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-2xl shadow-md">
        {/* Updated FinTech-styled Header */}
        <div className="mb-8 border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {companyData.name}
            </h1>
            <div className="bg-blue-50 px-3 py-1 rounded text-blue-700 text-sm font-medium">
             Q1 2025 - WEEK 9
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-1">QBV Report</p>
        </div>

        {/* Brand Value Display - use different colors for each company */}
        <div className={`bg-gradient-to-r from-[#280c3d] rounded-lg shadow-sm p-5 mb-6`}>
          <div className="text-white text-md font-medium mb-2 flex items-center">
            <BarChart2 size={16} className="mr-1" />
            <span>QBV Score</span>
          </div>
          
          <div className="flex items-baseline">
            <DollarSign size={24} className="text-white opacity-90" />
            <span className="text-white text-3xl md:text-4xl font-bold tracking-tight">
              {new Intl.NumberFormat('en-US').format(currentCompanyId === 'pinnacle' ? 2500000 : 4750000)}
            </span>
            <span className="text-white text-lg ml-2 opacity-90 font-medium">
              USD
            </span>
          </div>
          
          <div className="flex items-center mt-3">
            <div className="bg-white bg-opacity-20 px-2 py-1 rounded flex items-center">
              <ChevronUp size={16} className="text-green-300" />
              <span className="text-green-300 text-sm font-medium ml-1">
                {currentCompanyId === 'pinnacle' ? '+5.2%' : '+12.7%'}
              </span>
            </div>
            <span className="text-white text-xs ml-2 opacity-80 hover:underline hover:cursor-pointer">since Q4 2024</span>
          </div>
        </div>

        <div className='border-t border-gray-200'>
          <h3 className="text-xl font-semibold text-center text-gray-700 mt-4">
            QBV Category Scores
          </h3>
          <p className="text-center text-gray-600 mb-2">
            Select a construct to view detailed analysis
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-10">
          {constructs.map((construct, idx) => (
            <div key={idx} className="relative">
              {/* Isolate animation to only affect the ring+score, not the tooltip */}
              <motion.div
                className="cursor-pointer flex flex-col items-center"
                onClick={() => handleConstructClick(idx)}
                animate={{ 
                  scale: selectedConstructIndex === idx ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Outer ring (colored border) */}
                <div className="relative group">
                  <div
                    className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center ${selectedConstructIndex === idx ? 'opacity-100' : 'opacity-60'}`}
                    style={{
                      border: `6px solid ${getRingColor(construct.value)}`,
                      boxShadow: selectedConstructIndex === idx ? '0 0 12px rgba(0,0,0,0.2)' : 'none',
                      transition: 'opacity 0.3s'
                    }}
                  >
                    {/* Inner circle (white background + numeric score) */}
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-white text-gray-800 text-lg md:text-xl font-bold">
                      {construct.value}
                    </div>
                  </div>
                  
                  {/* Tooltip - appears on hover - now outside the opacity animation */}
                  <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 absolute z-10 bg-white border border-gray-200 shadow-lg rounded-lg px-4 py-3 w-64 text-sm text-gray-700 left-1/2 transform -translate-x-1/2 mt-2 bottom-full">
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-t border-l border-gray-200"></div>
                    <p>{tooltipContent[idx]}</p>
                  </div>
                </div>
                <div className={`text-center mt-2 text-sm md:text-base font-medium ${selectedConstructIndex === idx ? 'text-gray-800' : 'text-gray-500'}`}
                  style={{ transition: 'color 0.3s' }}>
                  {construct.name}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Render the appropriate detail component based on selected construct */}
      {selectedConstruct && (
        <>
          {selectedConstructIndex === 0 && (
            <AwarenessDetails 
              constructData={selectedConstruct?.data as any} 
              pinnacleData={companyData} 
              companyId={currentCompanyId} 
            />
          )}
          
          {selectedConstructIndex === 1 && (
            <PerceptionDetails 
              constructData={selectedConstruct.data} 
              pinnacleData={companyData} 
              companyId={currentCompanyId} 
            />
          )}
          
          {selectedConstructIndex === 2 && (
            <CompetitionDetails 
              constructData={selectedConstruct.data} 
              pinnacleData={companyData} 
              companyId={currentCompanyId} 
            />
          )}
          
          {selectedConstructIndex === 3 && (
            <InsightDetails 
              constructData={selectedConstruct.data} 
              pinnacleData={companyData}
              companyId={currentCompanyId}
            />
          )}
        </>
      )}
    </div>
  );
}