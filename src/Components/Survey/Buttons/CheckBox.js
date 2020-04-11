import React from "react";
import { makeStyles } from '@material-ui/styles';
import { FormControlLabel, RadioGroup, Radio } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  checkboxContainer: {
    margin: '0 16px',
    display: 'flex',
  },
  label: {
    marginLeft: 12,
  },
  rightToLeft: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
}));

export const CheckBox = ({ name, options, selectedOptions, onChange, leftToRight }) => {
  const classes = useStyles();

  return (
      <div className={name !== 'confirmedCorona' ? classes.checkboxContainer : null}>
        {options.map((option, i) =>
            <RadioGroup key={i} row
                        aria-label="position"
                        name={name}
                        className={leftToRight ? null : classes.rightToLeft}
            >
              <FormControlLabel
                value={option}
                control={<Radio color="primary" />}
                label={option}
                onChange={onChange}
                checked={ selectedOptions.indexOf(option) > -1 }
                labelPlacement={leftToRight ? 'end' : 'start'}
              />
            </RadioGroup>
          )}
      </div>
  )
};

export default CheckBox;
