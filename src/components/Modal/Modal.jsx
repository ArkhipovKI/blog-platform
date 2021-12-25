import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteArticleThunk, showModal } from './../../redux/actions/actions';
import imageModal from './../../assets/images/modal.svg';
import classes from './Modal.module.scss';

export const Modal = (props) => {
	const dispatch = useDispatch();
	const { token } = useSelector(state => state.user.user);
	const { slug } = props;

	const articleDelete = () => {
		dispatch(deleteArticleThunk(token, slug));
		dispatch(showModal(false));
	};

	return (
		<div className={classes['modal-card']}>
			<div className={classes['modal-info']}>
				<img src={imageModal} alt="alert" className={classes['modal-image']} />
				<p className={classes.text}>Are you sure to delete this article?</p>
			</div>
			<div className={classes['modal-buttons']}>
				<button type="button" className={classes['btn-no']} onClick={() => dispatch(showModal(false))}>
					No
				</button>
				<button type="button" className={classes['btn-yes']} onClick={() => articleDelete()}>
					Yes
				</button>
			</div>
		</div>
	);
};

export default Modal