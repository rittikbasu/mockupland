// ImageSettingsForm.js
import React, { useState } from "react";
import { BsDownload } from "react-icons/bs";
import { toPng, toJpeg } from "html-to-image";

const ImageSettingsForm = ({
  backgroundColor,
  toggleColorPicker,
  selectedDevices,
  setGridOverlayVisible,
  setMockupContainerVisible,
}) => {
  const [imageWidth, setImageWidth] = useState(1200);
  const [imageHeight, setImageHeight] = useState(1200);
  const [imageFormat, setImageFormat] = useState("png");

  const handleDownload = async (e) => {
    e.preventDefault();
    const container = document.getElementById("mockup-container");
    const gridOverlay = document.getElementById("grid-overlay");

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
            canvasHeight: imageHeight,
            canvasWidth: imageWidth,
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
  return (
    <form
      className="bottom-0 absolute w-full flex flex-col border border-dashed border-blue-600 bg-zinc-900/80 rounded-lg justify-center right-0"
      onSubmit={handleDownload}
    >
      <div className="mx-5 mt-4">
        <span>Image Settings</span>
      </div>
      <div className="flex items-center space-x-4 mx-5 mt-4">
        <InputField
          id="width"
          label="Width"
          value={imageWidth}
          onChange={setImageWidth}
        />
        <InputField
          id="height"
          label="Height"
          value={imageHeight}
          onChange={setImageHeight}
        />
      </div>
      <div className="flex items-center space-x-4 mx-5 mt-4">
        <FormatSelector
          id="format"
          value={imageFormat}
          onChange={setImageFormat}
        />
      </div>
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
  );
};

const InputField = ({ id, label, value, onChange }) => (
  <div className="flex items-center">
    <label htmlFor={id} className="mr-2 text-sm">
      {label}
    </label>
    <input
      type="number"
      min={0}
      id={id}
      className="w-full px-2 py-0.5 text-sm bg-zinc-600 rounded-md"
      placeholder="px"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      required
    />
  </div>
);

const FormatSelector = ({ id, value, onChange }) => (
  <div className="flex items-center">
    <label htmlFor={id} className="mr-2 text-sm">
      Format
    </label>
    <select
      name={id}
      id={id}
      className="w-full px-2 py-0.5 text-sm bg-zinc-600 rounded-md"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="png">png</option>
      <option value="jpg">jpeg</option>
    </select>
  </div>
);

export default ImageSettingsForm;
