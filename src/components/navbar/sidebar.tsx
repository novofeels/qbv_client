"use client";

import React, { useState } from "react";
import { FaHistory, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { TrendingUp, TrendingDown } from "lucide-react";

const Sidebar = () => {
  // 'activePanel' tracks which panel (if any) is open.
  const [activePanel, setActivePanel] = useState<string | null>(null);
  
  // Dummy history data organized by quarters
  const historyData = {
    "Q1 2025": [
      { week: 9, score: 2500000, change: 5.2 },
      { week: 8, score: 2376200, change: 2.1 },
      { week: 7, score: 2328000, change: -0.8 },
      { week: 6, score: 2346800, change: 1.4 },
      { week: 5, score: 2314400, change: 3.2 },
      { week: 4, score: 2242600, change: 0.5 },
      { week: 3, score: 2231400, change: 1.8 },
      { week: 2, score: 2191000, change: -2.3 },
      { week: 1, score: 2242600, change: 4.1 },
    ],
    "Q4 2024": [
      { week: 13, score: 2154200, change: 1.2 },
      { week: 12, score: 2128600, change: 3.7 },
      { week: 11, score: 2052600, change: -1.4 },
      { week: 10, score: 2082000, change: 2.5 },
      { week: 9, score: 2031200, change: 0.3 },
      { week: 8, score: 2025000, change: 4.2 },
      { week: 7, score: 1944000, change: -0.6 },
    ],
  };

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
      </div>

      {/* Expandable panel for additional content */}
      <div
        className={`fixed top-[70px] left-12 h-full bg-[#361352d0] shadow-lg z-30 transform transition-transform duration-300 ease-in-out ${
          activePanel ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "300px" }}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-[#e5daee44]">
            <h2 className="text-md font-semibold text-white">
              {activePanel === "history"
                ? "Score History"
                : ""}
            </h2>
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
                      {weeks.map((item) => (
                        <div 
                          key={`${quarter}-week-${item.week}`}
                          className="px-4 py-2 hover:bg-[#4c1d73] cursor-pointer transition-colors duration-200 flex items-center justify-between"
                          onClick={() => handleHistoryItemClick(quarter, item.week)}
                        >
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-3"></div>
                            <span className="text-sm text-gray-200">Week {item.week}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <span className="text-xs mr-2 font-medium">
                              ${(item.score / 1000000).toFixed(2)}M
                            </span>
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