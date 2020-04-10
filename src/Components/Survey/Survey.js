import React, { useState } from "react";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';
import { withNamespaces } from 'react-i18next';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Checkmark } from 'react-checkmark';

import { useForm } from "../../hooks";
import { surveyService } from "../../services";
import withMenu from '../../hoc/withMenu/withMenu';
import Spinner from '../shared/Spinner/Spinner';
import Questions from './Questions/Questions';
import Submit from './Submit/Submit';
import Header from './Header/Header';
import ServerError from '../shared/ServerError/ServerError';
import useLocation from '../../hooks/useLocation';

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
  const [ hasError, location ] = useLocation();
  console.log('location');
  console.log(location);
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

  async function onSubmit () {
    try {
      setLoading(true);
      const result = await surveyService.sendSurvey(inputs, location);
      if (result.status === 200) {
        setLoading(false);
        setFormSuccess(true);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setHasFetchingError(true);
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
  
  return (
    <Box>
      {
        hasFetchingError ?
        <ServerError t={t} />
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