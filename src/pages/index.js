import React, { useState, useEffect, useRef } from "react";
import { BsUpload, BsDownload, BsGear } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { toPng } from "html-to-image";

import MacbookMockup from "@/components/MacbookMockup";
import IphoneMockup from "@/components/IphoneMockup";
import ImacMockup from "@/components/ImacMockup";

// images
import macbook from "@/images/macbook.png";
import iphone from "@/images/iphone.png";
import imac from "@/images/imac.png";
import mockup1 from "@/images/mockup1.png";
import mockup2 from "@/images/mockup2.png";

export default function Home() {
  const [gridOverlayVisible, setGridOverlayVisible] = useState(true);
  const [mockupContainerVisible, setMockupContainerVisible] = useState(true);
  const deviceData = [
    {
      id: 1,
      name: "Macbook",
      image: macbook,
      scale: 1,
      selected: false,
      mockupDisplay: mockup2,
      mockupSelected: false,
    },
    {
      id: 2,
      name: "iPhone",
      image: iphone,
      scale: 1,
      selected: false,
      mockupDisplay: mockup1,
      mockupSelected: false,
    },
    {
      id: 3,
      name: "iMac",
      image: imac,
      scale: 1,
      selected: false,
      mockupDisplay: mockup2,
      mockupSelected: false,
    },
  ];
  const [devices, setDevices] = useState(deviceData);

  const handleScaleChange = (event, id) => {
    const scale = event.target.value;

    setDevices((prev) => {
      return prev.map((device) => {
        if (device.id === Number(id)) {
          return {
            ...device,
            scale: scale,
          };
        }
        return device;
      });
    });
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

  const handleDeviceSelect = (id, selected) => {
    const selectedDevice = devices.find(
      (device) => device.selected && device.id !== id
    );

    setDevices((prev) =>
      prev.map((device) => {
        if (device.id === id) {
          if (selected === false) {
            // Replace with default data from deviceData array
            return deviceData.find((defaultDevice) => defaultDevice.id === id);
          } else {
            return {
              ...device,
              selected: selected,
              mockupSelected: selected,
            };
          }
        } else if (device.id === selectedDevice?.id && selected === false) {
          return {
            ...device,
            mockupSelected: true,
          };
        } else {
          return {
            ...device,
            mockupSelected: false,
          };
        }
      })
    );
  };

  const handleMockupSelect = (id, selected) => {
    // when one mockup is selected, all other mockups are deselected
    setDevices((prev) => {
      return prev.map((device) => {
        if (device.id === id) {
          return {
            ...device,
            mockupSelected: selected,
          };
        } else {
          return {
            ...device,
            mockupSelected: false,
          };
        }
      });
    });
  };

  const handleImageUpload = (event, id) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setDevices((prev) => {
        return prev.map((device) => {
          if (device.id === id) {
            return {
              ...device,
              mockupDisplay: imageUrl,
            };
          }
          return device;
        });
      });
    }
  };

  const handleDownload = async () => {
    const container = document.getElementById("mockup-container");
    const gridOverlay = document.getElementById("grid-overlay");

    if (container && gridOverlay) {
      setGridOverlayVisible(false);
      setMockupContainerVisible(false);

      try {
        const dataUrl = await toPng(container);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "mockup.png";
        link.click();
      } catch (error) {
        console.error("Error generating image:", error);
      } finally {
        setGridOverlayVisible(true);
        setMockupContainerVisible(true);
      }
    }
  };

  return (
    <>
      <div
        className="fixed top-0 right-0 w-64 h-screen py-4 mr-2"
        aria-label="Sidebar"
      >
        <div className="relative h-full px-3 py-4 overflow-y-auto rounded-lg bg-gray-50 dark:bg-zinc-800">
          <div className="font-medium text-2xl flex items-center m-2 mb-12 text-gray-900 rounded-lg dark:text-white">
            Control Panel
          </div>
          <ul className="space-y-8 mx-2 font-medium overflow-hidden">
            <li>
              {/* make a grid of available mockups */}
              <label htmlFor="devices" className="text-xl">
                Devices
              </label>
              {/* a grid with two columns with available mockups */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {devices.map((device) => (
                  <div
                    key={device.id}
                    className={`flex items-center justify-center w-full border h-full relative ${
                      device.mockupSelected && "bg-blue-500/20"
                    } border-dashed rounded-lg py-2 text-gray-900 dark:text-white group ${
                      device.selected
                        ? "border-blue-400"
                        : "border-gray-400 hover:border-green-300"
                    }`}
                  >
                    <button
                      className="flex items-center justify-center select-none"
                      onClick={() => {
                        if (device.selected === false) {
                          handleDeviceSelect(device.id, true);
                        } else {
                          handleMockupSelect(device.id, true);
                        }
                      }}
                    >
                      <Image
                        src={device.image}
                        alt={device.name}
                        width={80}
                        height={80}
                        className="rounded-lg"
                      />
                    </button>
                    {device.selected && (
                      <button
                        className="absolute top-0 right-0 p-0.5"
                        onClick={() => handleDeviceSelect(device.id, false)}
                      >
                        <AiOutlineDelete className="text-red-500" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </li>
            {/* horizontal line */}
            <div className="border-b border-gray-400"></div>
            {devices.map(
              (device) =>
                device.mockupSelected && (
                  <div className="space-y-8" key={device.id}>
                    <li key={device.id}>
                      <div className="font-medium text-xl text-gray-900 dark:text-white">
                        {device.name}
                      </div>
                    </li>
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
                          onChange={(event) =>
                            handleImageUpload(event, device.id)
                          }
                        />
                      </span>
                    </li>
                    <li>
                      {/* scale slider */}
                      <label htmlFor="scale" className="flex items-center">
                        <span className="mr-2">Scale</span>
                        <span className="text-gray-400 text-sm">
                          {device.scale}x
                        </span>
                      </label>
                      <span className="flex items-center space-y-2 py-2 text-gray-900 rounded-lg dark:text-white group">
                        <input
                          type="range"
                          id="scale"
                          className="w-[300px] mx-auto accent-blue-600 h-1 rounded-lg"
                          min="0.5"
                          max="2"
                          step="0.1"
                          value={device.scale}
                          onChange={(event) =>
                            handleScaleChange(event, device.id)
                          }
                        />
                      </span>
                    </li>
                  </div>
                )
            )}
          </ul>
          <div className="bottom-0 absolute w-full flex flex-col py-8 justify-center right-0">
            <div className="border-b border-gray-400 mx-5"></div>
            <button
              className="mx-5 py-2 mt-8 flex items-center justify-center text-white border border-blue-500 rounded-lg hover:border-dashed"
              onClick={handleDownload}
            >
              <BsDownload className="inline-flex mr-2" />
              Download
            </button>
          </div>
        </div>
      </div>

      <div
        className="p-4 sm:mr-64 h-screen relative"
        id="mockupland"
        ref={containerRef}
      >
        <div
          className={`h-full w-full p-4 ${
            mockupContainerVisible
              ? "border-2 bg-zinc-900 border-dashed border-gray-700"
              : "bg-transparent"
          } rounded-lg overflow-hidden relative`}
          id="mockup-container"
        >
          {mockupContainerVisible && (
            <div className="absolute top-0 left-0 p-4 font-mono text-blue-500 text-2xl font-bold">
              Mockupland
            </div>
          )}
          {mockupContainerVisible && (
            <Link
              className="absolute bottom-0 right-0 p-4 font-mono text-blue-500 text-sm font-bold hover:underline"
              href="https://rittik.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              Made with ❤️ by Rittik Basu
            </Link>
          )}
          {/* Overlay with grid lines */}
          {gridOverlayVisible && (
            <div
              className="absolute inset-0 z-10 grid grid-cols-5 grid-rows-5 gap-0 pointer-events-none"
              id="grid-overlay"
            >
              {Array.from({ length: 25 }, (_, index) => (
                <div
                  key={index}
                  className="border-dashed border border-gray-200 dark:border-gray-700/40"
                ></div>
              ))}
            </div>
          )}

          <div className="" onClick={() => handleMockupSelect(3, true)}>
            <ImacMockup
              scale={devices[2].scale}
              image={devices[2].mockupDisplay}
              selected={devices[2].selected}
            />
          </div>
          <div className="" onClick={() => handleMockupSelect(1, true)}>
            <MacbookMockup
              scale={devices[0].scale}
              image={devices[0].mockupDisplay}
              selected={devices[0].selected}
            />
          </div>
          <div className="" onClick={() => handleMockupSelect(2, true)}>
            <IphoneMockup
              scale={devices[1].scale}
              image={devices[1].mockupDisplay}
              selected={devices[1].selected}
            />
          </div>
        </div>
      </div>
    </>
  );
}
