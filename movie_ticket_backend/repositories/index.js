const {MongoClient, ObjectId} = require("mongodb")

let db = {
    users: null,
    movie: null
}

const initDatabase = () => {
    const mongoUrl = "mongodb+srv://Minh:Minh13%2F0803@cluster0.2a8lu.mongodb.net/test?authSource=admin&replicaSet=atlas-30x66g-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
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