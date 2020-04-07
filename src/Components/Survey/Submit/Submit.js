import React from 'react';
import { Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { ConfirmSurvey, SubmitButton } from '../Buttons';

const useStyles = makeStyles((theme) => ({
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
}));

const Submit = (props) => {
    const classes = useStyles();

    return (
        <Box className={classes.submitArea}>
            <ConfirmSurvey isConfirmed={props.isConfirmed} handleConfirm={props.handleConfirm} t={props.t}/>
            <SubmitButton isConfirmed={props.isConfirmed} handleSubmit={props.handleSubmit} t={props.t}/>
        </Box>
    );
};

export default Submit;
