import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: '90%',
  },
});

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
];

function valuetext (value) {
  return `${value}`;
}

function valueLabelFormat (value) {
  return marks.findIndex(mark => mark.value === value) + 1;
}

export default function RateSlider ({ name, onChange }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Slider
        defaultValue={0}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-restrict"
        step={null}
        valueLabelDisplay="auto"
        marks={marks}
        onChangeCommitted={(event, value) =>
          onChange(name, value)}
        name={name}
        min={0}
        max={5}
      />
    </div>
  );
}
