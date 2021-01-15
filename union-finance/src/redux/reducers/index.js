import { combineReducers } from 'redux';
import users from './users';
import transactions from './transactions';

export default combineReducers({ users, transactions });
