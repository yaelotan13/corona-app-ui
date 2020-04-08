import React from 'react';
import { Box, } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { withNamespaces } from 'react-i18next'

import getQuestions from '../../../services/utils/getQuestions';
import Question from './Question/Question'
import { CheckBox, TemperatureSlider, RateSlider } from '../Buttons';

const useStyles = makeStyles((theme) => ({
    temp: {
        marginTop: 24
      },
}));

const Questions = ({ t, handleCheckBoxChange, handleSliderChange, inputs, leftToRight }) => {
    const classes = useStyles();
    const questions = getQuestions(t);

    return (
        <Box>
            {
                questions.map(({ body, type, name }) =>
                    <Box key={name}>
                        <Question type={type} body={body} name={name} leftToRight={leftToRight}>
                        {
                            type === 'rate' ?
                            <RateSlider name={name} onChange={handleSliderChange}/>
                            :
                            <CheckBox name={name}
                                        onChange={handleCheckBoxChange}
                                        options={[ t('no'), t('yes') ]}
                                        selectedOptions={[ (inputs[name] ? t('yes') : t('no')) ]}
                                        leftToRight={leftToRight}
                            />
                        }
                        </Question>
                    </Box>
                )
            }
            <Box className={classes.temp}>
                <Question body={t('temp')}>
                    <TemperatureSlider name="temperature" onChange={handleSliderChange} />
                </Question>
          </Box>
        </Box>
        );
    };

export default withNamespaces()(Questions);
