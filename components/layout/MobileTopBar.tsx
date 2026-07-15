import Link from 'next/link';
import Image from 'next/image';

const MobileTopBar = () => {
  return (
    <div className="d-block d-lg-none container-fluid fixed-top bg-body pt-3 pb-2 border-bottom shadow-sm">
      <div className="d-flex justify-content-between align-items-center">
        <Link href="#" style={{ width: "120px" }}>
          <Image width={500} height={500}
            src="/assets/images/logo.svg"
            alt="Image"
            className="img-fluid w-100 d-block"
          />
        </Link>
        <Link href="#" className="d-block me-2" style={{ cursor: "pointer" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 17 17"
          >
            <circle cx="7" cy="7" r="6" stroke="#666" strokeWidth="1.5" />
            <path
              stroke="#666"
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M16 16l-3-3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default MobileTopBar;
