import Image from 'next/image';
import footerLogoImg from '../assets/images/footerLogo.png';
import styles from '../scss/components/footer.module.scss';
import Link from 'next/link';
import SubNavbar from './SubNavbar';

const Footer = () => {
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
						<Link href={'/'}>
							<a className={styles.footerLink}>Transport</a>
						</Link>
						<Link href={'/'}>
							<a className={styles.footerLink}>Transport</a>
						</Link>
						<Link href={'/'}>
							<a className={styles.footerLink}>Transport</a>
						</Link>
						<Link href={'/'}>
							<a className={styles.footerLink}>Transport</a>
						</Link>
						<Link href={'/'}>
							<a className={styles.footerLink}>Transport</a>
						</Link>
						<Link href={'/'}>
							<a className={styles.footerLink}>Transport</a>
						</Link>
						<Link href={'/'}>
							<a className={styles.footerLink}>Transport</a>
						</Link>
						<Link href={'/'}>
							<a className={styles.footerLink}>Transport</a>
						</Link>
						<Link href={'/'}>
							<a className={styles.footerLink}>Transport</a>
						</Link>
						<Link href={'/'}>
							<a className={styles.footerLink}>Transport</a>
						</Link>
						<Link href={'/'}>
							<a className={styles.footerLink}>Transport</a>
						</Link>
						<Link href={'/'}>
							<a className={styles.footerLink}>Transport</a>
						</Link>
						<Link href={'/'}>
							<a className={styles.footerLink}>Transport</a>
						</Link>
						<Link href={'/'}>
							<a className={styles.footerLink}>Transport</a>
						</Link>
						<Link href={'/'}>
							<a className={styles.footerLink}>Transport</a>
						</Link>
						<Link href={'/'}>
							<a className={styles.footerLink}>Transport</a>
						</Link>
					</div>
				</div>
				<div className={styles.SubNavbar}>
					<div className="container">
						<div className="row row-cols-auto align-items-center">
							<Link href={'/'}>
								<a className={styles.footerLink}>Transport</a>
							</Link>
							<Link href={'/'}>
								<a className={styles.footerLink}>Transport</a>
							</Link>
							<Link href={'/'}>
								<a className={styles.footerLink}>Transport</a>
							</Link>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
