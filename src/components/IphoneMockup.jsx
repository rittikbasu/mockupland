import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import Image from "next/image";
import mockup1 from "@/images/mockup1.png";
import { RiDragMove2Fill } from "react-icons/ri";

export default function IphoneMockup({ scale }) {
  const dragRef = useRef(null);
  const draggableRef = useRef(null);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });

  useEffect(() => {
    const container = dragRef.current;

    if (container) {
      const containerRect = container.getBoundingClientRect();
      console.log(containerRect);
      setBounds({
        left: containerRect.left,
        top: containerRect.top,
        right: containerRect.left + containerRect.width,
        bottom: containerRect.top + containerRect.height,
      });
    }
  }, []);
  const [isDraggable, setIsDraggable] = useState(true);
  const handleMouseDown = () => {
    // toggle isDraggable using previous state
    setIsDraggable((isDraggable) => !isDraggable);
    console.log(isDraggable);
  };

  const handleStop = () => {
    console.log(isDraggable);
    setIsDraggable(true);
  };
  return (
    <main className="">
      <Draggable
        nodeRef={draggableRef}
        disabled={isDraggable}
        // bounds={{ top: -406, left: -364, right: 364, bottom: 34 }}
        onMouseDown={handleMouseDown}
        // onStop={handleStop}
        // handle=".drag-handle"
      >
        <div
          className="flex cursor-grab w-[300px] active:cursor-grabbing items-center justify-center draggable-element"
          ref={draggableRef}
        >
          <div
            className="rounded-[3rem] border border-zinc-400 bg-gray-800"
            style={{ transform: `scale(${scale})` }}
            ref={dragRef}
          >
            <div className="relative mx-auto border-black dark:border-black bg-black border-[10px] rounded-[3rem] h-[600px] w-[300px] shadow-xl">
              <div className="w-[78px] h-[22px] flex items-center bg-black top-1 rounded-full left-1/2 -translate-x-1/2 absolute">
                <div className="w-[8px] h-[8px] flex items-center justify-center bg-zinc-900/80 rounded-full absolute right-2">
                  <div className="w-[4px] h-[4px] bg-blue-950/80 rounded-full absolute">
                    <div className="w-[2px] h-[2px] bg-white/10 rounded-full absolute"></div>
                  </div>
                </div>
              </div>
              <div className="h-[24px] w-[3px] border-[0.5px] border-zinc-500 bg-stone-800 absolute -left-[14px] top-[80px] rounded-l-lg"></div>
              <div className="h-[46px] w-[3px] border-[0.5px] border-zinc-500 bg-stone-800 absolute -left-[14px] top-[124px] rounded-l-lg"></div>
              <div className="h-[46px] w-[3px] border-[0.5px] border-zinc-500 bg-stone-800 absolute -left-[14px] top-[178px] rounded-l-lg"></div>
              <div className="h-[64px] w-[3px] border-[0.5px] border-zinc-500 bg-stone-800 absolute -right-[14px] top-[142px] rounded-r-lg"></div>
              {/* create the bottom line on iphone */}
              <div className="h-[5px] left-1/2 -translate-x-1/2 w-4/12 border-[0.5px] border-zinc-300/80 bg-zinc-200 absolute bottom-[4px] rounded-lg"></div>
              <div className="rounded-[2.3rem] mx-auto select-none overflow-hidden pointer-events-none w-[282px] h-[582px] bg-white dark:bg-black">
                <Image
                  src={mockup1}
                  className=" w-[282px] h-[582px] pointer-events-none"
                  alt=""
                />
              </div>
            </div>
          </div>
          {/* drag svg icon hand grab */}
          {/* <div className="drag-handle mt-2">
            <RiDragMove2Fill className="h-6 w-6 cursor-grab active:cursor-grabbing fill-zinc-300" />
          </div> */}
        </div>
      </Draggable>
    </main>
  );
}
