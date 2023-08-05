import axios from "axios";
import React from "react";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const [signupInfo, setSignupInfo] = React.useState({});

    function handleChange(event){
        const {name, value}=event.target
        setSignupInfo({...signupInfo, [name]:value})
    }
    async function registerEmail(){
            await axios.post('http://localhost:3000/admin/signup', signupInfo).then((response)=>{
                localStorage.setItem('authorization',`Bearer ${response.data.token}`)
                console.log(response.data.message)
                setSignupInfo({})
            }).catch(error=>{
                console.log("User already exists.")
            })
    }
    return <div>
        <h1>Register to the website</h1>
        <br/>
        Email:<br/>
        <input type={"email"} onChange={handleChange} name="username" required/>
        <br/>
        Password:<br/>
        <input type={"password"} onChange={handleChange} name="password" required/>
        <br/>
        <a href="/login"><button onClick={registerEmail}>Register</button></a>
        <br/>
        Already a user? <a href="/login">Login</a>
    </div>
}

export default Register;