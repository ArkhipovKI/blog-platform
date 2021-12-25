import React, {memo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useForm, useFieldArray } from 'react-hook-form';
import { editPostThunk , setLoadingAction, setEditArticleAction, createPostThunk } from './../../redux/actions/actions';
import classnames from 'classnames/bind';
import styles from './ArticleForm.module.scss';
import {useNavigate} from 'react-router-dom'

const cn = classnames.bind(styles)

const ArticleForm = memo(({slug}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const { edit } = useSelector(state => state.posts)
	const { posts } = useSelector(state => state.posts)
	const { token } = useSelector(state => state.user.user);
	const article = posts.find((el) => el.slug === slug);
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
		control,
	} = useForm({
		defaultValues: !edit
			? { tagList: [{ tagName: '' }] }
			: { ...article, tagList: [...article.tagList.map((item) => ({ tagName: item }))] },
	});
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'tagList',
	});

	const onSubmit = (data) => {
		dispatch(
			!edit ? 
			createPostThunk(
				{
					...data,
					tagList: data.tagList.reduce((acc, tag) => 
						(tag.tagName.length ? [...acc, tag.tagName] : acc),
				[]),},
					token 
			) :  
			editPostThunk(
				{
					...data,
					tagList: data.tagList.reduce((acc, tag) => 
						(tag.tagName.length ? [...acc, tag.tagName] : acc),
				[]),},
					token, 
					slug
			)

		);
		dispatch(setEditArticleAction(false));
		dispatch(setLoadingAction(true))
		navigate('/article')
		reset()
	};

	return (
		<form className={cn('form')} onSubmit={handleSubmit(onSubmit)}>
			<legend className={cn('title')}>{!edit ? 'Create new article' : 'Edit article'}</legend>
			<label htmlFor="title" className={cn('title-lable')}>
				<span>Title</span>
			</label>
			<input
				id="title"
				placeholder="Title"
				className={cn('input-title')}
				{...register('title', {
					required: 'Это поле не может быть пустым.',
				})}
			/>
			<span className={cn('validate-message')}>{errors?.title && errors?.title?.message}</span>
			<label htmlFor="description" className={cn('description-lable')}>
				<span>Short description</span>
			</label>
			<input
				id="description"
				placeholder="Title"
				className={cn('input-title')}
				{...register('description', {
					required: 'Это поле не может быть пустым.',
				})}
			/>
			<span className={cn('validate-message')}>{errors?.description && errors?.description?.message}</span>
			<label htmlFor="textarea" className={cn('textarea-lable')}>
				<span>Text</span>
			</label>
			<textarea
				id="textarea"
				placeholder="Text"
				className={cn('textarea')}
				{...register('body', {
					required: 'Это поле не может быть пустым.',
				})}
			/>
			<span className={cn('validate-message')}>{errors?.body && errors?.body?.message}</span>
			<div className={cn('tag-wrapper')}>
				<div className={cn('tag-column')}>
					<label htmlFor="tag" className={cn('tags-lable')}>
						<span>Tags</span>
					</label>
					<ul>
						{fields.map((item, index) => (
							<li key={uuidv4()} className={cn('li')}>
								<input
									id={item.id}
									placeholder="Tag"
									defaultValue={item.lable}
									className={cn('tag')}
									{...register(`tagList.${index}.tagName`)}
								/>
								<button
									type="button"
									className={cn('button-delete')}
									onClick={() => remove(index)}
								>
									Delete
								</button>
							</li>
						))}
					</ul>
				</div>
				<button
					type="button"
					className={cn('button-add')}
					onClick={() => {
						append({ tagName: '' });
					}}
				>
					Add tag
				</button>
			</div>
			<input type="submit" value="Send" className={cn('button')} />
		</form>
	);
})

export default ArticleForm