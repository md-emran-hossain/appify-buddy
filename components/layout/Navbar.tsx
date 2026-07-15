"use client";
import DesktopNavbar from './DesktopNavbar';
import MobileTopBar from './MobileTopBar';
import MobileBottomBar from './MobileBottomBar';

const Navbar = () => {
  return (
    <>
      <DesktopNavbar />
      <MobileTopBar />
      <MobileBottomBar />
    </>
  );
};

export default Navbar;
