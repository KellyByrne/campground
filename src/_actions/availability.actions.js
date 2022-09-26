// import data from '../apis/data';
import data from '../apis/data';
import { dataConstants } from '../_constants';


export const fetchAvailableSites = (startDate, endDate) => async (dispatch) => {
    const response = await data.post('/available-sites', {startDate, endDate});
    dispatch({type: dataConstants.FETCH_AVAILABLE_SITES, payload: response.data});
}


