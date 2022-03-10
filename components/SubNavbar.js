import Link from 'next/link';

import LocationIcon from './ui/sub-navbar/LocationIcon';
import PureIcon from './ui/sub-navbar/PureIcon';
import ServiceIcon from './ui/sub-navbar/ServiceIcon';

export default function SubNavbar() {
	return (
		<div className="subNavbar">
			<div className="container">
				<div className="linkWrapper">
					<Link href={'/'}>
						<a className="subNavLink">
							Showrooms <LocationIcon className="icon" />
						</a>
					</Link>
					<Link href={'/'}>
						<a className="subNavLink">
							Service <ServiceIcon className="icon" />
						</a>
					</Link>
					<Link href={'/'}>
						<a className="subNavLink">
							Pure <PureIcon className="icon" />
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
}
