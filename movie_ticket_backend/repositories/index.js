const {MongoClient, ObjectId} = require("mongodb")

let db = {
    users: null,
    movie: null
}

const initDatabase = () => {
    const mongoUrl = "mongodb://localhost:27017"
    const client = new MongoClient(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    client.connect().then(()=>{
        console.log("DB connected");
        const connectedDb = client.db("project");
        db.users = connectedDb.collection("users")
        db.movie = connectedDb.collection("movie")
    })
}

module.exports = {initDatabase, db};