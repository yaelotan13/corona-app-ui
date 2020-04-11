import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Typography,
    Button,
    Grid,
} from '@material-ui/core';
import { withNamespaces } from 'react-i18next';

import bgImg from '../../assets/images/docs.jpg';
import withMenu from '../../hoc/withMenu/withMenu';

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column'
        }
    },
    gridContent: {
        [theme.breakpoints.down('xs')]: {
            height: '50vh'
        }
    },
    gridImg: {
        [theme.breakpoints.down('xs')]: {
            height: '50vh'
        }
    },
    content: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '5vw',
    },
    header: {
        fontFamily: theme.typography.h1.fontFamily,
        [theme.breakpoints.between('sm', 'xl')]: {
            marginTop: '5vh',
            fontSize: 40,
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 26,
        }
    },
    abouUs: {
        marginTop: '5vh',
        color: theme.typography.overline.color,
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
        color: theme.palette.warning.main,
        border: `1px solid ${theme.palette.warning.main}`,
        marginLeft: '2vw',
    },
    startBut: {
        backgroundColor: theme.palette.warning.main,
        color: 'white'
    }, 
    imgContainer: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.between('sm', 'xl')]: {
            alignItems: 'flex-end',
        },
        [theme.breakpoints.down('xs')]: {
            height: '50vh',
            width: '100vw'
        }
    },
    img: {
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        [theme.breakpoints.between('sm', 'xl')]: {
            height: '80%',
            width: '100%',
        },
        [theme.breakpoints.down('xs')]: {
            position: 'relative',
            top: '10vh',
            height: '90%',
            width: '100%',
        }
    }
}));

const Home = ({ t, history }) => {
    const classes = useStyles();
  
    return (
        <Grid container alignItems="center" className={classes.gridContainer}>
            <Grid xs={12} sm={6} lg={7} className={classes.gridImg}>
                <Box className={classes.imgContainer}>
                    <Box className={classes.img} />
                </Box>
            </Grid>
            <Grid xs={12} sm={6} lg={5} className={classes.gridContent}>
                <Box className={classes.content}>
                    <Typography variant="h2" className={classes.header}>{t('corona hot map')}</Typography>
                    <Typography className={classes.abouUs}>{t('app description')}</Typography>
                    <Box className={classes.buttonsContainer}>
                        <Button 
                            data-cy="go-to-survey"
                            variant="contained" 
                            className={classes.startBut}
                            onClick={() => history.push('/survey')}
                        >
                            {t('start survey')}
                        </Button>
                        <Button 
                            data-cy="go-to-map"
                            className={classes.mapBut}
                            onClick={() => history.push('/map')}
                        >
                            {t('watch map')}
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default withNamespaces()(withMenu(Home));
