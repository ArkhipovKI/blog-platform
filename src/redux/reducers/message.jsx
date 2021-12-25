import {CONFIRM_MESSAGE, ERROR_MESSAGE, SHOW_MODAL} from '../actions/actions'

const initialState = {
	alert: false,
	errorMessage: [],
	modal: false
}

const message = (state = initialState, {type, payload}) => {
	switch (type) {
		case CONFIRM_MESSAGE: 
			return {...state, alert: payload}
		case ERROR_MESSAGE: 
			return {...state, errorMessage: payload}
		case SHOW_MODAL:
			return {...state, modal: payload}
		default: 
			return state
	}
}
export default message;