import "./App.css";
import { useState } from "react";
import { Route } from "react-router-dom";
import data from "./data/data";
import NavBar from "./components/navBar";
import Home from "./components/Home";
import Register from "./components/Register";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import SeatDetail from "./components/SeatDetail";
import TicketList from "./components/ticketList"

function App() {
  const [username, setUsername] = useState();
  return (
    <div className="App">
      <NavBar username={username} />
      <Route path="/Sign-in" exact>
        <Register setUsername={setUsername} />
      </Route>
      <Route path="/" exact component={Home} />
      <Route path="/Movies" exact>
        <MovieList data={data} />
      </Route>
      {data.map((m) => {
        const path = "/Movies/" + m["imdbID"];
        return (
          <div key={m["imdbID"]}>
            <Route path={path} exact >
              <MovieDetail data={m} path={path} />
            </Route>
            <Route path={path + "/ticket"} exact >
              <SeatDetail mId={m["imdbID"]} mName={m["Title"]} username = {username} />
            </Route>
          </div>
        );
      })}
      <Route path = "/Ticket"><TicketList username = {username} /></Route>
    </div>
  );
}

export default App;
