import React from "react";
import { makeStyles } from '@material-ui/styles';
import { FormControlLabel, RadioGroup, FormLabel, Radio } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  checkboxContainer: {
    marginLeft: 16,
    display: 'flex',
  },
  label: {
    marginLeft: 12,
  },
  checkbox: {
   
  }
}));

export const CheckBox = ({name, options, selectedOptions, onChange}) => {
  const classes = useStyles();
  console.log(selectedOptions);
  return (
      <div className={name !== 'confirmedCorona' ? classes.checkboxContainer : null}>
        {options.map(option => 
            <RadioGroup row aria-label="position" name={name}>
              <FormControlLabel
                value={option}
                control={<Radio color="primary" />}
                label={option}
                labelPlacement="end"
                onChange={onChange}
                checked={ selectedOptions.indexOf(option) > -1 }
              />
            </RadioGroup>
          )}
      </div>
  )
};