import "./ticket.css"

const Description = (props) => {
    return (
      <div className="ticket-detail-description">
        <span className="ticket-detail-description-title">{props.title}: </span>
        {props.content}
      </div>
    );
  };

const Ticket = (props) => {
    const preminum = props.preminum
    return(
        <div className = {preminum ? "ticket preminum" : "ticket"}>
            <div className= "ticket-movie">{props.mName}</div>
            <div style={{textAlign: "center"}}><Description title = "ID" content={props.tId} /></div>
            <div className = "ticket-detail">
                <div>
                    <Description title = "Name" content={props.username} />
                    <Description title = "Movie ID" content={props.mId} />
                    <Description title = "Date" content={props.date} />
                </div>
                <div className="ticket-detail-seat">{props.seat}</div>
            </div>
            <div className= "ticket-movie">{preminum ?<span style={{color:"gold"}}>150,000 VND</span>: "100,000 VND"}</div>
        </div>
    )
}

export default Ticket