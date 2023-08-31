import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import Image from "next/image";
import { BsApple } from "react-icons/bs";

export default function ImacMockup({ scale, image, selected }) {
  const draggableRef = useRef(null);
  const scaledWidth = 512 * scale;
  const scaledHeight = 294 * scale;

  return (
    <main
      className={`${
        !selected
          ? "hidden"
          : "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      }`}
      style={{
        transform: `scale(${scale})`,
        width: `${scaledWidth}px`, // Set the container width based on the scaled mockup
        height: `${scaledHeight}px`, // Set the container height based on the scaled mockup
      }}
    >
      <Draggable
        //   nodeRef={draggableRef}
        defaultPosition={{ x: -250, y: -250 }}
        bounds="#mockupland"
      >
        <div className="absolute mx-auto cursor-grab active:cursor-grabbing max-w-[512px]">
          <div
            className=" border-black bg-gray-800 border-[16px] rounded-t-xl h-[294px] w-[512px]"
            ref={draggableRef}
          >
            <div className="overflow-hidden h-[140px] md:h-[262px]">
              <Image
                src={image}
                className="h-[140px] md:h-[262px] pointer-events-none"
                height={262}
                width={480}
                alt=""
              />
            </div>
          </div>
          <div className="relative mx-auto bg-gradient-to-r from-zinc-500 via-zinc-300 to-zinc-500 shadow-zinc-700 rounded-b-xl h-[42px] max-w-[512px]">
            <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-[8px] h-[8px] md:w-[16px] md:h-[16px] rounded-full">
              <BsApple className="h-6 w-6 text-zinc-900/80 fill-current absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className=" mx-auto bg-gradient-to-r from-zinc-500 via-zinc-300 to-zinc-500 h-[95px] w-[142px]"></div>
        </div>
      </Draggable>
    </main>
  );
}
