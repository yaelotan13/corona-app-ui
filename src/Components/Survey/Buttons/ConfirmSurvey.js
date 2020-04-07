import { Checkbox, FormControlLabel } from "@material-ui/core";
import React from "react";
import i18n from '../../../i18n';

export const ConfirmSurvey = ({ isConfirmed, handleConfirm, t }) =>
  <FormControlLabel
  labelPlacement={i18n.language === 'Hebrew' ? 'start' : 'end'}
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
