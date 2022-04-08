import Image from 'next/image';
import Link from 'next/link';
import footerLogoImg from '../assets/images/footerLogo.png';
import styles from '../scss/components/Footer.module.scss';

const Footer = () => {
	const footerLinks = [
		{ href: '/transport', name: 'Transport' },
		{ href: '/service', name: 'Service' },
		{ href: '/parts', name: 'Parts' },
		{ href: '/bikes', name: 'Bikes' },
		{ href: '/motorbikes', name: 'Motorbikes' },
		{ href: '/scooters', name: 'Scooters' }
	];

	const subFooterLinks = [
		{ href: '/terms', name: 'Terms' },
		{ href: '/privacy', name: 'Privacy' }
	];

	return (
		<div className={styles.footerWrapper}>
			<footer className={styles.footer}>
				<div className={styles.footerLogotypeWrapper}>
					<div className={styles.footerLogotype}>
						<Image alt={'logotype'} src={footerLogoImg} />
					</div>
				</div>
				<div className="container">
					<div className={styles.footerContentWrapper}>
						{footerLinks.map((footerLink, index) => (
							<Link href={footerLink.href} key={index}>
								<a className={styles.footerLink}>
									{footerLink.name}
								</a>
							</Link>
						))}
					</div>
				</div>
				<div className={styles.SubNavbar}>
					<div className="container">
						<div className="row row-cols-auto align-items-center">
							{subFooterLinks.map((subFooterLink, index) => (
								<Link href={subFooterLink.href} key={index}>
									<a className={styles.footerLink}>
										{subFooterLink.name}
									</a>
								</Link>
							))}
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
