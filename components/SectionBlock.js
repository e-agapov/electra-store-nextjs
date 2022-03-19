import Image from 'next/image';

import ArrowBtn from '../components/ArrowLink';
import styles from '../scss/components/SectionBlock.module.scss';

const SectionBlock = ({
	imagePosition = 'left',
	title,
	link,
	linkName,
	textForColumn,
	imgSrc,
	imgAlt = ''
}) => {
	return imagePosition === 'left' ? (
		<div className="d-flex flex-column flex-lg-row align-items-center justify-content-between px-3 px-lg-5">
			{imgSrc && (
				<div className="col-lg-6 mt-4 mb-5 my-lg-0">
					<Image alt={imgAlt} src={imgSrc} />
				</div>
			)}

			<div className="col-lg-6 ps-lg-5 pt-4">
				{title && (
					<div className={styles.headlineForColumn}>{title}</div>
				)}

				{textForColumn && (
					<div className={styles.textForColumn}>{textForColumn}</div>
				)}

				{link && (
					<div className={'my-4'}>
						<ArrowBtn
							href={link}
							name={
								linkName
									? linkName
									: 'set: linkName for component'
							}
						/>
					</div>
				)}
			</div>
		</div>
	) : (
		<div className="d-flex flex-column flex-lg-row align-items-center justify-content-between px-3 px-lg-5">
			<div className="col-lg-6 pe-lg-5 order-1 order-lg-0">
				{title && (
					<div className={styles.headlineForColumn}>{title}</div>
				)}

				{textForColumn && (
					<div className={styles.textForColumn}>{textForColumn}</div>
				)}

				{link && (
					<div className={'my-4'}>
						<ArrowBtn
							href={link}
							name={
								linkName
									? linkName
									: 'set: linkName for component'
							}
						/>
					</div>
				)}
			</div>
			{imgSrc && (
				<div className="col-lg-6 order-0 order-lg-1 mt-4 mb-5 my-lg-0">
					<div className="d-flex flex-column justify-content-end">
						<Image alt={imgAlt} src={imgSrc} />
					</div>
				</div>
			)}
		</div>
	);
};

export default SectionBlock;
