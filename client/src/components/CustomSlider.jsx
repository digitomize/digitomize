import * as React from "react"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"

function valuetext(value) {
  return `${value}`
}

export default function CustomSlider({ setRange, maxValue }) {
  const [value, setValue] = React.useState([0, maxValue])
  React.useEffect(() => {
    setValue([0, maxValue])
    setRange([0, maxValue])
  }, [maxValue])
  const handleChange = (event, newValue) => {
    setValue(newValue)
    setRange(newValue)
  }

  return (
    maxValue > 0 && (
      <div className='flex flex-col md:flex-row justify-center  items-center md:mr-5 '>
        <h2 className='text-1xl mr-4 mb-2 mt-5 md:mt-0'>Duration (min):</h2>
        <Box
          className='px-6 py-0 md:py-3 rounded-lg flex flex-col justify-center items-center bg-filter  '
          sx={{ width: 300 }}
        >
          <Slider
            max={maxValue}
            step={15}
            getAriaLabel={() => "Duration range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay='auto'
            getAriaValueText={valuetext}
          />
        </Box>
      </div>
    )
  )
}
