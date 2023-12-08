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
        <nav className={'d-flex align-items-center justify-content-start'}>
          <div className="navbarLogotypeLink">
            <Link href="/">
              <Image
                className="navbarLogotypeImg"
                alt="Logo"
                src={LogoImage}
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                priority
              />
            </Link>
          </div>

          <div className="rowContainer">
            <div className="NavLinksContainer">
              <Link href="/transport" className="navLink">
                Transport
              </Link>
              <Link href="/accessories" className="navLink">
                Accessories & Parts
              </Link>
            </div>

            <Link href="/cart" className="navbarCartLink ms-auto">
              <CartIcon />
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
