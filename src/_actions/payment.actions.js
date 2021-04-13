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
    console.log('is this running?');
    console.log(response.data);
    dispatch({type: dataConstants.HANDLE_TOKEN, payload: response.data});
}