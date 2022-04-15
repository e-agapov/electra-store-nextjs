import Image from 'next/image';
import Link from 'next/link';
import LogoImage from '../assets/images/logo.png';
import SubNavbar from './SubNavbar';
import BurgerMenuBtn from './ui/BurgerMenuBtn';
import CartIcon from './ui/CartIcon';

function Navbar({ toggleMenu }) {
	return (
		<div className="navbar">
			<div className="container">
				<nav
					className={
						'd-flex align-items-center justify-content-start'
					}
				>
					<div className="navbarLogotypeLink">
						<Link href={'/'}>
							<a>
								<Image
									className="navbarLogotypeImg"
									alt={'Logo'}
									src={LogoImage}
									priority
								/>
							</a>
						</Link>
					</div>

					<div className="rowContainer">
						<div className="NavLinksContainer">
							<Link href={'/transport'}>
								<a className="navLink">Transport</a>
							</Link>
							<Link href={'/accessories'}>
								<a className="navLink">
									Accessories {'&'} Parts
								</a>
							</Link>
						</div>

						<Link href={'/cart'}>
							<a className="navbarCartLink ms-auto">
								<CartIcon />
							</a>
						</Link>

						<BurgerMenuBtn action={toggleMenu} />
					</div>
				</nav>
			</div>

			<SubNavbar />
		</div>
	);
}

export default Navbar;
