import "./Register.css"
import { useState } from "react"

const Register = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsernameChange = (e) => {
        setUsername(e)
    }
    const handlePasswordChange = (e) => {
        setPassword(e)
    }
    const handleSignUp = (e) => {
        e.preventDefault()
        if (password.length >= 8 & username.length >= 4) {
            fetch('https://movie-ticket-back.herokuapp.com/user/register', {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }).then((res) => res.json().then((resJson) => {
                alert(resJson.message)
                setPassword("")
                setUsername("")
            }))
        } else {
            alert("Username or password too short")
        }
    }
    const handleSignIn = (e) => {
        e.preventDefault()
        fetch('https://movie-ticket-back.herokuapp.com/user/login', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then((res) => res.json().then((resJson) => {
            alert(resJson.message)
            if (resJson.isLogIn) {
                props.setUsername(resJson.username)
                setPassword("")
                setUsername("")
            }
        }))
    }
    return (
        <div className="register">
            <form className="register-form">
                <div className="register-form-title">Register </div>
                <div className="register-form-name">Username {"(at least 4 characters)"}</div>
                <input type="text" value={username} onChange={(e) => { handleUsernameChange(e.target.value) }} className="register-form-input"></input>
                <div className="register-form-name">Password {"(at least 8 characters)"}</div>
                <input type="password" value={password} onChange={(e) => { handlePasswordChange(e.target.value) }} className="register-form-input"></input>
                <div className="register-form-question">Already have account ?</div>
                <input type="submit" value="Sign in" className="register-form-submit" onClick={(e) => { handleSignIn(e) }}></input>
                <div className="register-form-question">New here ?</div>
                <input type="submit" value="Sign up" className="register-form-submit" onClick={(e) => { handleSignUp(e) }}></input>
            </form>
        </div>
    )
}

export default Register