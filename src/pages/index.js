import React, { useState, useEffect, useRef } from "react";
import MacbookMockup from "@/components/MacbookMockup";
import IphoneMockup from "@/components/IphoneMockup";
import { BsUpload } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import macbook from "@/images/macbook.png";
import iphone from "@/images/iphone.png";
import Image from "next/image";
import mockup2 from "@/images/mockup2.png";

export default function Home() {
  const [iphoneScale, setIphoneScale] = useState(1);
  const [macbookScale, setMacbookScale] = useState(1);
  const handleScaleChange = (event) => {
    const { id, value } = event.target;
    if (id === "iphoneScale") {
      setIphoneScale(value);
    } else {
      setMacbookScale(value);
    }
  };
  const containerRef = useRef(null);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });

  useEffect(() => {
    const container = containerRef.current;

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
  const [selectedImage, setSelectedImage] = useState(mockup2);

  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setSelectedImage(imageUrl);
      console.log(imageUrl, selectedImage);
    }
  };
  return (
    <>
      {/* <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
      </button> */}

      <aside
        id="default-sidebar"
        className="fixed top-0 right-0 w-64 h-screen py-4 mr-2"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto rounded-lg bg-gray-50 dark:bg-zinc-800">
          <div className="font-medium text-2xl flex items-center m-2 mb-12 text-gray-900 rounded-lg dark:text-white">
            Control Panel
          </div>
          <ul className="space-y-8 mx-2 font-medium overflow-hidden">
            <li>
              {/* upload image */}
              <span className="flex border border-dashed border-gray-400 items-center py-2 text-gray-900 rounded-lg dark:text-white hover:border-blue-400 group">
                <label
                  htmlFor="upload"
                  className="flex items-center justify-center w-full h-full cursor-pointer"
                >
                  <BsUpload className="mr-2 -ml-2 text-gray-300" />
                  <span>Upload</span>
                </label>
                <input
                  type="file"
                  id="upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </span>
            </li>
            <li>
              {/* make a grid of available mockups */}
              <label htmlFor="availableMockups" className="">
                Available Mockups
              </label>
              {/* a grid with two columns with available mockups */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center justify-center w-full h-full cursor-pointer border border-gray-400 border-dashed p-1 rounded-lg hover:border-blue-400 relative">
                  <div className="absolute top-0 right-0 p-0.5">
                    <AiOutlineDelete className="text-red-500" />
                  </div>
                  <Image src={macbook} alt="macbook" width={100} height={100} />
                  {/* show a delete icon on top right corner */}
                </div>
                <div className="flex items-center justify-center w-full h-full cursor-pointer border border-gray-400 border-dashed p-1 rounded-lg hover:border-blue-400">
                  <Image
                    src={iphone}
                    alt="iphone"
                    width={100}
                    height={100}
                    className=""
                  />
                </div>
                <div className="flex items-center justify-center w-full h-full cursor-pointer border border-gray-400 border-dashed p-1 rounded-lg hover:border-blue-400">
                  <Image src={macbook} alt="macbook" width={100} height={100} />
                </div>
              </div>
            </li>
            <li>
              <label htmlFor="macbookScale" className="">
                Macbook Scale
              </label>
              <span className="flex items-center space-y-2 py-2 text-gray-900 rounded-lg dark:text-white group">
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={macbookScale}
                  onChange={handleScaleChange}
                  id="macbookScale"
                  className="w-[300px] mx-auto appearance-none bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 h-1 rounded-lg"
                />
              </span>
            </li>
            <li>
              <label htmlFor="iphoneScale" className="">
                iPhone Scale
              </label>
              <span className="flex space-y-2 items-center py-2 text-gray-900 rounded-lg dark:text-white">
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={iphoneScale}
                  onChange={handleScaleChange}
                  id="iphoneScale"
                  className="w-[300px] mx-auto appearance-non bg-gradient-to-r disabled:from-gray-400 from-blue-300 via-blue-400 to-blue-500 h-1 rounded-lg"
                  disabled
                />
              </span>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:mr-64 h-screen" id="mockupland" ref={containerRef}>
        <div className="justify-center items-center h-full p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 overflow-hidden">
          <MacbookMockup scale={macbookScale} image={selectedImage} />
          <IphoneMockup scale={iphoneScale} />
        </div>
      </div>
    </>
  );
}
