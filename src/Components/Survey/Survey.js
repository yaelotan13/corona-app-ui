import React, { useEffect, useState } from "react";
import { withNamespaces } from 'react-i18next';
import { Typography, Box, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useForm } from "../../hooks";
import { CheckBox } from "./CheckBox";
import RateSlider from "./RateSlider";
import { Question } from "./Question";
import { QUESTIONS } from "./questions";
import TemperatureSlider from "./TemperatureSlider";
import { surveyService } from "../../services";
import withMenu from '../../hoc/withMenu/withMenu';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
  },
  content: {
    padding: 30,
    paddingTop: 100,
  },
  mainHeadline: {
    textAlign: 'center',
    marginBottom: 16,
  },
  headline: {
    textAlign: 'center',
    marginBottom: 30,
  },
  form: {
    height: '100%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.between('sm', 'xl')]: {
      width: '40%',
    },
    [theme.breakpoints.down('xs')]: {
        width: '80%',
        maxWidth: '100vw',
    }
  },
  temp: {
    marginTop: 24
  },
  submitArea: {
    textAlign: 'center',
    marginTop: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
  }
  },
  buttonContainer: {
    width: '30%',
    margin: 'auto',
  },
}));

function Survey ({ history }) {
  const classes = useStyles();
  const {
    inputs,
    handleSliderChange,
    handleCheckBoxChange,
    handleSubmit,
    handleConfirm
  } = useForm(onSubmit);
  const [ error, setError ] = useState(null);
  console.log()
  useEffect(() => {
    setError(null); // reset errors
  }, [ inputs ]);

  async function onSubmit () {
    if (!surveyService.isSurveyValid(inputs))
      return setError('Please fill the survey.');

    try {
      await surveyService.sendSurvey(inputs);
      history.push('/map');
    } catch (error) {
      console.log(error)
      console.log(error.response)
    }
  }

  function renderError () {
    window.scrollTo(0, 0);
    return (
      <p style={{ color: 'red' }}>{error}</p>
    );
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        {error ? renderError() : null}
        <Typography className={classes.mainHeadline} variant="h3">Coronavirus Survey</Typography>
        <Typography className={classes.headline} variant="h5">Please indicate to which degree do you suffer from the following symptoms:</Typography>
        <form className={classes.form}>
          {QUESTIONS.map(({ body, type, name }) =>
            <Box>
              <Question key={name} type={type} body={body} name={name}>
                {
                  type === 'rate' ?
                  <RateSlider name={name} onChange={handleSliderChange}/> 
                  :
                  <CheckBox name={name}
                            onChange={handleCheckBoxChange}
                            options={[ 'No', 'Yes' ]}
                            selectedOptions={[ (inputs[name] ? 'Yes' : 'No') ]}
                  />
                }
              </Question>
            </Box>
          )}
          <Box className={classes.temp}>
            <Question body="Your current temperature:">
              <TemperatureSlider name="temperature"
                                onChange={handleSliderChange}
              />
            </Question>

          </Box>
          <Box className={classes.submitArea}>
            <FormControlLabel
                control={
                  <Checkbox
                    checked={inputs['confirm'] ? true : false}
                    onChange={handleConfirm}
                    name="confirm"
                    color="secondary"
                  />
                }
                label="I answer this survey honestly"
                />
            <box className={classes.buttonContainer}>
              <Button 
                type="submit" 
                onClick={handleSubmit} 
                color="primary" 
                variant="contained" 
                className={classes.submit}
                size="large"
                disabled={!inputs['confirm'] ? true : false}
              >
                SEND
              </Button>
            </box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default withNamespaces()(withMenu(Survey))