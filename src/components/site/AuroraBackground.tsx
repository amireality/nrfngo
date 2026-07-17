import React from "react";

export const AuroraBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-black">
    <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[60%] bg-[#556b2f] mix-blend-screen blur-[100px] md:blur-[160px] opacity-90 rounded-[100%] transform -rotate-12 animate-blob" />
    <div className="absolute top-[30%] right-[-10%] w-[60%] h-[70%] bg-[#8f9f6e] mix-blend-screen blur-[100px] md:blur-[160px] opacity-70 rounded-[100%] transform rotate-12 animate-blob animation-delay-2000" />
    <div className="absolute bottom-[-20%] left-[20%] w-[80%] h-[60%] bg-[#3a4b1f] mix-blend-screen blur-[100px] md:blur-[160px] opacity-80 rounded-[100%] transform rotate-6 animate-blob animation-delay-4000" />
  </div>
);
