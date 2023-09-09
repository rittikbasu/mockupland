import React, { useState, useEffect, useRef } from "react";
import { BsUpload } from "react-icons/bs";
import Link from "next/link";

// components
import MacbookMockup from "@/components/MacbookMockup";
import IphoneMockup from "@/components/IphoneMockup";
import ImacMockup from "@/components/ImacMockup";
import DeviceButton from "@/components/DeviceButton";
import ImageSettings from "@/components/ImageSettings";
import ColorPickerModal from "@/components/ColorPickerModal";
import HomebarControl from "@/components/HomebarControl";

// data
import { deviceData } from "@/data/deviceData";

export default function Home() {
  const [gridOverlayVisible, setGridOverlayVisible] = useState(true);
  const [mockupContainerVisible, setMockupContainerVisible] = useState(true);
  const [devices, setDevices] = useState(deviceData);
  const [selectedDevices, setSelectedDevices] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("#18181b"); // Initial color
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

  const toggleColorPicker = () => {
    setColorPickerVisible(!colorPickerVisible);
  };

  function handleColorChange(color) {
    console.log(color);
    setBackgroundColor(color);
    console.log(backgroundColor);
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
                  <DeviceButton
                    key={device.id}
                    device={device}
                    handleDeviceSelect={handleDeviceSelect}
                    handleMockupSelect={handleMockupSelect}
                  />
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
                        <HomebarControl
                          homebarVisible={homebarVisible}
                          handleHomebarVisibility={handleHomebarVisibility}
                          homebarColor={homebarColor}
                          setHomebarColor={setHomebarColor}
                          // toggleHomebar={toggleHomebar}
                        />
                      </li>
                    )}
                  </div>
                )
            )}
          </ul>
          <ImageSettings
            backgroundColor={backgroundColor}
            toggleColorPicker={toggleColorPicker}
            selectedDevices={selectedDevices}
            setGridOverlayVisible={setGridOverlayVisible}
            setMockupContainerVisible={setMockupContainerVisible}
          />
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
          {mockupContainerVisible && colorPickerVisible && (
            <ColorPickerModal
              color={backgroundColor}
              onChange={handleColorChange}
              toggleColorPicker={toggleColorPicker}
            />
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
