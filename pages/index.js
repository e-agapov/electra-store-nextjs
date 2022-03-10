import Image from 'next/image';
import headerPicMobile from '../assets/images/mainMobilePageHeaderImg.png';
import headerPic from '../assets/images/mainPageHeaderImg.png';
import Layout from '../components/Layout';
import styles from '../scss/pages/Home.module.scss';

export default function Home() {
	return (
		<Layout home={true} title="Electra Store" description="Internet store">
			<section className={`d-none d-sm-block mt-5`}>
				<Image src={headerPic} alt="" priority />
			</section>
			<section
				className={`d-block d-sm-none mt-5 ${styles.mobileHeaderPic}`}
			>
				<Image src={headerPicMobile} alt="" priority />
			</section>
		</Layout>
	);
}
