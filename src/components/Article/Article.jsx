import React from 'react';
import styles from './Article.module.scss'
import classnames from 'classnames/bind';
import { HeartTwoTone, HeartOutlined } from '@ant-design/icons';
import {useSelector, useDispatch} from 'react-redux'
import 'antd/dist/antd.css';
import { DateTime } from "luxon";
import avatar from './../../assets/images/defaultAvatar.png'
import {Link} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import {followArticleThunk} from '../../redux/actions/actions'

const cn = classnames.bind(styles)

const Article = ({ author, body, title, createdAt, description, favorited, favoritesCount, tagList, slug}) => {
	const dispatch = useDispatch()
	const {username, image} = author
	const {token} = useSelector(state => state.user.user)
	const date = DateTime.fromISO(createdAt).toFormat('MMMM d, yyyy')
	const {isArticle} = useSelector(state => state.posts)
	const tags = tagList.map(tag => 
		<div className={cn('tag-wrapper')} key={createdAt + Math.random()}>
			<span className={cn('tag')}>{tag+' '}</span>
		</div>
		)
	return (
		<div className={cn('article')}>
			<div className={cn('article-header')}>
				<div className={cn('article-description')}>
					<Link to={`/article/${slug}`} className={cn('description')} >{title}</Link>
					{ !favorited ? 
						(<button onClick={() => dispatch(followArticleThunk(token, slug, favorited))}>
							< HeartOutlined style={{fontSize: '15px'}} className={cn('heart-icon--unchecked')} />
						</button>) :
						(<button onClick={() => dispatch(followArticleThunk(token, slug, favorited))}>
							< HeartTwoTone style={{fontSize: '15px'}} className={cn('heart-icon--checked')} twoToneColor="#eb2f96"/> 
						</button>)
					}
					<span className={cn('like-count')}>{favoritesCount}</span>
					<div>{tags}</div>
				</div>
				<div className = {cn('article-creator')}>
					<div className={cn('bio-block')}>
						<span className={cn('name')}>{username}</span>
						<span className={cn('date')}>{date}</span>
					</div>
					<img className={cn('avatar')} src={ avatar || image } alt=''/>
				</div>
			</div>
			<div className={cn('article-text')}>
				<span className={'article-text-body'}>{description}</span>
			</div>
			{isArticle && 	<ReactMarkdown>{body}</ReactMarkdown>}
		</div>
	)
}

export default Article