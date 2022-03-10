import styles from '../../scss/components/ui/BurgerMenuBtn.module.scss';

const BurgerMenuBtn = ({ action = false }) => {
	return (
		<div onClick={action} className={styles.burgerMenuBtn}>
			<svg width="19" height="8" viewBox="0 0 19 8">
				<line y1="0.5" x2="19" y2="0.5" stroke="black" />
				<line y1="7.5" x2="19" y2="7.5" stroke="black" />
			</svg>
		</div>
	);
};

export default BurgerMenuBtn;
