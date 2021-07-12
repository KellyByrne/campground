import { dataConstants } from '../_constants';

export const paymentData = (state={}, action) => {
    switch(action.type){
        case dataConstants.SET_PAYMENT_DATA_ITEM:
            return {
                ...state,
                ...action.payload
            };
        case dataConstants.HANDLE_TOKEN:
            return {
                ...state,
                ...action.payload
            };
        case dataConstants.CLEAR_PAYMENT_DATA:
            return {
                ...action.payload
            };
        default:
            return state;
    }
};