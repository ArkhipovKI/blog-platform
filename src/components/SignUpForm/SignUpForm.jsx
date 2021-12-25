import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { confirmMessage } from './../../redux/actions/actions';
import { signUpThunk } from '../../redux/actions/actions';
import classnames from 'classnames/bind';
import styles from './SignUpForm.module.scss';

const cn = classnames.bind(styles)

const SignUpForm = () => {
	const dispatch = useDispatch();
	const {errorMessage, alert} = useSelector(state => state.message)
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
		watch,
	} = useForm({ mode: 'all' });

	const onSubmit = (data) => {
		dispatch(signUpThunk(data));
		reset();
	};

	return (
		<div className={cn('form-wrapper')}>
			{alert ? (
				<div className={cn('error-message')}>
					{errorMessage ? errorMessage.join('') : 'Congratulation '}
					<button label="button" type="button" onClick={() => dispatch(confirmMessage(false))}>
						OK
					</button>
				</div>
			) : (
				<form className={cn('form')} onSubmit={handleSubmit(onSubmit)}>
					<legend className={cn('title')}>Create new account</legend>
					<label htmlFor="userName" className={cn('name-lable')}>
						<span>Username</span>
					</label>
					<input
						className={`${errors?.username && cn('error-input')}`}
						id="userName"
						placeholder="Username"
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
					<span className={cn('validate-message')}>{errors?.username && errors?.username?.message}</span>
					<label htmlFor="email" className={cn('email-lable')}>
						<span>Email address</span>
					</label>
					<input
						className={`${errors?.email && cn('error-input')}`}
						id="email"
						type="email"
						placeholder="Email address"
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
						<span>Password</span>
					</label>
					<input
						className={`${errors?.password && cn('error-input')}`}
						id="password"
						placeholder="Password"
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
					<label htmlFor="repeatPassword">
						<span>Repeat Password</span>
					</label>
					<input
						id="repeatPassword"
						placeholder="Repeat Password"
						className={`${cn('repeat-input')} ${errors?.repeatPassword && cn('error-input')}`}
						{...register('repeatPassword', {
							validate: (value) => value === watch('password', '') || 'Не верный пароль',
							required: 'Это поле не может быть пустым.',
						})}
					/>
					<span className={cn('validate-message')}>
						{errors?.repeatPassword && errors?.repeatPassword?.message}
					</span>
					<label className={cn('checkbox-label')}>
						<input
							type="checkbox"
							className={`${cn('checkbox')}`}
							{...register('checkbox', {
								required: 'Требуется согласие.',
							})}
						/>
						<span className={`${cn('check')} ${errors?.checkbox && cn('error-input')}`} />I agree to
						the processing of my personal information
					</label>
					<span className={cn('validate-message')}>{errors?.checkbox && errors?.checkbox?.message}</span>
					<input type="submit" value="Create" className={cn('button')} />
					<span className={cn('link')}>
						Already have an account? <Link to="/sign-in">Sign In.</Link>
					</span>
				</form>
			)}
		</div>
	);
} 

export default SignUpForm