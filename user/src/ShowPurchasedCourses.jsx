import axios from "axios"
import React from "react"
import { InsertDataInCard } from "./ShowCourses"
import { Typography } from "@mui/material"

function ShowPurchasedCourses(){
    const [purchasedCourses, setPurchasedCourses]=React.useState([])

    React.useEffect(()=>{
        axios.get('http://localhost:3000/users/purchasedCourses', {headers:{
            'authorization':'Bearer '+localStorage.getItem('token')
        }}).then((response)=>[
            setPurchasedCourses(response.data)
        ])
    },[])
    
    return <div className="normalflex flexdirect">
        <div className="normalflex alignflexcenter" style={{marginTop:'50px'}}>
            <Typography variant='h6' fontWeight={700} color={'#05386b'}>
                Your purchased courses.
            </Typography>
        </div>
    
        <div className="normalflex alignflexcenter purchasedcourse">
            {purchasedCourses.map((course)=>{
                return <div>
                    <InsertDataInCard title={course.title} description={course.description} imageLink={course.imageLink} price={course.price} />
                </div>
            })}
        </div>
    </div>
}
export default ShowPurchasedCourses