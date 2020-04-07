import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    mainHeadline: {
        textAlign: 'center',
        marginBottom: 16,
      },
      headline: {
        textAlign: 'center',
        marginBottom: 30,
      },
});

const Header = (props) => {
    const classes = useStyles();

    return (
        <Fragment>
            <Typography className={classes.mainHeadline} variant="h3">
                {props.t('survey header')}
            </Typography>
            <Typography className={classes.headline} variant="h5">
                {props.t('survey intro')}
            </Typography>
        </Fragment>
    );
};

export default Header;
