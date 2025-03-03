"use client";

import React, { useState } from "react";
import { FaHistory, FaArchive } from "react-icons/fa";



const Sidebar = () => {
  // 'activePanel' tracks which panel (if any) is open.
  const [activePanel, setActivePanel] = useState<string | null>(null);

  

  
  // Get conversation data from Redux






  const handleIconClick = (panel: string) => {
    // Toggle panel: if already active, close it; otherwise, open it.
    setActivePanel((prev) => (prev === panel ? null : panel));
  };











  

  return (
    <>
      {/* Static sidebar: fixed narrow column with icons */}
      <div
        className="fixed left-0 h-full w-12 bg-[#280c3d] text-white flex flex-col items-center py-4 space-y-4 z-40"
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
          

        </div>
      </div>





    </>
  );
};

export default Sidebar;