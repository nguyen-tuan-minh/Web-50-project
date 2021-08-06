import { useEffect, useState } from "react";
import "./SeatDetail.css";
import Ticket from "./ticket";

const Seat = (props) => {
  const row = props.row;
  let vip = false;
  if ((row === "C" || row === "D" || row ==="E") & (5 <= props.num) & (12 >= props.num)) {
    vip = true;
  }
  const num = props.num;
  const full = props.full;
  return (
    <button
      className={"seat " + (full ? "full" : "empty") + (vip ? " vip" : "")}
      disabled={full}
      onClick={() => {
        props.onSelect(row, num, vip);
      }}
    >
      {row + num}
    </button>
  );
};

const SeatRow = (props) => {
  const row = props.row;
  const seat = props.seat;
  return (
    <div className="seat-row">
      {seat.map((s, i) => {
        return (
          <Seat row={row} num={i + 1} full={s} key={"seat " + row + (i + 1)} onSelect={props.onSelect} />
        );
      })}
    </div>
  );
};

const SeatDetail = (props) => {
  const alter = [
    [true, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [true, false, false, false, true, false, false, false, false, true, false, false, false, false, false, true],
    [true, false, true, true, false, true, true, false, true, false, false, true, true, false, false, false],
    [false, false, true, false, false, false, true, false, true, true, false, true, false, false, true, false],
    [false, false, false, false, false, true, true, false, false, false, false, false, true, false, false, false],
    [false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false],
    [true, true, false, false, false, false, false, false, false, false, false, false, true, false, false, false],
    [false, false, true, false, false, false, false, false, false, false, false, false, true, false, false, false],
    [false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false]
  ]
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [yourSeat, setYourSeat] = useState();
  const [yourSeatNum, setYourSeatNum] = useState();
  const [date, setDate] = useState("13/08/2021")
  const [preminum, setPreminum] = useState(false)
  const row = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  const getData = () => {
    fetch("http://localhost:5000/movie/seat", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.mId,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        setData(Object.values(resJson));
        setLoading(false);
      });
  };
  const handleBuy = (seat, date) => {
    if(props.username){
      const question = "Do you want to buy this ticket for seat " + seat + "?"
      if(window.confirm(question)){
        fetch("http://localhost:5000/movie/ticket/buy", {
          method: "Post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: props.username,
            mId: props.mId,
            mName: props.mName,
            row: yourSeat[0],
            num: yourSeatNum,
            preminum: preminum,
            date: date
          }),
        })
          .then((res) => res.json())
          .then((resJson) => {
            alert(resJson.message)
            setYourSeat()
          });
      }
    } else {
      alert("You must login or choose your seat first")
    }
  };
  useEffect(getData, [yourSeat, props.mId]);
  return loading ? (
    <div> Loading... </div>
  ) : (
    <div className="seat-detail">
      <div className="seat-detail-name">{props.mName}</div>
      <div style={{ textAlign: "center" }}>
        <span style={{ color: "grey" }}>Gray:</span> full,{" "}
        <span style={{ color: "#6699ff" }}>Blue:</span> currently available,{" "}
        <span style={{ color: "gold" }}>Yellow:</span> preminum seat
      </div>
      <div style={{ textAlign: "center" }}>Click on seat to choose seat</div>
      <div className="seat-detail-ticket">
        <Ticket mName={props.mName} mId={props.mId} username={props.username} seat={yourSeat} preminum = {preminum} date ={date} tId = ""/>
        <button className = "seat-detail-ticket-button" onClick={()=>{handleBuy(yourSeat, date)}}>Buy ticket</button>
      </div>
      <div className="seat-detail-date-chooser">
        <button className="seat-detail-date-chooser-button" onClick={() => {setDate("13/08/2021")}}>13/08/2021</button>   <button className="seat-detail-date-chooser-button" onClick={() => {setDate("15/08/2021")}}>15/08/2021</button>
      </div> 
      {(date === "13/08/2021" ? data : alter).map((r, i) => {
        return (
          <SeatRow row={row[i]} seat={r} key={"row" + row[i]} onSelect={(row, num, vip) => {
            setYourSeat(row + num)
            setPreminum(vip)
            setYourSeatNum(num)
          }} />
        );
      })}
    </div>
  );
};

export default SeatDetail;
