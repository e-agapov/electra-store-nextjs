import Image from 'next/image';
import Link from 'next/link';
import LogoImage from '../assets/images/logo.png';

import CartIcon from './ui/CartIcon';
import SubNavbar from './SubNavbar';
import BurgerMenuBtn from './ui/BurgerMenuBtn';

function Navbar({ toggleMenu }) {
	return (
		<div className="navbar">
			<div className="container">
				<nav
					className={
						'd-flex align-items-center justify-content-between'
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
							<Link href={'/'}>
								<a className="navLink">Transport</a>
							</Link>
							<Link href={'/'}>
								<a className="navLink">
									Accessories {'&'} Parts
								</a>
							</Link>
						</div>

						<Link href={'/'}>
							<a className="navbarCartLink">
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
