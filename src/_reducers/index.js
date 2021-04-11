import { combineReducers } from 'redux';
import { availability } from './availability.reducer';
import { formData } from './form.reducer';
import { paymentData } from './payment.reducer';

const reducers = combineReducers({
  availability,
  formData,
  paymentData
});

export default reducers;