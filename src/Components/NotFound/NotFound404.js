import React from "react";
import { Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { withNamespaces } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import withMenu from '../../hoc/withMenu/withMenu';
import img from '../../assets/images/404.jpg';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    width: '100%',
    backgroundImage: `url(${img})`,
    backgroundPosition: 'right',
    backgroundSize: '80%',
    backgroundRepeat: 'no-repeat',
    [theme.breakpoints.down('xs')]: {
      backgroundSize: '180%',
      backgroundPosition: 'right',
      height: '130vh',
    },
  },
  content: {
    marginLeft: '10vw',
    paddingTop: '10vh',
  },
  header: {
    fontSize: '50px',
    textAlign: 'canter',
  },
  margin: {
    marginTop: '2vh'
  }
}));

const NotFound404 = ({ t, history }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        <Typography className={classes.header} variant="h1">{t('404 header')}</Typography>
        <Typography className={classes.margin} variant="h4">{t('404 message')}</Typography>
        <Button 
          className={classes.margin} 
          color="secondary" 
          variant="contained"
          onClick={()=> history.goBack()}
        >
          {t('return')}
        </Button>
      </Box>
    </Box>
  )
};

export default withNamespaces()(withRouter(withMenu(NotFound404)));
