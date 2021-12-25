import React, {useState} from 'react';
import styles from './PostList.module.scss'
import classnames from 'classnames/bind';
import Post from './../Post/Post'
import { v4 as uuidv4 } from 'uuid';
import { Pagination } from 'antd';

const cn = classnames.bind(styles)

const PostList = (posts) => {
	const articles = Object.values(posts)
	const [currentPage, setCurrentPage] = useState(1)
	const perPage = 5;
	const onChange = (current) => {
		setCurrentPage(current)
	}
	const indexOfFirstPage = currentPage*5 - 5;
	const indexOfLastPage = indexOfFirstPage + 5;	
	const slicedPosts = articles.slice(indexOfFirstPage, indexOfLastPage)

	return (
		<>
			<div className={cn('main-wrapper')}>
				{slicedPosts.map(article => 
					<Post 
						key = {uuidv4()}
						{...article} 
					/>
				)}
			</div>
			< Pagination 
				current={currentPage}
				pageSize={perPage}
				onChange={onChange}
				total={articles.length}
				style = {{textAlign: 'center', paddingBottom: '20px'}}
			/>
		</>
	)
}

export default PostList