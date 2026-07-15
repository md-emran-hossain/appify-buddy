import {
  LearningIcon,
  InsightsIcon,
  FindFriendsIcon,
  BookmarksIcon,
  GroupIcon,
  GamingIcon,
  SettingsIcon,
  SaveIconSidebar,
} from "@/components/shared/Icons";

const exploreItems = [
  { id: "learning", icon: <LearningIcon />, label: "Learning", isNew: true },
  { id: "insights", icon: <InsightsIcon />, label: "Insights" },
  { id: "friends", icon: <FindFriendsIcon />, label: "Find friends" },
  { id: "bookmarks", icon: <BookmarksIcon />, label: "Bookmarks" },
  { id: "group", icon: <GroupIcon />, label: "Group" },
  { id: "gaming", icon: <GamingIcon />, label: "Gaming", isNew: true },
  { id: "settings", icon: <SettingsIcon />, label: "Settings" },
  { id: "save", icon: <SaveIconSidebar />, label: "Save post" },
];

const ExploreMenu = () => (
  <div className="card bg-theme-card border-0 mb-3 px-4 pt-4 pb-2 rounded-3">
    <h6 className="fw-semibold mb-4">Explore</h6>
    <ul className="list-unstyled m-0 p-0">
      {exploreItems.map((item) => (
        <li
          key={item.id}
          className="mb-4 d-flex align-items-center justify-content-between position-relative"
        >
          <a
            href="#"
            className="text-body fs-6 fw-medium d-flex align-items-center gap-3 w-100 text-decoration-none"
          >
            {item.icon}
            {item.label}
          </a>
          {item.isNew && (
            <span className="badge bg-success rounded-3 position-absolute end-0 fw-normal">
              New
            </span>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default ExploreMenu;
