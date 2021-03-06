import * as actionTypes from '../actions/actionTypes';

const initailStata = {
    lan: 'English',
    curScreen: 'Home',
    leftToRight: true,
};

const reducer = (state = initailStata, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_LANG: {
            return {
                ...state,
                lan: action.lan,
                leftToRight: action.lan == 'Hebrew' || action.lan == 'Arabic' ? false : true,
            }
        }
        case actionTypes.CHANGE_SCREEN: {
            return {
                ...state,
                curScreen: action.screen
            }
        }
        default: {
            return state;
        }
    }
};

export default reducer;
