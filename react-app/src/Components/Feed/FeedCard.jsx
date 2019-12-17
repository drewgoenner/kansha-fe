import React, { useEffect, memo, useMemo } from 'react';
import {
	Typography,
	Card,
	IconButton,
	Box,
	Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadPostData } from '../../store/actions/feed-actions';
import { ReactionButton } from './ReactionButton';
import { timeAgo } from '../../utils/timeago';

import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined';

const useStyles = makeStyles(theme => ({
	FeedCard: {
		display: 'flex',
		padding: '20px',
		color: '#FFFFFF',
		background: '#2D2C35',
		margin: '10px 0',
	},
	FeedCardPicture: {
		position: 'relative',
		width: '100px',
	},
	FeedCardContent: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	ButtonBox: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		width: '100%',
	},
	CommentButton: {
		backgroundColor: 'rgba(80, 80, 80, 0.21)',
		padding: '2px 8px',
		borderRadius: '30px',
		marginRight: '5px',
	},
	CommentIcon: {
		color: '#FFFFFF;',
		height: '22px',
		margin: 0,
		padding: 0,
	},
	Count: {
		fontFamily: 'Montserrat',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: '16px',
		lineHeight: '22px',
		display: 'flex',
		alignItems: 'center',
		letterSpacing: '0.1px',
		color: 'rgba(255, 255, 255, 0.7)',
		margin: 0,
		padding: 0,
		paddingLeft: '5px',
		paddingTop: '1px',
	},
	Name: {
		color: '#EE4D71',
		textDecoration: 'none',
		'& :visited': {
			color: '#EE4D71',
		},
	},
	SentProfilePic: {
		position: 'absolute',
		borderRadius: '100%',
		// Hard coding until we can make a circle img cropper for users
		width: '40px',
		height: '40px',
		background: 'linear-gradient(135deg, #EE4D71 0%, #F15A3F 100%)',
		objectFit: 'cover',
		objectPosition: '50% 50%',
		left: '10px',
	},
	RecievedProfilePic: {
		position: 'absolute',
		borderRadius: '100%',
		// Hard coding until we can make a circle img cropper for users
		width: '40px',
		height: '40px',
		background: 'linear-gradient(135deg, #EE4D71 0%, #F15A3F 100%)',
		objectFit: 'cover',
		objectPosition: '50% 50%',
		right: '10px',
	},
	Info: {
		fontFamily: 'Montserrat',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: '16px',
		lineHeight: '20px',
	},
	TimeStamp: {
		/* Body */
		fontFamily: 'Montserrat',
		fontStyle: 'normal',
		fontHeight: 'normal',
		fontSize: '16px',
		lineHeight: '20px',
		color: 'rgba(255, 255, 255, 0.5)',
		marginLeft: '10px'
	},
}));

export const FeedCard = memo(({ rec, comments, reactions, profile }) => {
	const classes = useStyles();
	const { id: rec_id } = rec;
	const dispatch = useDispatch();
	useEffect(() => {
		if (!(reactions || comments)) {
			dispatch(loadPostData(rec_id));
		}
	}, [dispatch, rec_id, reactions, comments]);
	const time = useMemo(() => timeAgo(rec.date), [rec]);
	return (
		<Card className={classes.FeedCard}>
			<Container className={classes.FeedCardPicture}>
				<Box>
					<img
						className={classes.SentProfilePic}
						src={rec.profile_picture}
						alt=""
					/>
					<img
						className={classes.RecievedProfilePic}
						src={rec.recipient_picture}
						alt=""
					/>
				</Box>
			</Container>
			<Container className={classes.FeedCardContent}>
				<Typography className={classes.Info}>
					<Link
						className={classes.Name}
						to={`/profile/${rec.sender}`}>
						{rec.first_name} {rec.last_name}
					</Link>{' '}
					sent to{' '}
					<Link
						className={classes.Name}
						to={`/profile/${rec.recipient}`}>
						{rec.recipient_first} {rec.recipient_last}
					</Link>{' '}
					<span className={classes.TimeStamp}>{time}</span>
				</Typography>
				<Typography>{rec.message}</Typography>
				<Box className={classes.ButtonBox}>
					{comments && (
						<IconButton className={classes.CommentButton}>
							<AddCommentOutlinedIcon
								className={classes.CommentIcon}
							/>
							<Typography className={classes.Count}>
								{comments.length}
							</Typography>
						</IconButton>
					)}
					{reactions && (
						<>
							<ReactionButton
								id={profile.id}
								rec_id={rec_id}
								reactions={reactions}
							/>
						</>
					)}
				</Box>
			</Container>
			{/*
			<button onClick={() => dispatch(addComment(rec_id, comment))}>
				comment
			</button>
			*/}
		</Card>
	);
});
