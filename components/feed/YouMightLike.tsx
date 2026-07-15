import Link from "next/link";
import Image from "next/image";

const YouMightLike = () => (
  <div className="card bg-theme-card border-0 mb-3 p-4 rounded-3">
    <div className="d-flex align-items-center justify-content-between pb-2">
      <h4>You Might Like</h4>
      <Link className="fw-medium text-primary small" href="#">
        See all
      </Link>
    </div>
    <div>
      <div className="d-flex align-items-center my-4">
        <Link href="#" className="me-3">
          <Image
            width={56}
            height={56}
            src="/assets/images/Avatar.png"
            alt="Image"
            className="ppl_img img-fluid w-100 d-block"
          />
        </Link>
        <div className="flex-grow-1 small">
          <Link href="#" className="text-decoration-none">
            <h6 className="mb-1">Radovan SkillArena</h6>
          </Link>
          <p className="small mb-0">Founder &amp; CEO at Trophy</p>
        </div>
      </div>
      <div className="d-flex gap-2">
        <button className="btn btn-outline-secondary flex-grow-1">
          Ignore
        </button>
        <button className="btn btn-primary flex-grow-1">Follow</button>
      </div>
    </div>
  </div>
);

export default YouMightLike;
