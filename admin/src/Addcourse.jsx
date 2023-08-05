import { Card, TextField, Typography } from "@mui/material"
import Button from "@mui/material/Button"
import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Addcourse(){

    const navigate=useNavigate()

    const [title, setTitle]=React.useState("")
    const [description, setDescription]=React.useState("")
    const [imageLink, setImageLink]=React.useState("")
    const [price, setPrice]=React.useState("")

    return<div>
        <div style={{display:"flex", justifyContent:"center", paddingTop:"100px"}}>
            <Typography variant={"h6"}>
                Welcome to Coursera. Add courses below.
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
            <TextField onChange={(e)=> setTitle(e.target.value)} type="text" fullWidth={true} id="outlined-basic" label="Title" variant="outlined" />
        </div>
        <div style={{padding:"20px 20px 0px 20px"}}>
            <TextField onChange={(e)=> setDescription(e.target.value)} type="text" fullWidth={true} id="outlined-basic" label="Description" variant="outlined" />
        </div>
        <div style={{padding:"20px 20px 0px 20px"}}>
            <TextField onChange={(e)=> setImageLink(e.target.value)} type="text" fullWidth={true} id="outlined-basic" label="Image link" variant="outlined" />
        </div>
        <div style={{padding:"20px 20px 0px 20px"}}>
            <TextField onChange={(e)=> setPrice(e.target.value)} type="text" fullWidth={true} id="outlined-basic" label="Price" variant="outlined" />
        </div>
        <div style={{padding:"20px 20px 20px 20px"}}>
            <Button size="large" variant="contained" onClick={()=>{
                axios.post('http://localhost:3000/admin/courses', {
                    title: title,
                    description: description,
                    imageLink: imageLink,
                    price: price
                }, {
                    headers:{
                        "Authorization":`Bearer ${localStorage.getItem('token')}`
                    }
                }).then((response)=>{
                    console.log(response.data)
                    navigate('/courses')
                })
            }}>Add course</Button>
        </div>
    </Card>
        </div>
        </div>
}

export default Addcourse