// src/app/components/Topbar.tsx
"use client";

import React from "react";
import Image from "next/image";

const Topbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#280c3d] border-b border-gray500 text-white flex items-center p-4 shadow-xl">
      <div className="flex items-center">
        {/* Replace '/logo.png' with your actual logo path */}
        <Image src="/qbv_client/staticLogo.png" alt="Logo" width={30} height={30} className='mr-6'/>
        <Image src="/qbv_client/Line.svg" alt="line" width={1} height={1} style={{ filter: 'invert(1)' }}/>
        <Image src="/qbv_client/pinnaclepng.png" alt="Logo" width={100} height={25} className='ml-2 mr-2'/>


      </div>

    </header>
  );
};

export default Topbar;
