import YouMightLike from "@/components/feed/YouMightLike";
import YourFriends from "@/components/feed/YourFriends";

const RightSidebar = () => (
  <div className="d-none d-lg-block col-xl-3 col-lg-3">
    <div
      className="d-flex flex-column overflow-y-auto overflow-x-hidden pt-3 gap-0"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <YouMightLike />
      <YourFriends />
    </div>
  </div>
);

export default RightSidebar;
