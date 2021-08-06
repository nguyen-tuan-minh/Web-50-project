import "./navBar.css";
import CusLink from "./CusLink";

const navBar = (props) => {
  return (
    <div className="nav-bar">
      <div className="">
        <CusLink to="/">Home</CusLink>
      </div>
      <div>
        <CusLink to="/Movies">Movies</CusLink>
        <CusLink to="/Ticket">Your ticket</CusLink>
      </div>
      <div>
        {props.username ? (
          <CusLink to="/Sign-in">{props.username}</CusLink>
        ) : (
          <CusLink to="/Sign-in">Sign in</CusLink>
        )}
      </div>
    </div>
  );
};

export default navBar;
