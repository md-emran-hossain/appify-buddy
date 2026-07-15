import ExploreMenu from "@/components/feed/ExploreMenu";
import SuggestedPeople from "@/components/feed/SuggestedPeople";
import EventReminders from "@/components/feed/EventReminders";

const LeftSidebar = () => (
  <div className="d-none d-lg-block col-xl-3 col-lg-3">
    <div
      className="d-flex flex-column overflow-y-auto overflow-x-hidden pt-3 gap-0"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <ExploreMenu />
      <SuggestedPeople />
      <EventReminders />
    </div>
  </div>
);

export default LeftSidebar;
