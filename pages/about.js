import Image from 'next/image';
import Layout from '../components/Layout';
import headerPic from '../assets/images/mainPageHeaderImg.png';
import headerPicMobile from '../assets/images/mainMobilePageHeaderImg.png';

export default function About() {
	return (
		<Layout
			title="Electra Store | About"
			description="Internet store -- about"
		>
			<Image src={headerPic} alt="" priority />
		</Layout>
	);
}
