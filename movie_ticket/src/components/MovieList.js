import { Link } from "react-router-dom";
import "./MovieList.css";
import Movie from "./Movie";

const MovieList = (props) => {
  const data = props.data;
  return (
    <div className="movie-list">
      {data.map((m) => {
        const path = "/Movies/" + m["imdbID"];
        return (
          <div key ={path}>
            <Link to={path} style={{ textDecoration: "none" }}>
              <Movie key={m.imdbID} data={m} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default MovieList;
