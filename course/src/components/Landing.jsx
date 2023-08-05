import React from "react";
import axios from "axios"

/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {
    if (localStorage.getItem('authorization')){
        function deleteToken(){
            localStorage.removeItem('authorization')
        }
        return <div>
            <h1>Welcome to course selling website!</h1>
            <a href="/"><button onClick={deleteToken}>Logout</button></a>
        </div>
    }
    else{
        return <div>
            <h1>Welcome to course selling website!</h1>
            <a href="/register">Register</a>
            <br/>
            <a href="/login">Login</a>
        </div>
    }
}

export default Landing;