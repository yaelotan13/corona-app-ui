import * as actionTypes from './actionTypes';

export const changeScreen = (screen) => {
    return {
        type: actionTypes.CHANGE_SCREEN,
        screen: screen
    };
};

export const changeLang = (lan) => {
    return {
        type: actionTypes.CHANGE_LANG,
        lan: lan
    };
};