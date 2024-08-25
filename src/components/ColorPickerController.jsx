import React, { useState } from 'react'
import ColorPicker from 'react-best-gradient-color-picker'


function ColorPickerController({hideController,selectedColor}) {
      const [color, setColor] = useState("rgba(255,255,255,1)");
  return (
    <div>
      <ColorPicker
                    value={color}
                    onChange={(e) => { setColor(e); selectedColor(e); }}
                    hideEyeDrop={false} hideAdvancedSliders={false} hideColorGuide={false} hideInputType={false}
      />
    </div>
  );
}

export default ColorPickerController
