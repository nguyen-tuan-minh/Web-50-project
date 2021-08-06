const jwt =require("jsonwebtoken")
class User{
    constructor(username, password, ticket){
        this.username=username,
        this.password=password,
        this.ticket=ticket
    }

    generateToken(){
        const token = jwt.sign({
            id: this.id,
            username: this.username,
            },
            "My_Private_Key",
            {
            expiresIn: 3600,
            }
        )
        return token
    }

    verifyPassword(password){
        return password==this.password
    }
}

module.exports = User