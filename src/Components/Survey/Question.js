import React from "react";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  questionContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  coronaQuestion: {
    marginTop: 24,
  },
}));

export const Question = ({body, children, type, name}) => {
  const classes = useStyles();

  return (
    <div 
      className={type === 'boolean' ? 
      name === 'confirmedCorona' ? classes.coronaQuestion : classes.questionContainer
      : null}
    >
      <p>{body}</p>
      {children}
    </div>
  )
};