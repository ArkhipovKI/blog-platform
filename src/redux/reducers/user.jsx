import {AUTHORIZATION_ACTION, LOGINED_USER, LOG_OUT_ACTION} from './../actions/actions'

const initialState = {
	user: {},
	login: false
}

const user = (state = initialState, {type, payload}) => {
	switch (type) {
		case AUTHORIZATION_ACTION: 
		return {...state, user: payload, login: true};
		
		case LOGINED_USER: 
		return {...state, user: payload}

		case LOG_OUT_ACTION:
		return {...state,	user: {}, login: false}

		default:
		return state
	} 
	
}

export default user