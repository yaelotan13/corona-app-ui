import React from "react";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';
import { withNamespaces } from 'react-i18next';
import { Typography, Box, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useForm } from "../../hooks";
import { CheckBox } from "./CheckBox";
import RateSlider from "./RateSlider";
import { Question } from "./Question";
import getQuestions from './questions';
import TemperatureSlider from "./TemperatureSlider";
import { surveyService } from "../../services";
import withMenu from '../../hoc/withMenu/withMenu';
import { ConfirmSurvey } from "./ConfirmSurvey";
import { SubmitButton } from "./SubmitButton";
import { Checkmark } from 'react-checkmark';
import Spinner from '../shared/Spinner/Spinner';
import ErrorMessage from '../shared/ErrorMessage/ErrorMessage';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    margin: '0 0 8vh',
    position: 'relative',
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
  centerContainer: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successContent: {
    marginTop: '2vh',
  }
}));

function Survey ({ history, t, loading, hasFetchingError, onFormSubmission, onFormSuccess, onFormFailure, onChnageScreen, formSuccess, resetFormSuccess}) {
  const classes = useStyles();
  const QUESTIONS = getQuestions(t);
  const {
    inputs,
    isConfirmed,
    handleSliderChange,
    handleCheckBoxChange,
    handleSubmit,
    handleConfirm
  } = useForm(onSubmit, t);

  async function onSubmit () {
    try {
      onFormSubmission();
      const result = await surveyService.sendSurvey(inputs);
      if (result.status === 200) {
        onFormSuccess();
      }
    } catch (error) {
      onFormFailure();
      console.log(error);
      console.log(error.response);
    }
  }

  const showSuccessCheckmark = () => {
    setTimeout(() => {
      resetFormSuccess();
      onChnageScreen('Map');
      history.push('/map');
    }, 2000);

    return (
      <Box>
        <Checkmark size='large'/>
        <Typography className={classes.successContent}>{t('submission success')}</Typography>
      </Box>
    )
  }
  
  return (
    <Box>
      {
        hasFetchingError ?
        <ErrorMessage t={t} />
        :
        loading ?
        <Spinner />
        :
        formSuccess ?
        <Box className={classes.centerContainer}>
          {showSuccessCheckmark()}
        </Box>
        :
        <Box className={classes.container}>
          <Box className={classes.content}>
            <Typography className={classes.mainHeadline} variant="h3">
              {t('survey header')}
            </Typography>
            <Typography className={classes.headline} variant="h5">
              {t('survey intro')}
            </Typography>
            <form className={classes.form}>
              {QUESTIONS.map(({ body, type, name }) =>
                <Box key={name}>
                <Question type={type} body={body} name={name}>
                  {
                    type === 'rate' ?
                      <RateSlider name={name} onChange={handleSliderChange}/>
                      :
                      <CheckBox name={name}
                                onChange={handleCheckBoxChange}
                                options={[ t('no'), t('yes') ]}
                                selectedOptions={[ (inputs[name] ? t('yes') : t('no')) ]}
                      />
                  }
                </Question>
            </Box>
          )}
          <Box className={classes.temp}>
            <Question body={t('temp')}>
              <TemperatureSlider name="temperature"
                                 onChange={handleSliderChange}
              />
            </Question>
          </Box>
          <Box className={classes.submitArea}>
            <ConfirmSurvey isConfirmed={isConfirmed} handleConfirm={handleConfirm} t={t}/>
            <SubmitButton isConfirmed={isConfirmed} handleSubmit={handleSubmit} t={t}/>
          </Box>
        </form>
      </Box>
    </Box>
      }
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    hasFetchingError: state.hasFetchingError,
    formSuccess: state.formSuccess,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFormSubmission: () => dispatch(actions.initFormSubmission()),
    onFormFailure: () => dispatch(actions.submitFormFailure()),
    onFormSuccess: () => dispatch(actions.submitFormSuccess()),
    onChnageScreen: (screen) => dispatch(actions.changeScreen(screen)),
    resetFormSuccess: () => dispatch(actions.resetFormSuccess()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(withMenu(Survey)))