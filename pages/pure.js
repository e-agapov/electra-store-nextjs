import Image from 'next/image';
import HeaderImage from '../assets/images/pure/header.png';
import mwwws from '../assets/images/pure/mwwws.jpg';
import mws from '../assets/images/pure/mws.jpg';
import palmLeaf from '../assets/images/pure/palm-leaf.jpg';
import weCreateTransportSystem from '../assets/images/pure/wects.jpg';
import FAQComponent from '../components/FAQComponent';
import Layout from '../components/Layout';
import SectionBlock from '../components/SectionBlock';
import styles from '../scss/pages/Pure.module.scss';

const Pure = () => {
	const textForColumn = `We gethered differend kinds of scooters. Everyone can find a scooter for themselves.WeWe gethered differend kinds of scooters. Everyone can find a scooter for themselves.We gethered differend kinds of scooters. Everyone can find a scooter for themselves. gethered differend kinds of scooters. Everyone can find a scooter for themselves.We gethered differend kinds of scooters. Everyone can find a scooter for themselves.We gethered differend kinds of scooters. Everyone can find a scooter for themselves.`;

	return (
		<Layout title="Pure – Electra" description="Internet store">
			<section className={styles.headerImage}>
				<Image src={HeaderImage} alt="" priority />
			</section>

			<div className="container">
				<SectionBlock
					classes={styles.textSectionWithText}
					title={'Showrooms all over the world'}
					imagePosition={'right'}
					imgSrc={palmLeaf}
					textForColumn={textForColumn}
					link={'/transport'}
					linkName={'Transport'}
				/>

				<section>
					<Image src={weCreateTransportSystem} alt="" priority />
					<div
						className={`${styles.textWeCreateTransportSystem} px-3`}
					>
						We gethered differend kinds of scooters. Everyone can
						find a scooter for themselves. WeWe gethered differend
						kinds of scooters. Everyone can find a scooter for
						themselves.We gethered differend kinds of scooters.
					</div>
				</section>

				<section className={styles.textSectionWithText}>
					<SectionBlock
						title={'Transport sharing'}
						imagePosition={'right'}
						imgSrc={mwwws}
						textForColumn={textForColumn}
						link={'/transport'}
						linkName={'Transport'}
					/>

					<SectionBlock
						title={'We solve traffic problems'}
						imgSrc={mws}
						textForColumn={textForColumn}
						link={'/transport'}
						linkName={'Transport'}
					/>
				</section>

				<FAQComponent classes={styles.faq} />
			</div>
		</Layout>
	);
};

export default Pure;
