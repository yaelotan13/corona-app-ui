import React from "react";
import { makeStyles } from '@material-ui/styles';
import { FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
import i18n from '../../i18n';

const useStyles = makeStyles((theme) => ({
  checkboxContainer: {
    marginLeft: 16,
    display: 'flex',
  },
  label: {
    marginLeft: 12,
  },
  checkboxHebrew: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
}));

export const CheckBox = ({name, options, selectedOptions, onChange}) => {
  const classes = useStyles();

  return (
      <div className={name !== 'confirmedCorona' ? classes.checkboxContainer : null}>
        {options.map((option, i) =>
            <RadioGroup key={i} row
                        aria-label="position"
                        name={name}
                        className={i18n.language === 'he' ? classes.checkboxHebrew : null}
            >
              <FormControlLabel
                value={option}
                control={<Radio color="primary" />}
                label={option}
                onChange={onChange}
                checked={ selectedOptions.indexOf(option) > -1 }
                labelPlacement={i18n.language === 'he' ? 'start' : 'end'}
              />
            </RadioGroup>
          )}
      </div>
  )
};