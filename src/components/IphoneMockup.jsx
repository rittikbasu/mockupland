import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import Image from "next/image";

export default function IphoneMockup({ scale, selected, image, homebarColor }) {
  const draggableRef = useRef(null);

  const containerWidth = 300 * scale;
  const containerHeight = 600 * scale;

  return (
    <main className={!selected ? "hidden" : ""}>
      <Draggable
        nodeRef={draggableRef}
        // bounds={{ top: -406, left: -364, right: 364, bottom: 34 }}
        // handle=".drag-handle"
        defaultPosition={{ x: 250, y: 250 }}
      >
        <div
          className="flex cursor-grab w-[150px] active:cursor-grabbing items-center justify-center draggable-element"
          style={{
            transform: `scale(${scale})`,
            width: `${containerWidth}px`, // Set the container width based on the scaled mockup
            height: `${containerHeight}px`, // Set the container height based on the scaled mockup
          }}
          ref={draggableRef}
        >
          <div
            className="rounded-[1.5rem] border-[1.5px] border-zinc-400 bg-gray-800"
            style={{ transform: `scale(${scale})` }}
          >
            <div className="relative mx-auto border-black dark:border-black bg-black border-[4px] rounded-[1.6rem] h-[295px] w-[143px] shadow-xl">
              <div className="w-[40px] h-[12px] flex items-center bg-black top-[0.2rem] rounded-full left-1/2 -translate-x-1/2 absolute">
                <div className="w-[4px] h-[4px] flex items-center justify-center bg-zinc-900/80 rounded-full absolute right-1.5">
                  <div className="w-[2px] h-[2px] bg-blue-950/80 rounded-full absolute">
                    <div className="w-[1px] h-[1px] bg-white/10 rounded-full absolute"></div>
                  </div>
                </div>
              </div>

              <div className="h-[14px] w-[1.5px] border-l-[1.5px] border-y-[1.5px] border-zinc-700 bg-zinc-900 shadow-inner shadow-zinc-900 absolute -left-[7.1px] top-[45px] rounded-full"></div>
              <div className="h-[23px] w-[1.5px] border-l-[1.5px] border-y-[1.5px] border-zinc-700 bg-zinc-900 shadow-inner shadow-zinc-800 absolute -left-[7.1px] top-[72px] rounded-full"></div>
              <div className="h-[23px] w-[1.5px] border-l-[1.5px] border-y-[1.5px] border-zinc-700 bg-zinc-900 shadow-inner shadow-zinc-800 absolute -left-[7.1px] top-[102px] rounded-full"></div>
              <div className="h-[32px] w-[1.5px] border-r-[1.5px] border-y-[1.5px] border-zinc-700 bg-zinc-900 shadow-inner shadow-zinc-800 absolute -right-[7.3px] top-[85px] rounded-full"></div>
              {/* create the bottom line on iphone */}
              <div
                className={`h-[2.5px] left-1/2 -translate-x-1/2 w-4/12 ${homebarColor} absolute bottom-[4px] rounded-lg`}
              ></div>
              <div className="rounded-[1.2rem] mx-auto select-none overflow-hidden pointer-events-none w-[135px] h-[287px] bg-black">
                <Image
                  src={image}
                  className=" w-fit pointer-events-none"
                  alt=""
                  height={287}
                  width={135}
                />
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    </main>
  );
}
