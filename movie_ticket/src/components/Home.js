import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <Link to="/Movies" className="home-welcome">
        Welcome to our website
      </Link>
      Our group includes NTM, Đ, H
    </div>
  );
};

export default Home;
