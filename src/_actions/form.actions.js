import { dataConstants } from '../_constants';

export const setFormDataItem = (data) => async (dispatch) => {
    dispatch({
        type: dataConstants.SET_FORM_DATA_ITEM, 
        payload: data
    });
}

// export const clearFormData = () => async (dispatch) => {
//     dispatch({
//         type: 'CLEAR_FORM_DATA', 
//         payload: {}
//     });
   
// }