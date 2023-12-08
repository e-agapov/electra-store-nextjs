import Link from 'next/link';
import LocationIcon from './ui/sub-navbar/LocationIcon';
import PureIcon from './ui/sub-navbar/PureIcon';
import ServiceIcon from './ui/sub-navbar/ServiceIcon';

export default function SubNavbar() {
  return (
    <div className="subNavbar">
      <div className="container">
        <div className="linkWrapper">
          <Link href="/showrooms" className="subNavLink">
            Showrooms <LocationIcon className="icon" />
          </Link>
          <Link href="/service" className="subNavLink">
            Service <ServiceIcon className="icon" />
          </Link>
          <Link href="/pure" className="subNavLink">
            Pure <PureIcon className="icon" />
          </Link>
        </div>
      </div>
    </div>
  );
}
