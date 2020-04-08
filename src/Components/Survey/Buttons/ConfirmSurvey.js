import { Checkbox, FormControlLabel } from "@material-ui/core";
import React from "react";

export const ConfirmSurvey = ({ isConfirmed, handleConfirm, t, leftToRight }) =>
  <FormControlLabel
  labelPlacement={leftToRight ? 'start' : 'end'}
    control={
      <Checkbox
        checked={isConfirmed}
        onChange={handleConfirm}
        name="confirm"
        color="secondary"
      />
    }
    label={t('confirm survey')}
  />
;

export default ConfirmSurvey;
