import {dataConstants} from '../_constants';

export const formData = (state={}, action) => {
    switch(action.type){
        case dataConstants.SET_FORM_DATA_ITEM:
            return {
                ...state,
                ...action.payload
            }
        // case 'CLEAR_FORM_DATA':
        //     return {
        //         ...state,
        //         data: {}
        //     }
        default:
            return state;
    }
};