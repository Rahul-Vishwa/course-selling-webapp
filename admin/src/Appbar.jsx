import { Typography } from "@mui/material"
import Button from "@mui/material/Button"
import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'    
import React from "react"

function Appbar(){
    const navigate = useNavigate()
    const [userEmail, setUserEmail]=React.useState(null)

    useEffect(()=>{
        const header={"Authorization":`Bearer ${localStorage.getItem('token')}`}
        axios.get('http://localhost:3000/admin/details', {headers:header}).then((response)=>{
            if (response.data.username){
                setUserEmail(response.data.username)
            }
        })
    }, [])

    if (userEmail){
        return <div style={{
            display:'flex',
            justifyContent:'space-between',
            padding:'6px',
            backgroundColor:''
        }}>
        <div style={{marginLeft:'20px'}}>
            <Typography variant="h5">
                Coursera
            </Typography>
        </div>
        <div style={{display:'flex'}}>
            <div style={{marginRight:'20px', paddingTop:'2px'}}>
                <Typography variant="h6">
                    {userEmail}
                </Typography>
            </div>
            <div style={{marginRight:'20px'}}>
                <Button variant="contained" onClick={()=>{
                    localStorage.setItem('token', null)
                    window.location.href='/signin'
                }}>Logout</Button>
            </div>
        </div>
    </div>
    }
        return <div style={{
                display:'flex',
                justifyContent:'space-between',
                padding:'6px',
                backgroundColor:''
            }}>
            <div style={{marginLeft:'20px'}}>
                <Typography variant="h5">
                    Coursera
                </Typography>
            </div>
            <div style={{display:'flex'}}>
                <div style={{marginRight:'20px'}}>
                    <Button variant="contained" onClick={()=>navigate('/signup')}>Signup</Button>
                </div>
                <div style={{marginRight:'20px'}}>
                    <Button variant="contained" onClick={()=>navigate('/signin')}>Signin</Button>
                </div>
            </div>
        </div>
}

export default Appbar