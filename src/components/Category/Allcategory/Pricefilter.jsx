import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
function Pricefilter() {
  
  const [value, setValue] = useState([0, 100]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMinChange = (event) => {
    const newValue = [parseInt(event.target.value), value[1]];
    setValue(newValue);
  };

  const handleMaxChange = (event) => {
    const newValue = [value[0], parseInt(event.target.value)];
    setValue(newValue);
  };
  return (
    <div className='w-[25%]'>
    <div className='flex  w-[300px] h-[40px]  border-2 border-slate-700 rounded-br-lg '><span className='absolute text-[22px] ml-[75px]'>Price Range</span></div>
    <div className=" w-[300px] my-[30px] text-gray-300">
    <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={100}
        sx={{
          color: "#EF7215", // Orange color
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", margin: 10, padding:10 , }} className="gap-4 ">
        <TextField
          type="number"
          value={value[0]}
          onChange={handleMinChange}
          label="Min"
         
        />
        <TextField
          type="number"
          value={value[1]}
          onChange={handleMaxChange}
          label="Max"
        />
        </div>
      </div>
    </div>
  )
}
export default Pricefilter;