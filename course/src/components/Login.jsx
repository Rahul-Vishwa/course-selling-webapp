import axios from "axios";
import React from "react";

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
    const [loginInfo, setLoginInfo]=React.useState({})

    function handleChange(event){
        const {name, value}=event.target
        setLoginInfo({...loginInfo, [name]:value})
    }
    async function loginUser(){
        await axios.post('http://localhost:3000/admin/login', loginInfo).then((response)=>{
            localStorage.setItem('authorization', `Bearer ${response.data.token}`)
            console.log(response.data.message)
            setLoginInfo({})
        }).catch(error=>{
            console.log("User does not exists.")
        })
    }
    return <div>
        <h1>Login to admin dashboard</h1>
        <br/>
        Email:<br/>
        <input type={"email"} onChange={handleChange} name="username" required/>
        <br/>
        Password:<br/>
        <input type={"password"} onChange={handleChange} name="password" required/>
        <br/>
        <a href="/about"><button onClick={loginUser}>Login</button></a>
        <br/>
        New here? <a href="/register">Register</a>
    </div>
}

export default Login;
