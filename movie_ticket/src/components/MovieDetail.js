import { Link } from "react-router-dom";
import "./MovieDetail.css";

const Description = (props) => {
  return (
    <div>
      <span className="movie-detail-info">{props.title}: </span>
      {props.content}
    </div>
  );
};

const MovieDetail = (props) => {
  const data = props.data;
  return (
    <div className="movie-detail">
      <div className="movie-detail-title">{data["Title"]}</div>
      <div className="movie-detail-body">
        <img src={data["Poster"]} width="390px" height="520px" alt={data["Title"]} style={{border:"1px solid black"}} />
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="movie-detail-line"></div>
        </div>
        <div className="movie-detail-body-description">
          <Description title="Description" content={data.Plot} />
          <Description title="Language" content={data.Language} />
          <Description title="Rated" content={data.Rated} />
          <Description title="Release date" content={data.Released} />
          <Description title="Run time" content={data.Runtime} />
          <Description title="Production" content={data.Production} />
          <div className="movie-detail-body-purchase">
            <Link
              to={props.path + "/ticket"}
              className="movie-detail-body-purchase-button b1"
            >
              Buy ticket
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
