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
	const texts = {
		first: 'We gethered differend kinds of scooters. Everyone can find a scooter for themselves.WeWe gethered differend kinds of scooters. Everyone can find a scooter for themselves.We gethered differend kinds of scooters. Everyone can find a scooter for themselves. gethered differend kinds of scooters. Everyone can find a scooter for themselves.We gethered differend kinds of scooters. Everyone can find a scooter for themselves.We gethered differend kinds of scooters. Everyone can find a scooter for themselves.',

		second: 'Everyone can find a scooter for themselves. gethered differend kinds of scooters. Everyone can find a scooter for themselves.We gethered differend kinds of scooters. Everyone can find a scooter for themselves.We gethered differend kinds of scooters. Everyone can find a scooter for themselves.',

		last: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	};

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
					textForColumn={texts.first}
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
						textForColumn={texts.second}
						link={'/transport'}
						linkName={'Transport'}
					/>

					<SectionBlock
						title={'We solve traffic problems'}
						imgSrc={mws}
						textForColumn={texts.last}
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
