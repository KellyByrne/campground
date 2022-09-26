import axios from '../apis/data';
import { dataConstants } from '../_constants';

export const setPaymentDataItem = (data) => async (dispatch) => {
    dispatch({
        type: dataConstants.SET_PAYMENT_DATA_ITEM, 
        payload: data
    });
}

export const savePaymentData = (paymentData) => async (dispatch) => {
    const response = await axios.post('/payment', paymentData );
    dispatch({type: dataConstants.HANDLE_TOKEN, payload: response.data});
}

export const handleToken = (result, paymentId) => async (dispatch) => {
    const response = await axios.put(`/payment/${paymentId}`, result );
    dispatch({type: dataConstants.HANDLE_TOKEN, payload: response.data});
}

export const clearPaymentData = () => async (dispatch) => {
    dispatch({type: dataConstants.CLEAR_PAYMENT_DATA, payload: ''});
}