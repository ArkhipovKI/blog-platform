import BlogApiService from './../../api/BlogApiService'

const {getPosts, loginUser, signUp, followArticle, createPost, editPost, deleteArticle, setEditUser} = new BlogApiService()

export const SET_POSTS_ACTION = 'SET_POSTS_ACTION';
export const setPostsAction = (payload) => ({
	type: SET_POSTS_ACTION,
	payload
})

export const SET_LOADING_ACTION = 'SET_LOADING';
export const setLoadingAction = (payload) => ({
	type: SET_LOADING_ACTION,
	payload
})

export const AUTHORIZATION_ACTION = 'AUTHORIZATION_ACTION';
export const authorizationAction = (payload) => ({
	type: AUTHORIZATION_ACTION,
	payload
})

export const SET_IS_ARTICLES_ACTION = 'SET_IS_ARTICLES_ACTION';
export const setIsArticlesAction = (payload) => ({
	type: SET_IS_ARTICLES_ACTION,
	payload
})

export const SET_EDIT_ARTICLE_ACTION = 'SET_EDIT_ARTICLE_ACTION';
export const setEditArticleAction = (payload) => ({
	type: SET_EDIT_ARTICLE_ACTION,
	payload
})

export const LOGINED_USER = 'LOGINED_USER';
export const loginedUserAction = (payload) => ({
	type: LOGINED_USER,
	payload
})

export const LOG_OUT_ACTION = 'LOG_OUT_ACTION';
export const logOutAction = () => ({
	type: LOG_OUT_ACTION
})

export const CONFIRM_MESSAGE = 'CONFIRM_MESSAGE';
export const confirmMessage = (payload) => ({
	type: CONFIRM_MESSAGE,
	payload
})

export const ERROR_MESSAGE = 'ERROR_MESSAGE';
export const errorMessage = (payload) => ({
	type: ERROR_MESSAGE,
	payload
})

export const SET_LIKE_UNLIKE_ACTION = 'SET_LIKE_UNLIKE_ACTION';
export const setLikeUnlikeAction = (payload) => ({
	type: SET_LIKE_UNLIKE_ACTION,
	payload
})

export const SHOW_MODAL = 'SHOW_MODAL';
export const showModal = (payload) => ({
	type: SHOW_MODAL,
	payload
})

export const signUpThunk = (user) => async (dispatch) => {
	const response = await signUp(user)
	dispatch(authorizationAction(response.user))
	dispatch(confirmMessage(true))
}

export const followArticleThunk = (token, slug, follow) => async (dispatch) => {
	const response = await followArticle(token, slug, follow);
	dispatch(setLikeUnlikeAction(response.article))
}

export const loginUserThunk = (user) => async (dispatch) => {
	const response = await loginUser(user)
	if (response.user)  {
		dispatch(authorizationAction(response.user))
		dispatch(errorMessage(response.errors))
	}
	if (response.errors) {
		dispatch(confirmMessage(true))
		dispatch(errorMessage(response.errors))
	}
};

export const getPostsThunk = (token) => async (dispatch) => {
	const response = await getPosts(token)
	dispatch(setPostsAction(response))
	dispatch(setLoadingAction(false))
}

export const createPostThunk = (article, token) => (dispatch) => {
	createPost(article, token).catch(() => dispatch(confirmMessage(true)));
}

export const editPostThunk = (article, token, slug) =>  (dispatch) => {
	editPost(article, token, slug).catch(() => dispatch(confirmMessage(true)));
}

export const deleteArticleThunk = (token, slug) =>  (dispatch) => {
	deleteArticle(token, slug).catch(() => dispatch(confirmMessage(true)))
}

export const setEditUserThunk = (user, token) => (dispatch) => {
	setEditUser( user, token )
		.then((response) => response.json())
		.then((response) => dispatch(loginedUserAction(response.user)))
		.catch(() => dispatch(confirmMessage(true)));
}
