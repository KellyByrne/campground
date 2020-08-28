import { combineReducers } from 'redux';
import { availability } from './availability.reducer';
import { formData } from './form.reducer';

const reducers = combineReducers({
  availability,
  formData
});

export default reducers;