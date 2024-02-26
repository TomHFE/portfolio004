import Banner from "./banner";
import "./homepage.scss";

// interface for props
interface Props {
  animate: boolean;
}
export default function Homepage({ animate }: Props) {
  // dom
  return (
    <div className="homepage-body">
      <Banner animate={animate} />
    </div>
  );
}
