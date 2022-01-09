import React, {useState} from 'react';
import styles from './ArticleList.module.scss'
import classnames from 'classnames/bind';
import Article from '../Article/Article'
import { Pagination } from 'antd';

const cn = classnames.bind(styles)

const ArticleList = (posts) => {
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
					<Article 
						key = {article.createdAt + Math.random()}
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

export default ArticleList