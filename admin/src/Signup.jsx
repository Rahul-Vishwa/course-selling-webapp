import { Card, TextField, Typography } from "@mui/material"
import Button from "@mui/material/Button"
import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Signup(){
    const navigate=useNavigate()

    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [userAlreadyExist, setUserAlreadyExist]=useState(false)

    return<div>
        <div style={{display:"flex", justifyContent:"center", paddingTop:"100px"}}>
            <Typography variant={"h6"}>
                Welcome to CourseIt. Sign up below.
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
            {userAlreadyExist && <p style={{color:'red', fontSize:'20px', textAlign:'center'}}>User already exists!</p>}
        </div>
        <div style={{padding:"20px 20px 20px 20px"}}>
            <Button size="large" variant="contained" onClick={()=>{
                axios.post('http://localhost:3000/admin/signup', {
                    username: email,
                    password: password
                }).then((response)=>{
                    localStorage.setItem('token', response.data.token)
                    navigate('/signin')
                }).catch((err)=>{
                    if (err.response.status==409){
                        setUserAlreadyExist(true)
                    }
                })
            }}>Signup</Button>
        </div>
    </Card>
        </div>
        </div>
}

export default Signup