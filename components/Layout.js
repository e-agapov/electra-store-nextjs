import { useState } from 'react';
import HeadTag from './HeadTag';
import MobileMenu from './MobileMenu';
import Navbar from './Navbar';

function Layout({ home, children, description, themeColor, title }) {
	const [menuVisibility, setMenuVisibility] = useState(false);

	function toggleMenu() {
		setMenuVisibility(!menuVisibility);
	}

	return (
		<div>
			<HeadTag
				description={description}
				title={title}
				themeColor={themeColor}
			/>

			<MobileMenu isVisible={menuVisibility} toggleMenu={toggleMenu} />
			<Navbar toggleMenu={toggleMenu} />
			<main className={menuVisibility && 'hide-body'}>
				{children}
			</main>
		</div>
	);
}

export default Layout;
