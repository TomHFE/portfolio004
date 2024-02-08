import Banner from "./banner";
import "./homepage.scss";
import gsap from "gsap";
interface Props {
  animate: boolean
}
export default function Homepage({animate} : Props) {


  return (
    <div className="homepage-body">
      <Banner  animate={animate} />
    </div>
  );
}
