"use client";
import Link from "next/link";
import Image from "next/image";
import {
  SearchIcon,
  HomeIcon,
  FriendsIcon,
  NotificationIcon,
  MessagesIcon,
} from "@/components/shared/Icons";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "@/lib/auth-context";

const DesktopNavbar = () => {
  const { user } = useAuth();
  const userName = user ? `${user.firstName} ${user.lastName}` : "";
  const userInitials = user ? `${user.firstName[0]}${user.lastName[0]}` : "";

  return (
  <nav className="navbar navbar-expand-lg navbar-light header_nav d-none d-lg-flex fixed-top pt-0 pb-0">
    <div className="container">
      <div className="d-flex align-items-center">
        <Link className="navbar-brand" href="#">
          <Image
            width={150}
            height={50}
            src="/assets/images/logo.svg"
            alt="Image"
            className="nav_logo img-fluid w-100 d-block"
          />
        </Link>
      </div>
      <button
        className="navbar-toggler bg-light"

        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        {" "}
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="header_form ms-auto">
          <form className="position-relative">
            <SearchIcon />
            <input
              className="form-control me-2 inpt1"
              type="search"
              placeholder="input search text"
              aria-label="Search"
            />
          </form>
        </div>
        <ul className="navbar-nav mb-2 mb-lg-0 ms-auto me-2 list-unstyled m-0 p-0">
          <li className="nav-item mx-2">
            <Link
              className="nav-link nav-icon-link active p-3"
              aria-current="page"
              href="#"
            >
              <HomeIcon />
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link
              className="nav-link nav-icon-link p-3"
              aria-current="page"
              href="#"
            >
              <FriendsIcon />
            </Link>
          </li>
          <li className="nav-item mx-2 dropdown">
            <span
              className="nav-link nav-icon-link p-3"
              data-bs-toggle="dropdown"
              role="button"
              aria-expanded="false"
              style={{ cursor: "pointer" }}
            >
              <span className="position-relative">
                <NotificationIcon />
                <span className="position-absolute translate-middle badge rounded-pill bg-primary">
                  6
                </span>
              </span>
            </span>
            <NotificationDropdown />
          </li>
          <li className="nav-item mx-2">
            <Link
              className="nav-link nav-icon-link p-3"
              aria-current="page"
              href="#"
            >
              <span className="position-relative">
                <MessagesIcon />
                <span className="position-absolute translate-middle badge rounded-pill bg-primary">
                  2
                </span>
              </span>
            </Link>
          </li>
        </ul>
        <div className="d-flex align-items-center position-relative dropdown">
          <div className="flex-shrink-0 me-2">
            {user?.avatarUrl ? (
              <Image
                width={24}
                height={24}
                src={user.avatarUrl}
                alt={userName}
                className="avatar object-fit-cover"
              />
            ) : (
              <div
                className="avatar bg-primary text-white d-flex align-items-center justify-content-center rounded-circle"
                style={{ width: 24, height: 24, fontSize: 10 }}
              >
                {userInitials}
              </div>
            )}
          </div>
          <div
            className="d-flex align-items-center text-decoration-none"
            data-bs-toggle="dropdown"
            role="button"
            aria-expanded="false"
            style={{ cursor: "pointer" }}
          >
            <p className="fs-6 fw-normal text-body mb-0">{userName}</p>
            <button className="btn btn-link p-0 border-0 ms-2 text-body d-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="6"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  fill="currentColor"
                  d="M5 5l.354.354L5 5.707l-.354-.353L5 5zm4.354-3.646l-4 4-.708-.708 4-4 .708.708zm-4.708 4l-4-4 .708-.708 4 4-.708.708z"
                />
              </svg>
            </button>
          </div>

          <ProfileDropdown />
        </div>
      </div>
    </div>
  </nav>
  );
};

export default DesktopNavbar;
