import Image from "next/image";
import { Story } from "@/types";
import Link from "next/link";

const stories: Story[] = [
  {
    id: "1",
    authorName: "Your Story",
    storyImage: "/assets/images/card_ppl1.png",
    isUserStory: true,
  },
  {
    id: "2",
    authorName: "Ryan Roslansky",
    storyImage: "/assets/images/card_ppl2.png",
    authorMiniImage: "/assets/images/mini_pic.png",
  },
  {
    id: "3",
    authorName: "Ryan Roslansky",
    storyImage: "/assets/images/card_ppl3.png",
    authorMiniImage: "/assets/images/mini_pic.png",
  },
  {
    id: "4",
    authorName: "Ryan Roslansky",
    storyImage: "/assets/images/card_ppl4.png",
    authorMiniImage: "/assets/images/mini_pic.png",
  },
];

const mobileStories = [
  {
    id: "m1",
    authorName: "Your Story",
    storyImage: "/assets/images/mobile_story_img.png",
    isUserStory: true,
    isActive: false,
  },
  {
    id: "m2",
    authorName: "Ryan...",
    storyImage: "/assets/images/mobile_story_img1.png",
    isActive: true,
  },
  {
    id: "m3",
    authorName: "Ryan...",
    storyImage: "/assets/images/mobile_story_img2.png",
    isActive: false,
  },
  {
    id: "m4",
    authorName: "Ryan...",
    storyImage: "/assets/images/mobile_story_img1.png",
    isActive: true,
  },
  {
    id: "m5",
    authorName: "Ryan...",
    storyImage: "/assets/images/mobile_story_img2.png",
    isActive: false,
  },
  {
    id: "m6",
    authorName: "Ryan...",
    storyImage: "/assets/images/mobile_story_img1.png",
    isActive: true,
  },
  {
    id: "m7",
    authorName: "Ryan...",
    storyImage: "/assets/images/mobile_story_img.png",
    isActive: false,
  },
  {
    id: "m8",
    authorName: "Ryan...",
    storyImage: "/assets/images/mobile_story_img1.png",
    isActive: true,
  },
];

const StoryCarousel = () => (
  <>
    <div className="position-relative d-none d-md-block mb-3">
      <div
        className="position-absolute top-50 translate-middle-y"
        style={{ right: "-5px", zIndex: 18 }}
      >
        <button className="btn btn-primary btn-icon btn-icon-xs border border-2 border-white shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="8"
            fill="none"
            viewBox="0 0 9 8"
          >
            <path
              fill="#fff"
              d="M8 4l.366-.341.318.341-.318.341L8 4zm-7 .5a.5.5 0 010-1v1zM5.566.659l2.8 3-.732.682-2.8-3L5.566.66zm2.8 3.682l-2.8 3-.732-.682 2.8-3 .732.682zM8 4.5H1v-1h7v1z"
            />
          </svg>
        </button>
      </div>
      <div className="row g-2 mx-0">
        {stories.map((story, index) => {
          let displayClass = "col-xl-2 col-sm-3 col-6";
          if (index === 2) displayClass += " d-none d-md-block";
          if (index === 3) displayClass += " d-none d-lg-block";

          return (
            <div key={story.id} className={displayClass}>
              {story.isUserStory ? (
                <div
                  className="position-relative rounded-3 overflow-hidden text-center"
                  style={{ cursor: "pointer" }}
                >
                  <Image
                    width={300}
                    height={500}
                    src={story.storyImage}
                    alt="Story"
                    className="w-100 h-auto d-block object-fit-cover rounded-3"
                    style={{ aspectRatio: "3/5" }}
                  />
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 rounded-3"
                    style={{
                      background: "#000",
                      opacity: 0.2,
                      pointerEvents: "none",
                    }}
                  ></div>
                  <div
                    className="position-absolute bottom-0 w-100 pt-4 pb-2"
                    style={{
                      background: "#112032",
                      borderTopLeftRadius: "25px",
                      borderTopRightRadius: "25px",
                    }}
                  >
                    <button
                      className="position-absolute start-50 translate-middle-x btn btn-primary btn-icon btn-icon-sm border border-2 border-dark"
                      style={{ top: "-16px" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        fill="none"
                        viewBox="0 0 10 10"
                      >
                        <path
                          stroke="#fff"
                          strokeLinecap="round"
                          d="M.5 4.884h9M4.884 9.5v-9"
                        />
                      </svg>
                    </button>
                    <p className="mb-0 text-white fw-medium small">
                      {story.authorName}
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  className="position-relative rounded-3 overflow-hidden text-center story-card-hover"
                  style={{ cursor: "pointer" }}
                >
                  <Image
                    width={300}
                    height={500}
                    src={story.storyImage}
                    alt="Story"
                    className="w-100 h-auto d-block object-fit-cover rounded-3"
                    style={{ aspectRatio: "3/5" }}
                  />
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 rounded-3 bg-dark story-overlay"
                    style={{ opacity: 0.3, transition: "0.2s ease" }}
                  ></div>
                  <div className="position-absolute top-0 end-0 p-2">
                    <Image
                      width={32}
                      height={32}
                      src={story.authorMiniImage || ""}
                      alt="Author"
                      className="avatar border border-2 border-primary"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="position-absolute bottom-0 w-100 pb-2">
                    <p className="mb-0 text-white fw-medium small">
                      {story.authorName}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>

    <div className="d-block d-md-none mb-3">
      <div
        className="d-flex overflow-auto gap-3 pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {mobileStories.map((story) => (
          <div
            key={story.id}
            className="text-center flex-shrink-0"
            style={{ width: "70px" }}
          >
            <Link href="#" className="text-decoration-none text-body d-block">
              <div
                className="position-relative mx-auto mb-2"
                style={{ width: "60px", height: "60px" }}
              >
                <Image
                  width={60}
                  height={60}
                  src={story.storyImage}
                  alt="Story"
                  className="rounded-circle object-fit-cover w-100 h-100"
                  style={{
                    border: story.isUserStory
                      ? "none"
                      : story.isActive
                        ? "3px solid var(--bs-primary)"
                        : "3px solid #c5c5c5",
                  }}
                />
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 rounded-circle"
                  style={{
                    background: story.isUserStory
                      ? "#000"
                      : "linear-gradient(180deg, rgba(17, 32, 50, 0) 0%, #112032 100%)",
                    opacity: 0.5,
                    pointerEvents: "none",
                  }}
                />
                {story.isUserStory && (
                  <button
                    className="position-absolute top-50 start-50 translate-middle btn btn-primary btn-icon btn-icon-xs border border-2 border-white"
                    style={{ zIndex: 2 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      fill="none"
                      viewBox="0 0 12 12"
                    >
                      <path
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 2.5v7M2.5 6h7"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <p
                className={`mb-0 text-truncate text-body fw-medium`}
                style={{ fontSize: "12px" }}
              >
                <span className={story.isUserStory ? "text-primary" : ""}>
                  {story.authorName}
                </span>
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default StoryCarousel;
