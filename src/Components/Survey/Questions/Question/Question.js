import React from "react";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  blueLipsQuestion: {
    display: 'flex',
    alignItems: 'center',
  },
  rightToLeftContainer: {
    flexDirection: 'row-reverse'
  },
  rightToLeft: {
    display: 'flex',
    flexDirection: 'row-reverse',
    marginLeft: '2vw',
  },
  question: {
    marginTop: 70,
  }
}));

export const Question = ({ body, children, name, leftToRight }) => {
  const classes = useStyles();
  const questionStyle = [ classes.question ];

  if (name === 'blueLips') {
    questionStyle.push(classes.blueLipsQuestion)
  };
  if (!leftToRight) {
    console.log('in not leftToRight');
    questionStyle.push(classes.rightToLeftContainer)
  };

  return (
    <div className={questionStyle.join(' ')}>
      <p className={leftToRight ? null : classes.rightToLeft}>{body}</p>
      {children}
    </div>
  );
};

export default Question;
