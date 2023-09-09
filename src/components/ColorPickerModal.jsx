// ColorPickerModal.js
import React, { useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { MdClose } from "react-icons/md";

const ColorPickerModal = ({ color, onChange, toggleColorPicker }) => {
  return (
    <div className="absolute bottom-0 right-0 p-4 z-50">
      <div className="top-0 left-0 w-full h-full" />
      <div className="top-0 left-0 border border-dashed border-blue-600 bg-zinc-900 rounded-lg p-6">
        <CloseButton onClick={toggleColorPicker} />
        <HexColorPicker color={color} onChange={onChange} />
        <HexColorInput
          color={color}
          onChange={onChange}
          className="w-full px-4 py-0.5 mt-4 text-sm bg-zinc-600 rounded-md"
        />
      </div>
    </div>
  );
};

const CloseButton = ({ onClick }) => (
  <button
    className="absolute top-2 right-2 p-0.5 bg-zinc-800 border border-dashed border-blue-500 rounded-full"
    onClick={onClick}
  >
    <MdClose className="h-5 w-5 text-red-500 hover:text-red-800" />
  </button>
);

export default ColorPickerModal;
