import { combineReducers } from 'redux'
import user from './user'
import posts from './posts'
import message from './message'

export default combineReducers({
	user,
	posts,
	message
})