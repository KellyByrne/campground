import { dataConstants } from '../_constants';

export const availability = (state={}, action) => {
    switch(action.type){
        case dataConstants.FETCH_AVAILABLE_SITES:
            // return {
            //     ...state, 
            //     ...action.payload
            // };
            return {...state, ...action.payload};
        default:
            return state;
    }
}

