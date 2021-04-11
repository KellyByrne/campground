import data from '../apis/data';
import { dataConstants } from '../_constants';

export const setPaymentDataItem = (data) => async (dispatch) => {
    dispatch({
        type: dataConstants.SET_PAYMENT_DATA_ITEM, 
        payload: data
    });
}

export const handleToken = (token, addresses) => async (dispatch) => {
    const response = await data.post('/payment', { token, addresses });
    console.log(token);
    console.log(addresses)
    console.log('response', response);
    dispatch({type: dataConstants.HANDLE_TOKEN, payload: response.data});
}