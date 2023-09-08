import React, { useState, useEffect, useRef } from "react";
import { BsUpload, BsDownload } from "react-icons/bs";
import Link from "next/link";
import { toPng, toJpeg } from "html-to-image";
import { HexColorPicker, HexColorInput } from "react-colorful";

// components
import MacbookMockup from "@/components/MacbookMockup";
import IphoneMockup from "@/components/IphoneMockup";
import ImacMockup from "@/components/ImacMockup";

// icons
import { AiOutlineDelete } from "react-icons/ai";
import { IoPhonePortraitOutline, IoLaptopOutline } from "react-icons/io5";
import { MdOutlineDesktopMac, MdClose } from "react-icons/md";

// images
import mockup1 from "@/images/mockup1.png";
import mockup2 from "@/images/mockup2.png";

export default function Home() {
  const [gridOverlayVisible, setGridOverlayVisible] = useState(true);
  const [mockupContainerVisible, setMockupContainerVisible] = useState(true);
  const deviceData = [
    {
      id: 1,
      name: "Macbook",
      scale: 1,
      selected: false,
      mockupDisplay: mockup2,
      activelySelected: false,
      position: 2,
    },
    {
      id: 2,
      name: "iPhone",
      scale: 1,
      selected: false,
      mockupDisplay: mockup1,
      activelySelected: false,
      position: 3,
    },
    {
      id: 3,
      name: "iMac",
      scale: 1,
      selected: false,
      mockupDisplay: mockup2,
      activelySelected: false,
      position: 1,
    },
  ];
  const [devices, setDevices] = useState(deviceData);
  const [selectedDevices, setSelectedDevices] = useState(0);
  const [imageWidth, setImageWidth] = useState(1200);
  const [imageHeight, setImageHeight] = useState(1200);
  const [imageFormat, setImageFormat] = useState("png");
  const [backgroundColor, setBackgroundColor] = useState("#18181b"); // Initial color
  const [canvasBackgroundColor, setCanvasBackgroundColor] =
    useState("bg-zinc-900");
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [homebarVisible, setHomebarVisible] = useState(true);
  const [homebarColor, setHomebarColor] = useState("bg-white");

  function handleHomebarVisibility(e) {
    const checked = e.target.checked;
    if (checked) {
      setHomebarVisible(true);
      setHomebarColor("bg-white");
    } else {
      setHomebarVisible(false);
      setHomebarColor("");
    }
  }

  function toggleHomebar(e) {
    const checked = e.target.checked;
    if (checked) {
      setHomebarColor("bg-black");
    } else {
      setHomebarColor("bg-white");
    }
  }

  const toggleColorPicker = () => {
    setColorPickerVisible(!colorPickerVisible);
  };

  function handleColorChange(color) {
    console.log(color);
    setBackgroundColor(color);
    console.log(backgroundColor);
    setCanvasBackgroundColor(`bg-[${color}]`);
    console.log(canvasBackgroundColor);
  }

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

  // const containerRef = useRef(null);
  // const [bounds, setBounds] = useState({
  //   left: 0,
  //   top: 0,
  //   right: 0,
  //   bottom: 0,
  // });

  // useEffect(() => {
  //   const container = containerRef.current;

  //   if (container) {
  //     const containerRect = container.getBoundingClientRect();
  //     console.log(containerRect);
  //     setBounds({
  //       left: containerRect.left,
  //       top: containerRect.top,
  //       right: containerRect.left + containerRect.width,
  //       bottom: containerRect.top + containerRect.height,
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log(selectedDevices, "selectedDevices");
  // }, [selectedDevices]);

  const handleDeviceSelect = (id, selected) => {
    const selectedDevice = devices.find(
      (device) => device.selected && device.id !== id
    );

    // update selected devices count
    const selectedDevicesCurrent = selected
      ? selectedDevices + 1
      : selectedDevices - 1;

    setSelectedDevices(selectedDevicesCurrent);

    setDevices((prev) =>
      prev.map((device) => {
        if (device.id === id) {
          if (selected === false) {
            // Replace with default data from deviceData array
            return deviceData.find((defaultDevice) => defaultDevice.id === id);
          } else {
            console.log(device, selectedDevicesCurrent);
            return {
              ...device,
              selected: selected,
              activelySelected: selected,
              position: Math.abs(selectedDevicesCurrent - 4),
            };
          }
        } else if (selected === false) {
          console.log("getPosition", getPosition(device.position), device.name);
          return {
            ...device,
            activelySelected: device.id === selectedDevice?.id,
            position: getPosition(device.position),
          };
        } else {
          return {
            ...device,
            activelySelected: false,
          };
        }
      })
    );
    console.log(devices);
  };

  function getPosition(prevPosition) {
    console.log(prevPosition);
    if (prevPosition === 1) {
      console.log("1", prevPosition);
      return prevPosition + 1;
    } else if (prevPosition === 2) {
      console.log("2", prevPosition);
      // check in devices if there is any device with position 3 if yes then return 1 else return 2
      const device = devices.find((device) => device.position === 3);
      return device ? prevPosition : 3;
    } else {
      return prevPosition;
    }
  }

  const handleMockupSelect = (id, selected) => {
    // when one mockup is selected, all other mockups are deselected
    setDevices((prev) => {
      return prev.map((device) => {
        if (device.id === id) {
          return {
            ...device,
            activelySelected: selected,
          };
        } else {
          return {
            ...device,
            activelySelected: false,
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

  const handleDownload = async (e) => {
    e.preventDefault();
    const container = document.getElementById("mockup-container");
    const gridOverlay = document.getElementById("grid-overlay");

    // get height and width of the container

    if (!container || !gridOverlay) return;

    setGridOverlayVisible(false);
    setMockupContainerVisible(false);

    try {
      let dataUrl;

      switch (imageFormat) {
        case "png":
          dataUrl = await toPng(container, {
            height: imageHeight,
            width: imageWidth,
            canvasHeight: imageHeight,
            canvasWidth: imageWidth,
          });
          break;
        case "jpg":
          dataUrl = await toJpeg(container, {
            height: imageHeight,
            width: imageWidth,
            backgroundColor: backgroundColor,
          });
          break;
        default:
          throw new Error("Unsupported image format");
      }

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `mockup.${imageFormat}`;
      link.style.display = "none";
      document.body.appendChild(link);

      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating or downloading image:", error);
    } finally {
      setGridOverlayVisible(true);
      setMockupContainerVisible(true);
    }
  };

  function handlePositionChange(position, id) {
    // Find the device that will move to the selected position
    const deviceToMove = devices.find((device) => device.id === id);

    // Find the device that currently occupies the selected position
    const deviceAtPosition = devices.find(
      (device) => device.position === position
    );

    setDevices((prev) => {
      return prev.map((device) => {
        if (device.id === id) {
          return {
            ...device,
            position: position,
          };
        } else if (device.id === deviceAtPosition?.id) {
          // Move the device currently at the selected position to the position of the device being moved
          return {
            ...device,
            position: deviceToMove.position,
          };
        }
        return device;
      });
    });
  }

  return (
    <>
      <div
        className="fixed top-0 right-0 w-64 h-screen py-4 mr-2 hidden lg:block"
        aria-label="Sidebar"
      >
        <div className="relative h-full px-3 py-4 overflow-y-auto rounded-lg bg-gray-50 dark:bg-zinc-800">
          <div className="font-medium text-2xl flex items-center m-2 mb-8 text-gray-900 rounded-lg dark:text-white">
            Control Panel
          </div>
          <ul className="space-y-8 mx-2 font-medium overflow-hidden">
            <li>
              {/* make a grid of available mockups */}
              <label htmlFor="devices" className="text-xl">
                Devices
              </label>
              {/* a grid with two columns with available mockups */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                {devices.map((device) => (
                  <div
                    key={device.id}
                    className={`flex items-center justify-center w-full border h-full relative ${
                      device.activelySelected && "bg-blue-500/20"
                    } border-dashed rounded-lg text-gray-900 dark:text-white group transition-all  ${
                      device.selected
                        ? "border-blue-400"
                        : "border-gray-400 hover:border-green-300"
                    }`}
                  >
                    <button
                      className="flex items-center justify-center w-full h-full py-2"
                      onClick={() => {
                        if (device.selected === false) {
                          handleDeviceSelect(device.id, true);
                        } else {
                          handleMockupSelect(device.id, true);
                        }
                      }}
                    >
                      {device.name === "iMac" && (
                        <MdOutlineDesktopMac className="h-8 w-8" />
                      )}
                      {device.name === "Macbook" && (
                        <IoLaptopOutline className="h-8 w-8" />
                      )}
                      {device.name === "iPhone" && (
                        <IoPhonePortraitOutline className="h-8 w-8" />
                      )}
                    </button>
                    {device.selected && (
                      <button
                        className="absolute top-0 right-0 p-0.5 "
                        onClick={() => handleDeviceSelect(device.id, false)}
                      >
                        <AiOutlineDelete className="text-red-500 hover:text-red-800" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </li>
            {/* horizontal line */}
            {/* <div className="flex justify-center">
              <div className="border-b border-gray-400 w-7/12"></div>
            </div> */}
            {devices.map(
              (device) =>
                device.activelySelected && (
                  <div className="space-y-8" key={device.id}>
                    <li>
                      <div className="font-medium text-xl -my-2 text-gray-900 dark:text-white">
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
                    <li className="space-y-4">
                      {/* scale slider */}
                      <label htmlFor="scale" className="flex items-center">
                        <span className="mr-2">Scale</span>
                        <span className="text-gray-400 text-sm">
                          {device.scale}x
                        </span>
                      </label>
                      <span className="flex items-center text-gray-900 rounded-lg dark:text-white group">
                        <input
                          type="range"
                          id="scale"
                          className="w-[300px] mx-auto accent-blue-600 rounded-lg"
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

                    {selectedDevices > 1 && (
                      <li className="space-y-4">
                        <span className="mr-2">Position</span>
                        <div className="flex items-center space-x-4">
                          {selectedDevices >= 1 && (
                            <button
                              className={`flex items-center justify-center w-8 h-8 rounded-lg border border-dashed text-white hover:border-blue-400 group ${
                                device.position === 3
                                  ? "border-blue-400"
                                  : "border-gray-400"
                              }`}
                              onClick={() => handlePositionChange(3, device.id)}
                            >
                              1
                            </button>
                          )}
                          {selectedDevices >= 2 && (
                            <button
                              className={`flex items-center justify-center w-8 h-8 rounded-lg border border-dashed text-white hover:border-blue-400 group ${
                                device.position === 2
                                  ? "border-blue-400"
                                  : "border-gray-400"
                              }`}
                              onClick={() => handlePositionChange(2, device.id)}
                            >
                              2
                            </button>
                          )}
                          {selectedDevices >= 3 && (
                            <button
                              className={`flex items-center justify-center w-8 h-8 rounded-lg border border-dashed text-white hover:border-blue-400 group ${
                                device.position === 1
                                  ? "border-blue-400"
                                  : "border-gray-400"
                              }`}
                              onClick={() => handlePositionChange(1, device.id)}
                            >
                              3
                            </button>
                          )}
                        </div>
                      </li>
                    )}
                    {/* Homebar */}
                    {device.id === 2 && (
                      <li className="space-y-4">
                        <span className="mr-2">Homebar</span>
                        <label className="flex items-center cursor-pointer">
                          <div className="mr-3 text-sm">Off</div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              className="hidden"
                              onChange={handleHomebarVisibility}
                              checked={homebarVisible}
                            />
                            <div
                              className={`w-10 h-5 rounded-full shadow-inner ${
                                homebarVisible ? "bg-blue-500" : "bg-zinc-400"
                              }`}
                            ></div>
                            <div
                              className={`absolute w-5 h-5 bg-white rounded-full shadow inset-y-0 left-0 ${
                                homebarVisible ? "transform translate-x-5" : ""
                              }`}
                            ></div>
                          </div>
                          <div className="ml-3 text-sm">On</div>
                        </label>
                        {homebarVisible && (
                          <label className="flex items-center cursor-pointer">
                            <div className="mr-3 text-sm">White</div>
                            <div className="relative">
                              <input
                                type="checkbox"
                                className="hidden"
                                onChange={toggleHomebar}
                                checked={homebarColor === "bg-black"}
                              />
                              <div
                                className={`w-10 h-5 rounded-full shadow-inner ${
                                  homebarColor === "bg-black"
                                    ? "bg-blue-500"
                                    : "bg-zinc-400"
                                }`}
                              ></div>
                              <div
                                className={`absolute w-5 h-5 bg-white rounded-full shadow inset-y-0 left-0 ${
                                  homebarColor === "bg-black"
                                    ? "transform translate-x-5"
                                    : ""
                                }`}
                              ></div>
                            </div>
                            <div className="ml-3 text-sm">Black</div>
                          </label>
                        )}
                      </li>
                    )}
                  </div>
                )
            )}
          </ul>
          <form
            className="bottom-0 absolute w-full flex flex-col border border-dashed border-blue-600 bg-zinc-900/80 rounded-lg justify-center right-0"
            onSubmit={handleDownload}
          >
            <div className="mx-5 mt-4">
              <span>Image Settings</span>
            </div>
            <div className="flex items-center space-x-4 mx-5 mt-4">
              <div className="flex items-center">
                <label htmlFor="width" className="mr-2 text-sm">
                  Width
                </label>
                <input
                  type="number"
                  min={0}
                  id="width"
                  className="w-full px-2 py-0.5 text-sm bg-zinc-600 rounded-md"
                  placeholder="px"
                  value={imageWidth}
                  onChange={(event) => setImageWidth(event.target.value)}
                  required
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="height" className="mr-2 text-sm">
                  Height
                </label>
                <input
                  type="number"
                  min={0}
                  id="height"
                  className="w-full px-2 text-sm py-0.5 bg-zinc-600 rounded-md"
                  placeholder="px"
                  value={imageHeight}
                  onChange={(event) => setImageHeight(event.target.value)}
                  required
                />
              </div>
            </div>
            {/* a select dropdown with available formats */}
            <div className="flex items-center space-x-4 mx-5 mt-4">
              <div className="flex items-center">
                <label htmlFor="format" className="mr-2 text-sm">
                  Format
                </label>
                <select
                  name="format"
                  id="format"
                  className="w-full px-2 py-0.5 text-sm bg-zinc-600 rounded-md"
                  value={imageFormat}
                  onChange={(event) => setImageFormat(event.target.value)}
                >
                  <option value="png">png</option>
                  <option value="jpg">jpeg</option>
                </select>
              </div>
            </div>

            {/* <div className="flex items-center space-x-4 mx-5 mt-4">
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={toggleColorPicker}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Change Background Color
                </button>
              </div>
            </div> */}
            {imageFormat === "jpg" && (
              <div className="flex items-center space-x-4 mx-5 mt-4">
                <div className="flex items-center">
                  <label htmlFor="format" className="mr-2 text-sm">
                    Background&nbsp;color
                  </label>
                  <button
                    type="button"
                    className="w-full px-4 py-0.5 text-sm bg-zinc-600 rounded-md"
                    onClick={toggleColorPicker}
                  >
                    {backgroundColor}
                  </button>
                </div>
              </div>
            )}

            <button
              className="py-2 mt-4 flex items-center justify-center text-white border-t bg-blue-900/60 border-blue-700 rounded-b-lg hover:border-dashed disabled:bg-blue-900/40 disabled:hover:border-solid disabled:cursor-not-allowed"
              disabled={selectedDevices === 0}
            >
              <BsDownload className="inline-flex mr-2" />
              Download
            </button>
          </form>
        </div>
      </div>

      <div
        className="p-4 lg:mr-64 h-screen relative"
        id="mockupland"
        // ref={containerRef}
      >
        <div
          className={`h-full w-full p-4 ${
            mockupContainerVisible
              ? `border-2 border-dashed border-gray-700`
              : "bg-transparent"
          } rounded-lg overflow-hidden relative`}
          id="mockup-container"
          // if mockupContainerVisible is false, make background transparent
          style={{
            backgroundColor: mockupContainerVisible
              ? backgroundColor
              : "transparent",
          }}
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
          {/* make the color picker visible above all the content */}
          {mockupContainerVisible && colorPickerVisible && (
            <div className="absolute bottom-0 right-0 p-4 z-50">
              <div className=" top-0 left-0 w-full h-full" />
              <div className=" top-0 left-0 border border-dashed border-blue-600 bg-zinc-900 rounded-lg p-6">
                {/* delete button in the top right corner */}
                <button
                  className="absolute top-2 right-2 p-0.5 bg-zinc-800 border border-dashed border-blue-500 rounded-full"
                  onClick={toggleColorPicker}
                >
                  <MdClose className="h-5 w-5 text-red-500 hover:text-red-800" />
                </button>
                <HexColorPicker
                  color={backgroundColor}
                  onChange={handleColorChange}
                />
                <HexColorInput
                  color={backgroundColor}
                  onChange={handleColorChange}
                  className="w-full px-4 py-0.5 mt-4 text-sm bg-zinc-600 rounded-md"
                />
              </div>
            </div>
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

          {/* in the center of the screen, write to see this page open it on a bigger screen */}
          <div className="absolute inset-0 z-50 flex items-center justify-center text-gray-400 text-2xl tracking-wider mx-3 font-mono font-bold lg:hidden">
            <div className="text-center">
              <div className="text-4xl">👋</div>
              <div>Open this page on a bigger screen to see the mockups 🖥️</div>
            </div>
          </div>

          <div
            className="hidden lg:block relative"
            onClick={() => handleMockupSelect(3, true)}
            style={{ position: "relative", zIndex: devices[2].position }}
          >
            <ImacMockup
              scale={devices[2].scale}
              image={devices[2].mockupDisplay}
              selected={devices[2].selected}
            />
          </div>
          <div
            className="hidden lg:block relative"
            onClick={() => handleMockupSelect(1, true)}
            style={{ position: "relative", zIndex: devices[0].position }}
          >
            <MacbookMockup
              scale={devices[0].scale}
              image={devices[0].mockupDisplay}
              selected={devices[0].selected}
            />
          </div>
          <div
            className="hidden lg:block relative"
            onClick={() => handleMockupSelect(2, true)}
            style={{ position: "relative", zIndex: devices[1].position }}
          >
            <IphoneMockup
              scale={devices[1].scale}
              image={devices[1].mockupDisplay}
              selected={devices[1].selected}
              homebarColor={homebarColor}
            />
          </div>
        </div>
      </div>
    </>
  );
}
