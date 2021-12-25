import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import { confirmMessage } from './../../redux/actions/actions';
import { loginUserThunk, confirmMessage } from './../../redux/actions/actions';
import classnames from 'classnames/bind';
import styles from './SignInForm.module.scss';

const cn = classnames.bind(styles)

const SignInForm = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch();
	const {login} = useSelector(state => state.user)
	const {alert} = useSelector(state => state.message)
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({ mode: 'all' });

	useEffect(() => login && navigate('/article'), [login, navigate])

	const onSubmit = (data) => {
		dispatch(loginUserThunk(data));
		reset();
	};

	return (
		<div className={cn('form-wrapper')}>
			{alert ? (
			<div className={cn('error-message')}>
				Неверный логин или пароль
				<button label="button" type="button" onClick={() => dispatch(confirmMessage(false))}>
					OK
				</button>
			</div>) : (
				<form className={cn('form')} onSubmit={handleSubmit(onSubmit)}>
					<legend className={cn('title')}>Sign In</legend>
					<label htmlFor="email" className={cn('email-lable')}>
						<span>Email address</span>
					</label>
					<input
						className={`${errors?.email && cn('error-input')}`}
						id="email"
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
					<input type="submit" value="Login" className={cn('button')} />
					<span className={cn('link')}>
						Already have an account? <Link to="/sign-up">Sign Up.</Link>
					</span>
				</form>
	)}
	</div>
	)
}

export default SignInForm