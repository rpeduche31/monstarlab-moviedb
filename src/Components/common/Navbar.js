import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Col } from 'antd';
import { useHistory, useParams } from 'react-router-dom';

const TopBar = styled.div`
	width: 100%;
	height: 55px;
	z-index: 100;
	display: flex;
	position: fixed;
	top: 0;
	left: 0;

	.bgColor {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: #0c0c0c;
	}
	.first-column {
		display: flex;
		width: 50%;
		cursor: pointer;
		font-size: 14px;
		align-items: center;
		justify-content: flex-start;
		.first-column-title {
			font-size: 24px !important;
			z-index: 10;
			font-weight: bolder;
			color: #00ffdc;
			margin-left: 50px;
		}
	}
	.second-column {
		display: flex;
		justify-content: space-around;
		width: 50%;
		cursor: pointer;
		color: #929292;
		font-size: 14px;
		align-items: center;
		.first-column-title {
			font-size: 24px !important;
			z-index: 10;
			font-weight: bolder;
			color: #00ffdc;
		}
		p {
			margin: 0;
			z-index: 10;
			width: 25%;
			text-align: center;
			font-weight: 500;
			transition: all 0.5s ease;
			&:hover {
				color: #00ffdc;
				transition: all 0.5s ease;
			}
		}
	}
`;

export default () => {
	const history = useHistory();
	const [activeKey, setActiveKey] = useState('/now-playing');
	const { movie_type } = useParams();
	const changePath = (key) => {
		history.push(key);
		setActiveKey(key);
	};

	useEffect(() => {
		setActiveKey(movie_type);
	}, [movie_type]);

	return (
		<TopBar>
			<div className="bgColor" />
			<Col className="first-column">
				<span className="first-column-title">MONSTARLAB MOVIEDB</span>
			</Col>
			<Col className="second-column">
				<p
					style={{ color: activeKey?.includes('now-playing') && '#00ffdc' }}
					onClick={() => changePath('/now-playing')}
				>
					NOW PLAYING
				</p>
				<p
					style={{ color: activeKey?.includes('popular') && '#00ffdc' }}
					onClick={() => changePath('/popular')}
				>
					POPULAR
				</p>
				<p
					style={{ color: activeKey?.includes('top-rated') && '#00ffdc' }}
					onClick={() => changePath('/top-rated')}
				>
					TOP RATED
				</p>
				<p
					style={{ color: activeKey?.includes('upcoming') && '#00ffdc' }}
					onClick={() => changePath('/upcoming')}
				>
					UPCOMING
				</p>
				<p
					style={{ color: activeKey?.includes('favorites') && '#00ffdc' }}
					onClick={() => changePath('/favorites')}
				>
					FAVORITES
				</p>
			</Col>
		</TopBar>
	);
};
