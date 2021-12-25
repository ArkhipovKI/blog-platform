import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setEditUserThunk, setLoadingAction } from './../../redux/actions/actions';
import classnames from 'classnames/bind';
import styles from './EditProfileForm.module.scss'
import {useNavigate} from 'react-router-dom'

const cn = classnames.bind(styles)

const EditProfileForm = memo(() => {
	const navigate = useNavigate()
	const dispatch = useDispatch();
	const { user } = useSelector(state=> state.user);
	const { username, email, token } = user;

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({ mode: 'all' });

	const onSubmit = (data) => {
		dispatch(setEditUserThunk(data, token));
		dispatch(setLoadingAction(true))
		navigate('/article')
	};

	return (
		<div className={cn('form-wrapper')}>
			<form className={cn('form')} onSubmit={handleSubmit(onSubmit)}>
				<legend className={cn('title')}>Edit Profile</legend>
				<label htmlFor="userName" className={cn('name-lable')}>
					<span>Username</span>
				</label>
				<input
					className={`${errors?.username && cn('error-input')}`}
					id="userName"
					placeholder="Username"
					defaultValue={username}
					{...register('username', {
						required: 'Это поле не может быть пустым.',
						minLength: {
							value: 3,
							message: 'Не менее 3 символов.',
						},
						maxLength: {
							value: 20,
							message: 'Не более 20 символов.',
						},
					})}
				/>
				<span className={cn('validate-message')}>{errors?.userName && errors?.userName?.message}</span>
				<label htmlFor="email" className={cn('email-lable')}>
					<span>Email address</span>
				</label>
				<input
					className={`${errors?.email && cn('error-input')}`}
					id="email"
					placeholder="Email address"
					defaultValue={email}
					{...register('email', {
						required: 'Это поле не может быть пустым.',
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: 'Не корректный адрес.',
						},
					})}
				/>
				<span className={cn('validate-message')}>{errors?.email && errors?.email?.message}</span>
				<label htmlFor="password" className={cn('password-lable')}>
					<span>New password</span>
				</label>
				<input
					className={`${errors?.password && cn('error-input')}`}
					id="password"
					placeholder="New password"
					{...register('password', {
						required: 'Это поле не может быть пустым.',
						minLength: {
							value: 6,
							message: 'Не менее 6 символов.',
						},
						maxLength: {
							value: 40,
							message: 'Не более 40 символов.',
						},
					})}
				/>
				<span className={cn('validate-message')}>{errors?.password && errors?.password?.message}</span>
				<label htmlFor="url">
					<span>Avatar image (url)</span>
				</label>
				<input
					id="url"
					type="url"
					placeholder="Avatar image"
					className={`${cn('url-input')} ${errors?.image && cn('error-input')}`}
					{...register('image', {
						pattern: {
							message: 'Не верный url',
						},
					})}
				/>
				<span className={cn('validate-message')}>{errors?.image && errors?.image?.message}</span>
				<input type="submit" value="Save" className={cn('button')} />
			</form>
		</div>
	);
})

export default EditProfileForm