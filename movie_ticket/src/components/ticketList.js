import { useEffect, useState } from "react"
import "./ticketList.css"
import Ticket from "./ticket"

const TicketList = (props) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState()
    const getTicket = () => {
        fetch("https://movie-ticket-back.herokuapp.com/movie/ticket", {
            method: "Post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: props.username,
            }),
        })
            .then((res) => res.json())
            .then((resJson) => {
                setData(resJson.yourTicket)
                setLoading(false)
            });
    }
    const returnTicket = (tId) => {
        if(window.confirm("You are returning your ticket. Do you want to proceed ?") ){
            fetch("https://movie-ticket-back.herokuapp.com/movie/ticket", {
                method: "Delete",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: props.username,
                    ticketId: tId
                }),
            })
                .then((res) => res.json())
                .then((resJson) => {
                    alert(resJson.message)
                    setLoading(true)
                    setLoading(false)
                });
        }
    }
    useEffect(getTicket, [props.username, loading])
    return (
        props.username ? (loading ? <div className="ticket-list-default"> Loading...</div> : 
        <div>
            <div className="ticket-list-count">You currently have {data.length} ticket</div>
            <div className = "ticket-list">
                {data.map((t, i) => {
                    return <div className="ticket-list-item" key = {t._id}>
                        <Ticket  mName = {t.Movie} mId = {t.id} username={props.username} seat={t.seat} preminum = {t.preminum} date={t.date} tId = {t._id} />
                        <button onClick = {() => {returnTicket(t._id)}}>Return ticket</button>
                    </div>
                })}
            </div>
        </div>) : <div className="ticket-list-default">You have to login first to see your ticket</div>
    )
}
export default TicketList