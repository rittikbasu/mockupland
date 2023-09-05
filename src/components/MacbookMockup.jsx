import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import Image from "next/image";
import { RiDragMove2Fill } from "react-icons/ri";

export default function MacbookMockup({ scale, image, selected }) {
  const draggableRef = useRef(null);
  return (
    <main
      className={!selected ? "hidden" : ""}
      style={{ transform: `scale(${scale})` }}
    >
      <Draggable
        nodeRef={draggableRef}
        //   handle=".macbook-drag-handle"
        // defaultPosition={{ x: 500, y: 300 }}
      >
        <div
          className="max-w-[597px] cursor-grab active:cursor-grabbing"
          ref={draggableRef}
        >
          <div className="flex h-full items-center justify-center">
            <div className="border-t border-x border-zinc-500 rounded-t-2xl bg-gray-800">
              <div className="relative mx-auto border-black bg-black border-[8px] rounded-t-2xl h-[172px] max-w-[301px] md:h-[350px] md:max-w-[512px]">
                <div className="w-[60px] h-[10px] bg-black top-0 rounded-b-[0.25rem] left-1/2 -translate-x-1/2 absolute flex items-center justify-center">
                  <div className="w-[8px] h-[8px] flex items-center justify-center bg-zinc-900/70 rounded-full absolute bottom-1">
                    <div className="w-[4px] h-[4px] bg-blue-950/60 rounded-full absolute">
                      <div className="w-[2px] h-[2px] bg-white/10 rounded-full absolute"></div>
                    </div>
                  </div>
                </div>
                <div className="rounded-t overflow-hidden h-[156px] md:h-[324px] w-[480px] bg-black">
                  <Image
                    src={image}
                    className="pointer-events-none h-fit rounded-t-lg"
                    alt=""
                    height={324}
                    width={480}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="relative mx-auto bg-gradient-to-r from-zinc-400 via-zinc-300 to-zinc-400 shadow-inner shadow-zinc-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 shadow-inner shadow-zinc-700 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-zinc-500/40"></div>
            <div className="absolute left-6 -bottom-[0.14rem] rounded-b-xl w-[8px] h-[8px] md:w-[30px] md:h-[2px] bg-zinc-600"></div>
            <div className="absolute right-8 -bottom-[0.14rem] rounded-b-xl w-[8px] h-[8px] md:w-[30px] md:h-[2px] bg-zinc-600"></div>
          </div>
          {/* <div className="macbook-drag-handle mt-2">
            <RiDragMove2Fill className="h-6 w-6 cursor-grab active:cursor-grabbing fill-zinc-300" />
          </div> */}
        </div>
      </Draggable>
    </main>
  );
}
