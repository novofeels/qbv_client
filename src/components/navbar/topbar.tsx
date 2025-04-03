// src/app/components/Topbar.tsx
"use client";

import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Topbar = () => {
  // Get the current company ID from Redux
  const currentCompanyId = useSelector((state: RootState) => state.dashboard.currentCompanyId);
  
  // Determine which logo to display based on currentCompanyId
  const logoSrc = currentCompanyId === 'pinnacle' ? "/pinnaclepng.png" : "/ghost-cat.png";
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#280c3d] border-b border-gray500 text-white flex items-center p-4 shadow-xl">
      <div className="flex items-center">
        {/* App logo remains the same */}
        <Image src="/staticLogo.png" alt="Logo" width={30} height={30} className='mr-6'/>
        <Image src="/Line.svg" alt="line" width={1} height={1} style={{ filter: 'invert(1)' }}/>
        
        {/* Dynamically display company logo based on selected company */}
        <Image 
          src={logoSrc} 
          alt={currentCompanyId === 'pinnacle' ? "Pinnacle Logo" : "Ghost-Cat Logo"} 
          width={100} 
          height={25} 
          className='ml-2 mr-2'
        />
      </div>
    </header>
  );
};

export default Topbar;