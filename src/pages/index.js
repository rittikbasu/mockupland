import React, { useState } from "react";
import MacbookMockup from "@/components/MacbookMockup";
import IphoneMockup from "@/components/IphoneMockup";

export default function Home() {
  const [scale, setScale] = useState(1);
  const [macbookScale, setMacbookScale] = useState(1);
  const handleScaleChange = (event) => {
    setMacbookScale(parseFloat(event.target.value));
  };
  return (
    <>
      <input
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={macbookScale}
        onChange={handleScaleChange}
        className="w-[300px] mx-auto mb-4"
      />
      <MacbookMockup scale={macbookScale} />
      <IphoneMockup scale={scale} setScale={setScale} />
    </>
  );
}
