import {combineReducers, conbineReducers} from 'redux';
import { user } from './user'

const Reducers = combineReducers({
    userState: user
})

export default Reducers;