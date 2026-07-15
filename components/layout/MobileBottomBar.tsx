import Link from 'next/link';
import {
  HomeIcon,
  FriendsIcon,
  NotificationIcon,
  MessagesIcon,
} from "@/components/shared/Icons";

const MobileBottomBar = () => {
  return (
    <div className="d-block d-lg-none fixed-bottom bg-body border-top shadow-sm py-2">
      <div className="container">
        <ul className="mobile_navigation_bottom_list list-unstyled m-0 p-0 d-flex justify-content-between align-items-center">
          <li className="mobile_navigation_bottom_item">
            <Link
              href="#"
              className="mobile_navigation_bottom_link mobile_navigation_bottom_link_active"
            >
              <HomeIcon className="mobile_svg" />
            </Link>
          </li>
          <li className="mobile_navigation_bottom_item">
            <Link
              href="#"
              className="mobile_navigation_bottom_link position-relative"
            >
              <FriendsIcon className="dark_svg" />
            </Link>
          </li>
          <li className="mobile_navigation_bottom_item">
            <Link href="#" className="mobile_navigation_bottom_link">
              <NotificationIcon className="dark_svg" />
              <span className="position-absolute badge rounded-pill bg-primary translate-middle">
                6
              </span>
            </Link>
          </li>
          <li className="mobile_navigation_bottom_item">
            <Link
              href="#"
              className="mobile_navigation_bottom_link position-relative"
            >
              <MessagesIcon className="dark_svg" />
              <span className="position-absolute badge rounded-pill bg-primary translate-middle">
                2
              </span>
            </Link>
          </li>
          <li>
            <button className="btn btn-link p-0 text-decoration-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="14"
                fill="none"
                viewBox="0 0 18 14"
              >
                <path
                  stroke="currentColor"
                  strokeOpacity=".6"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  d="M1 1h16M1 7h16M1 13h16"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileBottomBar;
