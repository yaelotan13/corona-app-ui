import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import UnitRadioGroup from "./UnitRadioGroup";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

function useMarks (unit) {
  const [marks, setMarks] = useState([]);
  const [maxValue, setMaxValue] = useState(42);
  const [minValue, setMinValue] = useState(35);

  useEffect(() => {
    setMaxValue(unit === 'C' ? 42 : 108);
    setMinValue(unit === 'C' ? 35 : 95);

    setMarks([
      {
        value: minValue,
        label: `${minValue}°${unit}`,
      },
      {
        value: maxValue,
        label: `${maxValue}°${unit}`,
      },
    ]);
  }, [unit, maxValue, minValue]);

  return [marks, minValue, maxValue];
}

function useSelectUnit () {
  const [selectedUnit, setSelectedUnit] = useState('C');

  function handleUnitChange (event) {
    setSelectedUnit(event.target.value);
  }

  return [selectedUnit, handleUnitChange];
}

export default function TemperatureSlider({name, onChange}) {
  const classes = useStyles();
  const [selectedUnit, handleUnitChange] = useSelectUnit();
  const [marks, minValue, maxValue] = useMarks(selectedUnit);

  function handleTemperatureChange (event, value) {
    //(35°C × 9/5) + 32 = 95°F
    const valueInCelsius = selectedUnit === 'F' ?
                            parseFloat(((value - 32) / 1.8).toFixed(1)) :
                            value;
    onChange(name, valueInCelsius);
  }

  return (
    <div className={classes.root}>
      <Slider
        defaultValue={selectedUnit === 'F' ? 98.2 : 36.8}
        aria-labelledby="discrete-slider-custom"
        step={0.1}
        valueLabelDisplay="auto"
        marks={marks}
        min={minValue}
        max={maxValue}
        onChangeCommitted={handleTemperatureChange}
        name={name}
      />
      <UnitRadioGroup onChange={handleUnitChange} selectedUnit={selectedUnit} />
    </div>
  );
}
