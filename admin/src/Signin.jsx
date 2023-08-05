import { Card, TextField, Typography } from "@mui/material"
import Button from "@mui/material/Button"
import React from "react"
import axios from "axios"

function Signin(){
    
    const [email, setEmail]=React.useState("")
    const [password, setPassword]=React.useState("")
    const [userNotExist, setUserNotExist]=React.useState(false)
        
    return<div>
        <div style={{display:"flex", justifyContent:"center", paddingTop:"100px"}}>
            <Typography variant={"h6"}>
                Welcome to Coursera. Sign in below.
            </Typography> 
        </div>
    <div style={{display:"flex", justifyContent:"center", marginTop:"10px"}}>
    <Card variant={"elevation"} style={{
        width:"400px", 
        display:"flex",
        justifyContent:"center",
        flexDirection:"column"
    }}>
        <div style={{padding:"20px 20px 0px 20px"}}>
            <TextField onChange={(e)=> setEmail(e.target.value)} type="email" fullWidth={true} id="outlined-basic" label="Email" variant="outlined" />
        </div>
        <div style={{padding:"20px 20px 0px 20px"}}>
            <TextField onChange={(e)=> setPassword(e.target.value)} type="password" fullWidth={true} id="outlined-basic" label="Password" variant="outlined" />
        </div>
        <div>
            {userNotExist && <p style={{color:'red', fontSize:'20px', textAlign:'center'}}>Email/Password is incorrect!</p>}
        </div>
        <div style={{padding:"20px 20px 20px 20px"}}>
            <Button size="large" variant="contained" onClick={()=>{
                axios.post('http://localhost:3000/admin/login', {
                    username: email,
                    password: password
                }).then((response)=>{
                    console.log(response.data.message)
                    localStorage.setItem('token', response.data.token)
                    window.location.href='/courses'
                }).catch((err)=>{
                    if (err.response.status==403){
                        setUserNotExist(true)
                    }
                })
            }}>Signin</Button>
        </div>
    </Card>
        </div>
        </div>
}

export default Signin