import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}`;
}

export default function CustomSlider({ setRange, maxValue }) {
  const [value, setValue] = React.useState([0, maxValue]);
  React.useEffect(() => {
    setValue([0, maxValue]);
    setRange([0, maxValue]);
  }, [maxValue]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setRange(newValue);
  };

  return (
    maxValue > 0 && (
      <div className="flex  justify-ceenter items-center mr-5 ">
        <h2 className="text-1xl mr-4 mb-2">Duration (min):</h2>
        <Box sx={{ width: 300 }}>
          <Slider
            max={maxValue}
            getAriaLabel={() => "Duration range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
        </Box>
      </div>
    )
  );
}
