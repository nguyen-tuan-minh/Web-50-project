const {findMovieById, findUserByUsername, updateSeat} = require("../repositories/users")
const {db} = require("../repositories/index")
const {ObjectId} = require("mongodb")

const getSeat = async (movieId) => {
    movie = await findMovieById(movieId)
    if(!movie){
       return false 
    }
    return movie.availability
}

const buyTicket = async (req) => {
    user = await findUserByUsername(req.username)
    if(!user){return {message: "Fail to buy. You may forget to login"}}
    ticket = user.ticket
    date = req.date
    ticket.push({
        _id : new ObjectId(),
        Movie: req.mName,
        id: req.mId,
        seat: req.row + req.num,
        preminum: req.preminum,
        date: date
    })
    await db.users.updateOne({username: req.username},
        {$set: {"ticket": ticket}}
    )
    updateSeat(req.mId, req.row + req.num)
    return {message: "Successfully buy ticket"}
}

const getTicket = async (username) => {
    user = await findUserByUsername(username)
    return user.ticket
}

const returnTicket = async(username,ticketId) => {
    tId = new ObjectId(ticketId)
    yourTicket = await getTicket(username)
    remaining = yourTicket.filter((t) => {return  !t._id.equals(tId)})
    deletedTicket = yourTicket.filter((t) => {return t._id.equals(tId)})
    seat = deletedTicket[0].seat
    await db.users.updateOne({username: username},
        {$set: {"ticket": remaining}}
    )
    updateSeat(deletedTicket[0].id, seat)
    return {message: "Successfully return"}
}
module.exports = { buyTicket, getSeat, getTicket, returnTicket }