import React, { useState } from "react";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';
import { withNamespaces } from 'react-i18next';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useForm } from "../../hooks";
import { surveyService } from "../../services";
import withMenu from '../../hoc/withMenu/withMenu';
import { Checkmark } from 'react-checkmark';
import Spinner from '../shared/Spinner/Spinner';
import ErrorMessage from '../shared/ErrorMessage/ErrorMessage';
import Crossmark from './Crossmark/Crossmark';
import Questions from './Questions/Questions';
import Submit from './Submit/Submit';
import Header from './Header/Header';
import { props } from "bluebird";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    margin: '0 0 8vh',
    position: 'relative',
    padding: 30,
    paddingTop: 100,
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

function Survey ({ history, t, onChnageScreen, leftToRight }) {
  const classes = useStyles();
  const {
    inputs,
    isConfirmed,
    handleSliderChange,
    handleCheckBoxChange,
    handleSubmit,
    handleConfirm
  } = useForm(onSubmit, t);
  const [ loading, setLoading ] = useState(false);
  const [ hasFetchingError, setHasFetchingError ] = useState(false);
  const [ formSuccess, setFormSuccess ] = useState(false);
  const [ unhothorized, setUnhothorized ] = useState(false);

  async function onSubmit () {
    try {
      setLoading(true);
      const result = await surveyService.sendSurvey(inputs);
      if (result.status === 200) {
        setLoading(false);
        setFormSuccess(true);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response);
      if (error.response.status === 401) {
        setLoading(false);
        setUnhothorized(true);
      } else {
        setLoading(false);
        setHasFetchingError(true);
      }
    }
  }

  const showSuccessCheckmark = () => {
    setTimeout(() => {
      setFormSuccess(true);
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

  const showFilureCheckmark = () => {
    setTimeout(() => {
      setFormSuccess(true);
      onChnageScreen('Map');
      history.push('/map');
    }, 2000);

    return (
      <Box>
        <Crossmark />
        <Typography className={classes.successContent}>{t('submission failure')}</Typography>
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
        unhothorized ?
        <Box className={classes.centerContainer}>
          {showFilureCheckmark()}
        </Box>
        :
        <Box className={classes.container}>
          <Header t={t} />
          <form className={classes.form}>
            <Questions 
              inputs={inputs} 
              handleSliderChange={handleSliderChange} 
              handleCheckBoxChange={handleCheckBoxChange}
              leftToRight={leftToRight}
            />
            <Submit 
              isConfirmed={isConfirmed} 
              handleConfirm={handleConfirm} 
              handleSubmit={handleSubmit}
              leftToRight={leftToRight}
              t={t} 
            />
          </form>
        </Box>
      }
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    leftToRight: state.leftToRight
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChnageScreen: (screen) => dispatch(actions.changeScreen(screen)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(withMenu(Survey)))