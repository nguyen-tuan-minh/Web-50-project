import "./CusLink.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const CusLink = (props) => {
  const [isHover, setIsHover] = useState(false);
  const handleHover = () => {
    setIsHover(!isHover);
  };
  return (
    <Link
      to={props.to}
      className={isHover ? "link-hover" : "link"}
      onMouseOver={handleHover}
      onMouseOut={handleHover}
    >
      {props.children}
    </Link>
  );
};

export default CusLink;
