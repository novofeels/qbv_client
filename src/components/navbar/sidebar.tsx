"use client";

import React, { useState } from "react";
import { FaHistory, FaChevronUp, FaChevronDown, FaExchangeAlt } from "react-icons/fa";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setCurrentCompany } from "@/features/dashboard/dashboardSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  
  // Get current company from Redux
  const currentCompanyId = useSelector((state: RootState) => state.dashboard.currentCompanyId);
  
  // 'activePanel' tracks which panel (if any) is open.
  const [activePanel, setActivePanel] = useState<string | null>(null);
  
  // History data organized by quarters for both companies
  const companyHistoryData = {
    pinnacle: {
      "Q1 2025": [
        { 
          week: 9, 
          lowerBound: 206952000, 
          upperBound: 244129000, 
          midpoint: 225540500, 
          change: 5.2 
        },
        { 
          week: 8, 
          lowerBound: 196842000, 
          upperBound: 232400000, 
          midpoint: 214621000, 
          change: 2.1 
        },
        { 
          week: 7, 
          lowerBound: 192903000, 
          upperBound: 227582000, 
          midpoint: 210242500, 
          change: -0.8 
        },
        { 
          week: 6, 
          lowerBound: 194545000, 
          upperBound: 229490000, 
          midpoint: 212017500, 
          change: 1.4 
        },
        { 
          week: 5, 
          lowerBound: 191809000, 
          upperBound: 226370000, 
          midpoint: 209089500, 
          change: 3.2 
        },
      ],
      "Q4 2024": [
        { 
          week: 13, 
          lowerBound: 185861000, 
          upperBound: 219248000, 
          midpoint: 202554500, 
          change: 1.2 
        },
        { 
          week: 12, 
          lowerBound: 183656000, 
          upperBound: 216717000, 
          midpoint: 200186500, 
          change: 3.7 
        },
        { 
          week: 11, 
          lowerBound: 177101000, 
          upperBound: 208893000, 
          midpoint: 192997000, 
          change: -1.4 
        },
      ],
    },
    ghostcat: {
      "Q1 2025": [
        { 
          week: 9, 
          lowerBound: 271000, 
          upperBound: 301000, 
          midpoint: 286000, 
          change: 12.7 
        },
        { 
          week: 8, 
          lowerBound: 240000, 
          upperBound: 267000, 
          midpoint: 253500, 
          change: 4.3 
        },
        { 
          week: 7, 
          lowerBound: 230000, 
          upperBound: 256000, 
          midpoint: 243000, 
          change: 5.2 
        },
        { 
          week: 6, 
          lowerBound: 219000, 
          upperBound: 243000, 
          midpoint: 231000, 
          change: -2.5 
        },
        { 
          week: 5, 
          lowerBound: 224000, 
          upperBound: 250000, 
          midpoint: 237000, 
          change: 6.8 
        },
      ],
      "Q4 2024": [
        { 
          week: 13, 
          lowerBound: 210000, 
          upperBound: 234000, 
          midpoint: 222000, 
          change: 3.7 
        },
        { 
          week: 12, 
          lowerBound: 202000, 
          upperBound: 226000, 
          midpoint: 214000, 
          change: 1.4 
        },
        { 
          week: 11, 
          lowerBound: 199000, 
          upperBound: 223000, 
          midpoint: 211000, 
          change: -0.9 
        },
      ],
    }
  };

  // Get active company's history data
  const historyData = companyHistoryData[currentCompanyId as keyof typeof companyHistoryData];

  // Track expanded quarters
  const [expandedQuarters, setExpandedQuarters] = useState<Record<string, boolean>>({
    "Q1 2025": true,
    "Q4 2024": false,
  });

  const handleIconClick = (panel: string) => {
    // Toggle panel: if already active, close it; otherwise, open it.
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  const toggleQuarter = (quarter: string) => {
    setExpandedQuarters((prev) => ({
      ...prev,
      [quarter]: !prev[quarter],
    }));
  };

  // Handle history item click
  const handleHistoryItemClick = (quarter: string, week: number) => {
    console.log(`Loading report for ${quarter} - Week ${week}`);
    // This would eventually load the selected report
  };

  // Toggle between companies
  const toggleCompany = () => {
    const newCompanyId = currentCompanyId === 'pinnacle' ? 'ghostcat' : 'pinnacle';
    dispatch(setCurrentCompany(newCompanyId));
  };

  // Format range values based on company (millions for Pinnacle, thousands for Ghost-Cat)
  const formatRangeValue = (lowerBound: number, upperBound: number) => {
    if (currentCompanyId === 'pinnacle') {
      // Format in millions for Pinnacle
      return `$${(lowerBound / 1000000).toFixed(1)}M-${(upperBound / 1000000).toFixed(1)}M`;
    } else {
      // Format in thousands for Ghost-Cat
      return `$${(lowerBound / 1000).toFixed(0)}K-${(upperBound / 1000).toFixed(0)}K`;
    }
  };

  return (
    <>
      {/* Static sidebar: fixed narrow column with icons */}
      <div
        className="fixed left-0 h-full w-12 bg-[#280c3d] text-white flex flex-col items-center py-4 space-y-4 z-40 shadow-2xl border-black border-r"
        style={{ top: "70px" }} // Adjust to match Topbar height
      >
        <button
          className={`p-2 hover:bg-gray-700 rounded ${activePanel === 'history' ? 'bg-gray-700' : ''}`}
          onClick={() => handleIconClick("history")}
          title="Score History"
        >
          <FaHistory size={18} />
        </button>
        
        {/* Add company switcher icon */}

      </div>

      {/* Expandable panel for additional content */}
      <div
        className={`fixed top-[70px] left-12 h-full bg-[#361352d0] shadow-lg z-30 transform transition-transform duration-300 ease-in-out ${
          activePanel ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "320px" }}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-[#e5daee44] flex justify-between items-center">
            <h2 className="text-md font-semibold text-white">
              {activePanel === "history"
                ? "QBV History"
                : ""}
            </h2>
            
            {/* Company indicator */}
            <div className={`px-3 py-1 rounded text-xs font-medium ${
              currentCompanyId === 'pinnacle' ? 'bg-blue-900 text-blue-100' : 'bg-green-900 text-green-100'
            }`}>
              {currentCompanyId === 'pinnacle' ? 'Pinnacle' : 'Ghost-Cat'}
            </div>
          </div>
          
          {/* History Panel Content */}
          {activePanel === "history" && (
            <div className="flex-1 overflow-y-auto text-white custom-scrollbar">
              {Object.entries(historyData).map(([quarter, weeks]) => (
                <div key={quarter} className="border-b border-[#e5daee22]">
                  {/* Quarter Header - Clickable to expand/collapse */}
                  <div 
                    className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[#4c1d73]"
                    onClick={() => toggleQuarter(quarter)}
                  >
                    <span className="font-medium">{quarter}</span>
                    <span>
                      {expandedQuarters[quarter] ? (
                        <FaChevronUp size={12} className="text-gray-300" />
                      ) : (
                        <FaChevronDown size={12} className="text-gray-300" />
                      )}
                    </span>
                  </div>
                  
                  {/* Weeks List - Show when quarter is expanded */}
                  {expandedQuarters[quarter] && (
                    <div className="pb-2">
                      {weeks.map((item: any) => (
                        <div 
                          key={`${quarter}-week-${item.week}`}
                          className="px-4 py-2 hover:bg-[#4c1d73] cursor-pointer transition-colors duration-200"
                          onClick={() => handleHistoryItemClick(quarter, item.week)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-3"></div>
                              <span className="text-sm text-gray-200">Week {item.week}</span>
                            </div>
                            
                            <div 
                              className={`flex items-center text-xs ${
                                item.change >= 0 ? "text-green-400" : "text-red-400"
                              }`}
                            >
                              {item.change >= 0 ? (
                                <TrendingUp size={12} className="mr-1" />
                              ) : (
                                <TrendingDown size={12} className="mr-1" />
                              )}
                              <span>{Math.abs(item.change)}%</span>
                            </div>
                          </div>
                          
                          {/* Range value display */}
                          <div className="ml-6 mt-1 text-xs text-gray-300 font-medium">
                            {formatRangeValue(item.lowerBound, item.upperBound)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;