import { AiOutlineDelete } from "react-icons/ai";
import { IoPhonePortraitOutline, IoLaptopOutline } from "react-icons/io5";
import { MdOutlineDesktopMac } from "react-icons/md";

export default function DeviceButton({
  device,
  handleDeviceSelect,
  handleMockupSelect,
}) {
  const IconComponent = {
    iMac: MdOutlineDesktopMac,
    Macbook: IoLaptopOutline,
    iPhone: IoPhonePortraitOutline,
  }[device.name];

  return (
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
        <IconComponent className="h-8 w-8" />
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
  );
}
