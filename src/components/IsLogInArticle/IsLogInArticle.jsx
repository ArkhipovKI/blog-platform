import React, { useEffect, memo } from 'react';
import classnames from 'classnames/bind';
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import {setIsArticlesAction, showModal} from '../../redux/actions/actions'
import styles from './../Article/Article.module.scss'
import { HeartTwoTone, HeartOutlined } from '@ant-design/icons';
import avatar from './../../assets/images/defaultAvatar.png'
import { Link} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import Modal from '../Modal/Modal'
import { DateTime } from "luxon";
import {followArticleThunk, setEditArticleAction} from '../../redux/actions/actions'

const cn = classnames.bind(styles)

const IsLogInArticle = memo((props) => {
	const articles = Object.values(props)
	const dispatch = useDispatch()
	const {isArticle} = useSelector(state => state.posts)
	const {slug} = useParams() // Флаг
	const {token} = useSelector(state => state.user.user)
	const {user} = useSelector(state => state.user)
	const {modal} = useSelector(state => state.message)

	useEffect(() => {
		dispatch(setIsArticlesAction(true))
		return (() => dispatch(setIsArticlesAction(false)))
	},[dispatch])

	return articles.map((item) => {

		if (item.slug === slug) {

			const date = DateTime.fromISO(item.createdAt).toFormat('MMMM d, yyyy');

			return (
				<div className={cn('article')} key={item.createdAt + Math.random()}>
					<div className={cn('article-header')}>
						<div className={cn('article-description')}>
							<span className={cn('description')} >{item.title}</span>
							{ <button onClick={() => dispatch(followArticleThunk(token, slug, item.favorited))}>
									{!item.favorited ? 
									< HeartOutlined  className={cn('heart-icon--unchecked')} /> :
									< HeartTwoTone  className={cn('heart-icon--checked')} twoToneColor="#eb2f96"/>}
								</button> }
							<span className={cn('like-count')}>{item.favoritesCount}</span>
							<div>{item.tagList.map(tag => 
								<div className={cn('tag-wrapper')} key={item.createdAt + Math.random()}>
									<span className={cn('tag')}>{tag+' '}</span>
								</div>
							)}</div>
						</div>
						<div className = {cn('article-creator')}>
							<div className={cn('bio-block')}>
								<span className={cn('name')}>{item.author.username}</span>
								<span className={cn('date')}>{date}</span>
							</div>
							<img className={cn('avatar')} src={ avatar || item.author.image } alt=''/>
						</div>
					</div>
					<div className={cn('article-text')}>
						<span className={'article-text-body'}>{item.description}</span>
					</div>
					{isArticle && 	<ReactMarkdown>{item.body}</ReactMarkdown>}
					{item.author.username === user.username && 
					(<div className={cn('edit-card')}>
						{modal && <Modal slug={slug} />}
							<button
								className={cn('delete')}
								onClick={() => dispatch(showModal(true))}
								aria-hidden="true"
							>
								Delete
							</button>
							<Link
								to={`/article/${item.slug}/edit`}
								className={cn('edit')}
								onClick={() => dispatch(setEditArticleAction(true))}
							>
								Edit
							</Link>
					</div>)}
				</div>
			)	
		}
		return null
	})
})

export default IsLogInArticle