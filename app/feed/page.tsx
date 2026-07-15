import DarkModeToggle from "@/components/layout/DarkModeToggle";
import Navbar from "@/components/layout/Navbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import MiddleFeed from "@/components/feed/MiddleFeed";
import RightSidebar from "@/components/layout/RightSidebar";

const FeedPage = () => (
  <>
    <DarkModeToggle />
    <div className="bg-theme-main w-100 vh-100 overflow-hidden d-flex flex-column">
      <Navbar />
      <div className="container-xl d-flex flex-column flex-grow-1 overflow-hidden">
        <div className="position-relative d-flex flex-column flex-grow-1 overflow-hidden w-100 pt-5 mt-3">
          <div className="row flex-grow-1 overflow-hidden m-0">
            <LeftSidebar />
            <MiddleFeed />
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default FeedPage;
