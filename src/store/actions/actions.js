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

export const initFormSubmission = () => {
    return {
        type: actionTypes.LOADING
    }
};

export const submitFormSuccess = () => {
    return {
        type: actionTypes.SUBMIT_FORM_SUCCESS
    }
};

export const submitFormFailure = () => {
    return {
        type: actionTypes.SUBMIT_FORM_FAILURE
    }
};

export const resetFormSuccess = () => {
    return {
        type: actionTypes.RESET_FORM_SUCCESS
    }
};