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
    { href: '/scooters', name: 'Scooters' },
  ];

  const subFooterLinks = [
    { href: '/terms', name: 'Terms' },
    { href: '/privacy', name: 'Privacy' },
  ];

  return (
    <div className={styles.footerWrapper}>
      <footer className={styles.footer}>
        <div className={styles.footerLogotypeWrapper}>
          <div className={styles.footerLogotype}>
            <Image
              alt={'logotype'}
              src={footerLogoImg}
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
        </div>
        <div className="container">
          <div className={styles.footerContentWrapper}>
            {footerLinks.map((footerLink) => (
              <Link href={footerLink.href} key={footerLink.href} className={styles.footerLink}>
                {footerLink.name}
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.SubNavbar}>
          <div className="container">
            <div className="row row-cols-auto align-items-center">
              {subFooterLinks.map((subFooterLink) => (
                <Link href={subFooterLink.href} key={subFooterLink.href} className={styles.footerLink}>
                  {subFooterLink.name}
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
