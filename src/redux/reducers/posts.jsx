import {SET_POSTS_ACTION, SET_LOADING_ACTION, SET_IS_ARTICLES_ACTION, SET_LIKE_UNLIKE_ACTION, SET_EDIT_ARTICLE_ACTION} from './../actions/actions'

const initialState = {
	posts: null,
	isArticle: false,
	edit: false,
	loading: true
}

const posts = (state = initialState, {type, payload}) => {
	switch (type) {
		case SET_POSTS_ACTION: 
			return {...state, posts: payload.articles}
		case SET_IS_ARTICLES_ACTION: 
			return {...state, isArticle: payload}
		case SET_LIKE_UNLIKE_ACTION:
			return {
				...state,
				posts: state.posts.map((item) =>  item.slug === payload.slug ? payload : item)
			}
		case SET_EDIT_ARTICLE_ACTION:
			return {
				...state,
				edit: payload, 
			}
		case SET_LOADING_ACTION: 
			return {
				...state,
				loading: payload, 
			}
		default: 
			return state
	}
}
export default posts;