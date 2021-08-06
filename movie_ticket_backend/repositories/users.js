const User = require("../model/user");
const {db} = require("./index")

const findUserByUsername = async (username) => {
    const user = await db.users.findOne({username: username});
    if (!user) {
        return false
    }
    return new User(user.username, user.password, user.ticket);
}

const findMovieById = async (id) => {
    const movie = await db.movie.findOne({id: id});
    if (!movie) {
        return false
    }
    return movie;
}

const insertUser = async (u) => {
    await db.users.insertOne({
        username: u.username,
        password: u.password,
        ticket: []
    })
    const result = {username: u.username, password: u.password}
    return result
}

const updateSeat = async (movieId, seat) => {
    movie = await findMovieById(movieId)
    row = seat[0]
    num = Number(seat.substring(1))
    avail = movie.availability
    avail[row][num - 1] = !avail[row][num - 1]
    await db.movie.updateOne({"id": movieId},
        {$set: {"availability": avail}}
    )
}
module.exports = {findUserByUsername, insertUser, findMovieById, updateSeat}