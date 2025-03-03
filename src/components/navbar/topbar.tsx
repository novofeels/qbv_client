// src/app/components/Topbar.tsx
"use client";

import React from "react";
import Image from "next/image";

const Topbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#280c3d] border-b border-gray500 text-white flex items-center p-4 shadow-md">
      <div className="flex items-center">
        {/* Replace '/logo.png' with your actual logo path */}
        <Image src="/staticLogo.png" alt="Logo" width={30} height={30} className='mr-6'/>
        <Image src="/Line.svg" alt="line" width={1} height={1} style={{ filter: 'invert(1)' }}/>
        <Image src="/pinnaclepng.png" alt="Logo" width={100} height={25} className='ml-2 mr-2'/>


      </div>

    </header>
  );
};

export default Topbar;
