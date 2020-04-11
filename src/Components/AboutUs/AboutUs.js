import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Typography,
    Grid
} from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { withNamespaces } from 'react-i18next';

import withMenu from '../../hoc/withMenu/withMenu';
import img from '../../assets/images/young-people.jpg';

const useStyle = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        padding: '8vh',
        marginTop: '8vh',
        color: theme.typography.overline.color,
    },
    imgContainer: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            height: '60vh',
        }
    },
    img: {
        backgroundImage: `url(${img})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        [theme.breakpoints.between('lg', 'xl')]: {
            height: '90%',
            width: '100%',
        },
        [theme.breakpoints.between('sm', 'md')]: {
            height: '100%',
            width: '50%',
        },
        [theme.breakpoints.down('xs')]: {
            height: '100%',
            width: '100%',
        }
    }, 
    mainHeadline: {
        fontSize: 40,
        color: theme.palette.warning.main
    },
    aboutUs: {
        lineHeight: '30px',
        [theme.breakpoints.between('sm', 'xl')]: {
            marginTop: '5vh',
            fontSize: '18px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: '2vh',
            fontSize: '16px',
        }
    },
    contactUs: {
        marginTop: '8vh',
        fontSize: 16,
        lineHeight: '30px',
    },
    emailContainer: {
        marginTop: '2vh',
    },
    icon: {
        margin: 0,
    },
    emailAddress: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: '30px',
        [theme.breakpoints.between('sm', 'xl')]: {
            fontSize: '18px',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '16px',
        }
    }
}));

const AboutUs = ({ t }) => {
    const classes = useStyle();

    return (
        <Box className={classes.wrapper}>
        <Grid container>
            <Grid xs={12} lg={6}>
                <Box className={classes.content}>
                    <Typography  className={classes.mainHeadline} variant="h2">{t('about us')}</Typography>
                    <Typography className={classes.aboutUs}>{t('about us description')}</Typography>
                    <Typography className={classes.contactUs}>{t('if you have questions')}</Typography>
                    <Box className={classes.emailContainer}>
                        <Typography className={classes.emailAddress}>
                        <MailOutlineIcon className={classes.icon}/> 
                            - yaelotan19@email.com
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid xs={12} lg={6}>
                <Box className={classes.imgContainer}>
                    <Box className={classes.img} />
                </Box>
            </Grid>
        </Grid>
        </Box>
    )
};

export default withNamespaces()(withMenu(AboutUs));