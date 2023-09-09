import React from "react";

const HomebarControl = ({
  homebarVisible,
  handleHomebarVisibility,
  homebarColor,
  setHomebarColor,
}) => {
  function toggleHomebar(e) {
    const checked = e.target.checked;
    if (checked) {
      setHomebarColor("bg-black");
    } else {
      setHomebarColor("bg-white");
    }
  }
  return (
    <>
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
                homebarColor === "bg-black" ? "bg-blue-500" : "bg-zinc-400"
              }`}
            ></div>
            <div
              className={`absolute w-5 h-5 bg-white rounded-full shadow inset-y-0 left-0 ${
                homebarColor === "bg-black" ? "transform translate-x-5" : ""
              }`}
            ></div>
          </div>
          <div className="ml-3 text-sm">Black</div>
        </label>
      )}
    </>
  );
};

export default HomebarControl;
