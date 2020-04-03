import React from 'react';
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

export default function UnitRadioGroup({onChange, selectedUnit}) {
  return (
    <RadioGroup row aria-label="position" name="position">
      <FormControlLabel
        value="C"
        control={<Radio color="primary" />}
        label="°C"
        labelPlacement="end"
        onChange={onChange}
        checked={selectedUnit === 'C'}
      />
          <FormControlLabel
        value="F"
        control={<Radio color="primary" />}
        label="°F"
        labelPlacement="end"
        onChange={onChange}
        checked={selectedUnit === 'F'}
      />
    </RadioGroup>
  );
}
