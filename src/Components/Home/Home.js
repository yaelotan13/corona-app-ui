import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Typography,
    Button,
    Grid
} from '@material-ui/core';
import { withNamespaces } from 'react-i18next';

import bgImg from '../../assets/images/doctors-croped.png';
import withMenu from '../../hoc/withMenu/withMenu';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        maxHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        overflow: 'hidden',
    },
    content: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        paddingLeft: '5vw',
    },
    header: {
        fontFamily: theme.typography.h1.fontFamily,
        [theme.breakpoints.between('sm', 'xl')]: {
            marginTop: '5vh',
            fontSize: 40,
          },
        [theme.breakpoints.down('xs')]: {
            marginTop: '15vh',
            fontSize: 26,
        }
    },
    abouUs: {
        marginTop: '5vh',
        lineHeight: theme.typography.subtitle1.lineHeight,
        [theme.breakpoints.between('sm', 'xl')]: {
            marginTop: '5vh',
            fontSize: '18px',
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: '2vh',
            fontSize: '16px',
        }
    },
    buttonsContainer: {
        margin: '5vh auto',
    },
    mapBut: {
        color: theme.palette.secondary.main,
        marginLeft: '2vw',
    },
    startBut: {
        backgroundColor: theme.palette.secondary.main,
    }, 
    imgContainer: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        [theme.breakpoints.between('sm', 'xl')]: {
            height: '50%',
            width: '100%',
          },
        [theme.breakpoints.down('xs')]: {
            height: '80%',
            width: '100%',
        }
    }
}));

const Home = ({ t, history }) => {
    const classes = useStyles();
  
    return (
            <Box className={classes.wrapper}>
                <Grid container alignItems="center">
                    <Grid xs={12} sm={6} lg={6}>
                        <Box className={classes.content}>
                            <Typography variant="h2" className={classes.header}>{t('corona hot map')}</Typography>
                            <Typography className={classes.abouUs}>{t('app description')}</Typography>
                            <Box className={classes.buttonsContainer}>
                                <Button 
                                    color="primary" 
                                    variant="contained" 
                                    className={classes.startBut}
                                    onClick={() => history.push('/survey')}
                                >
                                    {t('start survey')}
                                </Button>
                                <Button 
                                    color="secondary" 
                                    variant="outlined" 
                                    className={classes.mapBut}
                                    onClick={() => history.push('/map')}
                                >
                                    {t('watch map')}
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid xs={12} sm={6} lg={6}>
                        <Box className={classes.imgContainer}>
                            <Box className={classes.img} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
    );
};

export default withNamespaces()(withMenu(Home));
