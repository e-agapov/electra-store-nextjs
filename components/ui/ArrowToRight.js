const ArrowToRight = ({ styles }) => {
	return (
		<div className={styles}>
			<svg width="56" height="56" viewBox="0 0 56 56">
				<circle
					cx="28"
					cy="28"
					r="27"
					fill="none"
					stroke="white"
					strokeWidth="2"
				/>
				<path
					d="M43.7071 28.7071C44.0976 28.3166 44.0976 27.6834 43.7071 27.2929L37.3431 20.9289C36.9526 20.5384 36.3195 20.5384 35.9289 20.9289C35.5384 21.3195 35.5384 21.9526 35.9289 22.3431L41.5858 28L35.9289 33.6569C35.5384 34.0474 35.5384 34.6805 35.9289 35.0711C36.3195 35.4616 36.9526 35.4616 37.3431 35.0711L43.7071 28.7071ZM14 29H43V27H14V29Z"
					fill="white"
				/>
			</svg>
		</div>
	);
};

export default ArrowToRight;
