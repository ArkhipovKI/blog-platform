import styles from './App.module.scss';
import classnames from 'classnames/bind';
import {getPostsThunk} from './../../redux/actions/actions';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import Header from './../Header/Header'
import PostList from './../PostList/PostList'
import Spinner from './../Spinner/Spinner'
import SignInForm from './../SignInForm/SignInForm'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Article from './../Article/Article';
import SignUpForm from './../SignUpForm/SignUpForm'
import ArticleEditForm from './../ArticleEditForm/ArticleEditForm'
import ArticleForm from './../ArticleForm/ArticleForm'
import EditProfileForm from './../EditProfileForm/EditProfileForm'

const cn = classnames.bind(styles)

const App = () => {
	const {isArticle} = useSelector(state => state.posts)
	const dispatch = useDispatch()
	const {token} = useSelector(state => state.user.user)
 	const {loading} = useSelector(state => state.posts)
	useEffect(() => {
		dispatch(getPostsThunk(token))
	}, [dispatch, isArticle, token, loading])

	const {posts} = useSelector(state => state.posts)
	return (
		<div className={cn("App")}>
			<Router>
				< Header />
				<Routes>
					<Route path='/sign-in' element={<SignInForm/>} />
					<Route path='/sign-up' element={<SignUpForm/>} />
					<Route path='/article' element={!loading ? < PostList {...Object.values(posts)} /> : <Spinner />}/>
					<Route path='/article/:slug' element={!loading ? < Article {...Object.values(posts)} /> : <Spinner />}/>
					<Route path='/article/:slug/edit' element={!loading ? <ArticleEditForm {...Object.values(posts)}/> : <Spinner />}/>
					<Route path='/new-article' element={!loading ? <ArticleForm {...Object.values(posts)}/>  : <Spinner />}/>
					<Route path="/profile" element={!loading ? <EditProfileForm /> : <Spinner/>} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
