import "./Movie.css";

const Movie = (props) => {
  const data = props.data;
  return (
    <div className="movie">
      <img src={data["Poster"]} width="300px" height="400px" alt={data["Title"]} style = {{border:"1px solid black"}} />
      <div className="movie-title">{data.Title}</div>
    </div>
  );
};

export default Movie;
