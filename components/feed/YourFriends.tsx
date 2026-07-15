import { SearchIcon, ActiveIcon } from "@/components/shared/Icons";
import { Friend } from "@/types";
import Link from "next/link";
import Image from "next/image";

const friendsData: Friend[] = [
  {
    id: 1,
    name: "Steve Jobs",
    title: "CEO of Apple",
    image: "/assets/images/people1.png",
    active: false,
    time: "5 minute ago",
  },
  {
    id: 2,
    name: "Ryan Roslansky",
    title: "CEO of Linkedin",
    image: "/assets/images/people2.png",
    active: true,
    time: null,
  },
  {
    id: 3,
    name: "Dylan Field",
    title: "CEO of Figma",
    image: "/assets/images/people3.png",
    active: true,
    time: null,
  },
  {
    id: 4,
    name: "Steve Jobs",
    title: "CEO of Apple",
    image: "/assets/images/people1.png",
    active: false,
    time: "5 minute ago",
  },
  {
    id: 5,
    name: "Ryan Roslansky",
    title: "CEO of Linkedin",
    image: "/assets/images/people2.png",
    active: true,
    time: null,
  },
  {
    id: 6,
    name: "Dylan Field",
    title: "CEO of Figma",
    image: "/assets/images/people3.png",
    active: true,
    time: null,
  },
  {
    id: 7,
    name: "Dylan Field",
    title: "CEO of Figma",
    image: "/assets/images/people3.png",
    active: true,
    time: null,
  },
  {
    id: 8,
    name: "Steve Jobs",
    title: "CEO of Apple",
    image: "/assets/images/people1.png",
    active: false,
    time: "5 minute ago",
  },
];

const YourFriends = () => (
  <div className="card border-0 mb-3 px-4 pt-4 pb-2 rounded-3 bg-theme-card">
    <div className="feed_top_fixed">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h4 className="fs-6 fw-semibold text-body mb-0">Your Friends</h4>
        <span className="feed_right_inner_area_card_content_txt">
          <Link
            className="small fw-medium text-primary text-decoration-none"
            href="#"
          >
            See all
          </Link>
        </span>
      </div>
      <form className="position-relative mb-4">
        <SearchIcon className="position-absolute top-50 translate-middle-y ms-3" />
        <input
          className="inpt1 w-100"
          type="search"
          placeholder="input search text"
          aria-label="Search"
        />
      </form>
    </div>
    <div className="feed_bottom_fixed">
      {friendsData.map((friend) => (
        <div
          key={friend.id}
          className={`d-flex align-items-center justify-content-between p-2 mb-3 rounded-2 ${!friend.active ? "opacity-75" : ""}`}
          style={{ cursor: "pointer", transition: "0.2s ease" }}
        >
          <div className="d-flex align-items-center">
            <div className="me-3 flex-shrink-0">
              <Link href="#">
                <Image
                  width={40}
                  height={40}
                  src={friend.image}
                  alt=""
                  className="avatar object-fit-cover"
                />
              </Link>
            </div>
            <div>
              <Link href="#" className="text-decoration-none">
                <h4 className="fs-6 fw-medium text-body mb-1">{friend.name}</h4>
              </Link>
              <p
                className="fw-light text-body-secondary mb-0"
                style={{ fontSize: "11px" }}
              >
                {friend.title}
              </p>
            </div>
          </div>
          <div>
            {friend.active ? (
              <ActiveIcon />
            ) : (
              <span
                className="fw-normal text-secondary"
                style={{ fontSize: "11px" }}
              >
                {friend.time}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default YourFriends;
