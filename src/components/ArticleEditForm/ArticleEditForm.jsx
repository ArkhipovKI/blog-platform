import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import ArticleForm from '../ArticleForm/ArticleForm';
import styles from './ArticleEditForm.module.scss';
import classnames from 'classnames/bind';
import {useParams} from 'react-router-dom'

const cn = classnames.bind(styles)

const ArticleEditForm = () => {
	const { slug } = useParams();
	return (
		<article key={uuidv4()} className={cn('article')}>
			<ArticleForm slug={slug} {...slug} />
		</article>
	);
}

export default ArticleEditForm