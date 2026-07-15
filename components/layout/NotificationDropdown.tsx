import Link from 'next/link';
import Image from 'next/image';
import { MenuDotsIcon } from '@/components/shared/Icons';
import { notifications } from '@/data/notifications';

const NotificationDropdown = () => {
  return (
    <div
      className="dropdown-menu dropdown-menu-end border-0 shadow p-3 bg-body rounded-3 overflow-y-auto overflow-x-hidden"
      style={{ width: "400px", maxHeight: "calc(100vh - 90px)" }}
    >
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h4 className="fs-5 fw-semibold text-body mb-0">Notifications</h4>
        <div className="dropdown">
          <button
            className="btn btn-link p-0 border-0 text-decoration-none text-secondary"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <MenuDotsIcon />
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end shadow border-0 p-2"
            style={{ width: "220px" }}
          >
            <li>
              <Link className="dropdown-item small rounded mb-1" href="#">
                Mark all as read
              </Link>
            </li>
            <li>
              <Link className="dropdown-item small rounded mb-1" href="#">
                Notification settings
              </Link>
            </li>
            <li>
              <Link className="dropdown-item small rounded" href="#">
                Open Notifications
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="d-flex gap-2 mb-3">
        <button className="btn btn-primary">All</button>
        <button className="btn btn-outline-primary">Unread</button>
      </div>
      <div className="mt-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="dropdown-item d-flex align-items-center mb-2 p-2 rounded text-wrap"
          >
            <div className="flex-shrink-0 me-3">
              <Image
                width={56}
                height={56}
                src={n.image}
                alt="Image"
                className="avatar object-fit-cover"
              />
            </div>
            <div>
              <p className="fs-6 fw-medium text-secondary mb-0">
                <span className="text-body">{n.userName}</span> {n.actionText}
                {n.targetName && (
                  <>
                    {" "}
                    <span className="text-body">{n.targetName}</span>
                  </>
                )}
              </p>
              <div>
                <span className="text-primary fw-semibold small">{n.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationDropdown;
