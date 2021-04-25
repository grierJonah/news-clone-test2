import { combineReducers } from 'redux';
import accountVerification from './accountVerification';

export default combineReducers({
    verified: accountVerification,
})