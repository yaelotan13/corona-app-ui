import React from "react";
import { makeStyles } from '@material-ui/styles';
import i18n from '../../i18n';

const useStyles = makeStyles((theme) => ({
  blueLipsQuestion: {
    display: 'flex',
    alignItems: 'center',
  },
  hebrewContainer: {
    flexDirection: 'row-reverse'
  },
  hebrewText: {
    display: 'flex',
    flexDirection: 'row-reverse',
    marginLeft: '2vw',
  },
  question: {
    marginTop: 70,
  }
}));

export const Question = ({ body, children, type, name }) => {
  const classes = useStyles();
  const questionStyle = [ classes.question ];

  if (name === 'blueLips') questionStyle.push(classes.blueLipsQuestion);
  if (i18n.language === 'he') questionStyle.push(classes.hebrewContainer);

  return (
    <div className={questionStyle.join(' ')}>
      <p className={i18n.language === 'he' ? classes.hebrewText : null}>{body}</p>
      {children}
    </div>
  );
};
