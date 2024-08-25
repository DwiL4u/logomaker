import {
  Icon,
  Settings2,
  Shield,
  Image,
  Plus,
  ImagePlus,
  ShieldPlus,
} from "lucide-react";
import React from "react";
import { useState } from "react";

function SideNav({ selectedIndex }) {
  const menuList = [
    {
      id: 1,
      name: "Icon",
      Icon: Settings2,
    },
    {
      id: 2,
      name: "Background",
      Icon: ImagePlus,
    },
    {
      id: 3,
      name: "Update",
      Icon: ShieldPlus,
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="border shadow-sm h-screen">
      <div>
        {menuList.map((menu, index) => (
          <h2
            onClick={() => {
              setActiveIndex(index);
              selectedIndex(index);
            }}
            className={`p-3 text-lg px-3  text-gray-500 cursor-pointer flex items-center gap-2 hover:bg-secondary hover:text-white "} ${
              activeIndex === index && "bg-secondary text-white"
            }`}
            key={index}
          >
            <menu.Icon />
            {menu.name}
          </h2>
        ))}
      </div>
    </div>
  );
}

export default SideNav;
