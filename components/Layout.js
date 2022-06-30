import { useState } from 'react';
import Footer from './Footer';
import HeadTag from './HeadTag';
import MobileMenu from './MobileMenu';
import Navbar from './Navbar';

function Layout({ children, description, themeColor, title }) {
	const [menuVisibility, setMenuVisibility] = useState(false);

	function toggleMenu() {
		setMenuVisibility(!menuVisibility);
		document.body.classList.toggle('hide-body');
	}

	return (
		<div className={'layout'}>
			<HeadTag
				description={description}
				title={title}
				themeColor={themeColor}
			/>

			<MobileMenu isVisible={menuVisibility} toggleMenu={toggleMenu} />
			{!menuVisibility && (
				<>
					<Navbar toggleMenu={toggleMenu} />
					<main>{children}</main>
					<Footer />
				</>
			)}
		</div>
	);
}

export default Layout;
