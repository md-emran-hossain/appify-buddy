import Image from "next/image";
import shape1 from "@/public/assets/images/shape1.svg";
import darkShape from "@/public/assets/images/dark_shape.svg";
import shape2 from "@/public/assets/images/shape2.svg";
import darkShape1 from "@/public/assets/images/dark_shape1.svg";
import shape3 from "@/public/assets/images/shape3.svg";
import darkShape2 from "@/public/assets/images/dark_shape2.svg";

export default function AuthShapes() {
  return (
    <>
      <div className="shape top-0 start-0">
        <Image
          src={shape1}
          alt="Shape decoration 1"
          className="shape_img img-fluid w-100 d-block"
          priority
        />
        <Image
          src={darkShape}
          alt="Shape dark decoration 1"
          className="dark_shape img-fluid w-100 d-block"
          priority
        />
      </div>
      <div className="shape bottom-0 start-0">
        <Image
          src={shape2}
          alt="Shape decoration 2"
          className="shape_img img-fluid w-100 d-block"
          priority
        />
        <Image
          src={darkShape1}
          alt="Shape dark decoration 2"
          className="dark_shape opacity-50 img-fluid w-100 d-block"
          priority
        />
      </div>
      <div className="shape top-0 end-0">
        <Image
          src={shape3}
          alt="Shape decoration 3"
          className="shape_img img-fluid w-100 d-block"
          priority
        />
        <Image
          src={darkShape2}
          alt="Shape dark decoration 3"
          className="dark_shape opacity-50 img-fluid w-100 d-block"
          priority
        />
      </div>
    </>
  );
}
