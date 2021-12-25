import React, {memo} from 'react';
import styles from './Header.module.scss'
import classnames from 'classnames/bind';
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {logOutAction} from './../../redux/actions/actions'
import avatar from './../../assets/images/defaultAvatar.png'

const cn = classnames.bind(styles)

const Header = memo(() => {
	const {user} = useSelector(state => state.user)
	const {username, image} = user
	const dispatch = useDispatch();
	const {login} = useSelector(state => state.user)

	return (
		<div className={cn('header')}>
			<nav className={cn('header-wrapper')}>
				<Link to='/article' className={cn('header-site--name')}>RealWorld Blog</Link>
				{login && 
				<>
					<Link to='/new-article' className={cn('header-new--article')}>
						<span>Create article</span>
					</Link>
					<Link to='/profile' className={cn('user-name')}>
						{username}
					</Link>
					<Link to='/profile' className={cn('user-avatar')}>
						<img src={image || avatar} alt='user'/>
					</Link>
					<Link to='/article' className={cn('header-log--out')}>
						<button onClick={() => dispatch(logOutAction())}>Log Out</button>
					</Link>
				</>}
				{!login && ( 
				<>
					<Link to='/sign-in' className={cn('header-sign--in')}>
						<span>Sign in</span>
					</Link>
					<Link to='/sign-up' className={cn('header-sign--up')}>
						<span>Sign up</span>
					</Link>
				</>
				)}
			</nav>
		</div>
	)
})

export default Header