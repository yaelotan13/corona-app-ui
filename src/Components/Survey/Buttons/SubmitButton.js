import { Button } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    width: '30%',
    margin: 'auto',
  }
}));

export function SubmitButton ({ handleSubmit, isConfirmed, t }) {
  const classes = useStyles();

  return (
    <Box className={classes.buttonContainer}>
      <Button
        type="submit"
        onClick={handleSubmit}
        color="primary"
        variant="contained"
        className={classes.submit}
        size="large"
        disabled={!isConfirmed}
      >
        {t('send')}
      </Button>
    </Box>
  );
}

export default SubmitButton;
