import * as actionTypes from '../actions/actionTypes';

const initailStata = {
    lan: 'English',
    curScreen: 'Home',
    loading: false,
    hasFetchingError: false,
    formSuccess: false,
};

const reducer = (state = initailStata, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_LANG: {
            return {
                ...state,
                lan: action.lan
            }
        }
        case actionTypes.CHANGE_SCREEN: {
            return {
                ...state,
                curScreen: action.screen
            }
        }
        case actionTypes.LOADING: {
            return {
                ...state,
                loading: true,
                hasFetchingError: false,
                formSuccess: false,
            }
        }
        case actionTypes.SUBMIT_FORM_SUCCESS: {
            return {
                ...state,
                loading: false,
                hasFetchingError: false,
                formSuccess: true,
            }
        }
        case actionTypes.SUBMIT_FORM_FAILURE: {
            return {
                ...state,
                loading: false,
                hasFetchingError: true,
                formSuccess: false,
            }
        }
        case actionTypes.RESET_FORM_SUCCESS: {
            return {
                ...state,
                loading: false,
                hasFetchingError: false,
                formSuccess: false,
            }
        }
        default: {
            return state;
        }
    }
};

export default reducer;
