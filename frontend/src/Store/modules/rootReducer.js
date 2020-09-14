import { combineReducers } from 'redux';

import modal from './Modal/Reducer';
import edit from './Edit/Reducer';

export default combineReducers({
    modal,
    edit
});