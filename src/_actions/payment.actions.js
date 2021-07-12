import data from '../apis/data';
import { dataConstants } from '../_constants';

export const setPaymentDataItem = (data) => async (dispatch) => {
    dispatch({
        type: dataConstants.SET_PAYMENT_DATA_ITEM, 
        payload: data
    });
}

export const handleToken = (result) => async (dispatch) => {
    const response = await data.post('/payment', result );
    dispatch({type: dataConstants.HANDLE_TOKEN, payload: response.data});
}

export const clearPaymentData = () => async (dispatch) => {
    dispatch({type: dataConstants.CLEAR_PAYMENT_DATA, payload: ''});
}