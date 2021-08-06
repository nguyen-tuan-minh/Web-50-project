const User = require("../model/user");
const {findUserByUsername, insertUser} = require("../repositories/users")

const login = async (username, password) =>{
    const user = await findUserByUsername(username)
    if (!user || !user.verifyPassword(password)){
        return {message: "Username or password is incorrect", isLogIn:false}
    }
    return {username:username, message:"Sign in successfull", isLogIn:true}
};
const register = async (username, password) => {
    const user = await findUserByUsername(username)
    if (user){
        return {message: "Username already exists"}
    }
    const nUser = new User(username, password);
    const result = await insertUser(nUser);
    return {...result, message:"Sign up successful"}
};

module.exports = {login, register}