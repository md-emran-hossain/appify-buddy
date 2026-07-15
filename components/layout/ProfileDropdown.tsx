"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

const ProfileDropdown = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };
  return (
    <div
      className="dropdown-menu dropdown-menu-end profile_dropdown border-0 shadow p-3 rounded-4"
      style={{ width: "280px" }}
    >
      <div className="d-flex align-items-center mb-3">
        <div className="flex-shrink-0 me-3">
          {user?.avatarUrl ? (
            <Image
              width={56}
              height={56}
              src={user.avatarUrl}
              alt="Image"
              className="avatar object-fit-cover border"
            />
          ) : (
            <div
              className="avatar bg-primary text-white d-flex align-items-center justify-content-center rounded-circle border"
              style={{ width: 56, height: 56, fontSize: 20 }}
            >
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
          )}
        </div>
        <div>
          <h4 className="fs-6 text-body mb-1">
            {user ? `${user.firstName} ${user.lastName}` : "Guest"}
          </h4>
          <Link href="#" className="text-decoration-none small text-primary">
            View Profile
          </Link>
        </div>
      </div>
      <hr className="my-2" />
      <ul className="list-unstyled m-0 p-0">
        <li>
          <Link
            href="#"
            className="d-flex align-items-center justify-content-between text-decoration-none py-2 px-2 rounded hover-bg-light"
          >
            <div className="d-flex align-items-center text-body small">
              <span
                className="me-3 d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle"
                style={{ width: "36px", height: "36px" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="19"
                  fill="none"
                  viewBox="0 0 18 19"
                >
                  <path
                    fill="currentColor"
                    d="M9.584 0c.671 0 1.315.267 1.783.74.468.473.721 1.112.7 1.709l.009.14a.985.985 0 00.136.395c.145.242.382.418.659.488.276.071.57.03.849-.13l.155-.078c1.165-.538 2.563-.11 3.21.991l.58.99a.695.695 0 01.04.081l.055.107c.519 1.089.15 2.385-.838 3.043l-.244.15a1.046 1.046 0 00-.313.339 1.042 1.042 0 00-.11.805c.074.272.255.504.53.66l.158.1c.478.328.823.812.973 1.367.17.626.08 1.292-.257 1.86l-.625 1.022-.094.144c-.735 1.038-2.16 1.355-3.248.738l-.129-.066a1.123 1.123 0 00-.412-.095 1.087 1.087 0 00-.766.31c-.204.2-.317.471-.316.786l-.008.163C11.956 18.022 10.88 19 9.584 19h-1.17c-1.373 0-2.486-1.093-2.484-2.398l-.008-.14a.994.994 0 00-.14-.401 1.066 1.066 0 00-.652-.493 1.12 1.12 0 00-.852.127l-.169.083a2.526 2.526 0 01-1.698.122 2.47 2.47 0 01-1.488-1.154l-.604-1.024-.08-.152a2.404 2.404 0 01.975-3.132l.1-.061c.292-.199.467-.527.467-.877 0-.381-.207-.733-.569-.94l-.147-.092a2.419 2.419 0 01-.724-3.236l.615-.993a2.503 2.503 0 013.366-.912l.126.066c.13.058.269.089.403.09a1.08 1.08 0 001.086-1.068l.008-.185c.049-.57.301-1.106.713-1.513A2.5 2.5 0 018.414 0h1.17zm0 1.375h-1.17c-.287 0-.562.113-.764.312-.179.177-.288.41-.308.628l-.012.29c-.098 1.262-1.172 2.253-2.486 2.253a2.475 2.475 0 01-1.013-.231l-.182-.095a1.1 1.1 0 00-1.488.407l-.616.993a1.05 1.05 0 00.296 1.392l.247.153A2.43 2.43 0 013.181 9.5c0 .802-.401 1.552-1.095 2.023l-.147.091c-.486.276-.674.873-.448 1.342l.053.102.597 1.01c.14.248.374.431.652.509.246.069.51.05.714-.04l.103-.05a2.506 2.506 0 011.882-.248 2.456 2.456 0 011.823 2.1l.02.335c.059.535.52.95 1.079.95h1.17c.566 0 1.036-.427 1.08-.95l.005-.104a2.412 2.412 0 01.726-1.732 2.508 2.508 0 011.779-.713c.331.009.658.082.992.23l.3.15c.469.202 1.026.054 1.309-.344l.068-.105.61-1a1.045 1.045 0 00-.288-1.383l-.257-.16a2.435 2.435 0 01-1.006-1.389 2.393 2.393 0 01.25-1.847c.181-.31.429-.575.752-.795l.152-.095c.485-.278.672-.875.448-1.346l-.067-.127-.012-.027-.554-.945a1.095 1.095 0 00-1.27-.487l-.105.041-.098.049a2.515 2.515 0 01-1.881.092 2.447 2.447 0 01-1.68-2.112l-.008-.168a1.078 1.078 0 00-1.082-1.054h-.03z"
                  />
                </svg>
              </span>
              Settings
            </div>
            <span className="text-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="10"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  fill="currentColor"
                  d="M5 5l.354.354L5.707 5l-.353-.354L5 5zM1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z"
                />
              </svg>
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="d-flex align-items-center justify-content-between text-decoration-none py-2 px-2 rounded hover-bg-light"
          >
            <div className="d-flex align-items-center text-body small">
              <span
                className="me-3 d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle"
                style={{ width: "36px", height: "36px" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M10 19a9 9 0 100-18 9 9 0 000 18z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M7.38 7.3a2.7 2.7 0 015.248.9c0 1.8-2.7 2.7-2.7 2.7M10 14.5h.009"
                  />
                </svg>
              </span>
              Help & Support
            </div>
            <span className="text-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="10"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  fill="currentColor"
                  d="M5 5l.354.354L5.707 5l-.353-.354L5 5zM1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z"
                />
              </svg>
            </span>
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="d-flex align-items-center justify-content-between text-decoration-none py-2 px-2 rounded hover-bg-light w-100 border-0 bg-transparent"
          >
            <div className="d-flex align-items-center text-body small">
              <span
                className="me-3 d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle"
                style={{ width: "36px", height: "36px" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  fill="none"
                  viewBox="0 0 19 19"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M6.667 18H2.889A1.889 1.889 0 011 16.111V2.89A1.889 1.889 0 012.889 1h3.778M13.277 14.222L18 9.5l-4.723-4.722M18 9.5H6.667"
                  />
                </svg>
              </span>
              Log Out
            </div>
            <span className="text-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="10"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  fill="currentColor"
                  d="M5 5l.354.354L5.707 5l-.353-.354L5 5zM1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z"
                />
              </svg>
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
