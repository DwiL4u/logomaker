import React from "react";
import { useState, useEffect, useContext } from "react";
import { UpdateStorageContext } from "../context/UpdateStorageContext"
import { Smile } from "lucide-react";
import { icons } from "lucide-react";
import { Slider } from "./ui/slider";
import ColorPickerController from "./ColorPickerController";
import html2canvas from "html2canvas";

const BASE_URL = "https://logoexpress.tubeguruji.com";



function LogoPreview({ downloadIcon }) {
  const [storageValue, setStorageValue] = useState();
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("value"));
    console.log(storageData);
    setStorageValue(storageData);
  }, [updateStorage]);

  useEffect(() => { 
    if (downloadIcon) { 
     downloadPngLogo();
    }
  }, [downloadIcon])
  const downloadPngLogo=() => {
    const downloadLogoDiv = document.getElementById("downloadLogoDiv")
    html2canvas(downloadLogoDiv, {
      backgroundColor:null
    }).then(canvas => {
      const pngImage = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.href = pngImage
      downloadLink.download = 'dwil.png' 
      downloadLink.click()
    })
  }

  const Icon=({ name, color, size, rotate }) => {
    const LucidIcon = icons[name];
    if (!LucidIcon) {
      return;
    }
    return <LucidIcon color={color} size={size} style={{transform:`rotate(${rotate}deg)`}} />;
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="h-[450px] w-[450px] bg-gray-200 outline-dotted outline-gray-300"
        style={{ padding: storageValue?.bgPadding }}
      >
        <div
          id="downloadLogoDiv"
          className="h-full w-full flex items-center justify-center"
          style={{
            borderRadius: storageValue?.bgRounded,
            background: storageValue?.bgColor,
          }}
        >
          {storageValue?.icon?.includes(".png") ? (
            <img
              src={ "/png/" + storageValue.icon}
              style={{
                height: storageValue?.iconSize,
                width: storageValue?.iconSize,
              }}
            />
          ) : (
            <Icon
              name={storageValue?.icon}
              color={storageValue?.iconColor}
              size={storageValue?.iconSize}
              rotate={storageValue?.iconRotate}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LogoPreview;
