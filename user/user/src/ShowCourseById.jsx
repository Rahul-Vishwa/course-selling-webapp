import { useParams } from "react-router-dom"
import React from "react"
import axios from "axios"
import { InsertDataInCard } from "./ShowCourses"
import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom"
import { WindPowerSharp } from "@mui/icons-material"

function ShowCourseById(){
    const navigate=useNavigate()
    const [course, setCourse]=React.useState({})

    const courseId=useParams().courseid
    React.useEffect(()=>{
        axios.get(`http://localhost:3000/users/courses/${courseId}`, {headers:{
            'authorization':`Bearer `+localStorage.getItem('token')
        }}).then((response)=>{
            setCourse(response.data)
        })
    },[])
    return <div className="basicflex alignflexcenter coursescard">
        <div className="normalflex coursebyid">
            <div>
                <InsertDataInCard title={course.title} description={course.description} price={course.price} imageLink={course.imageLink} />
            </div>
            <div className="normalflex alignflexcenter" style={{paddingTop:'50px'}}>
                <Button style={{backgroundColor:'#05386b'}} size="large" variant="contained" onClick={()=>{
                    axios.post(`http://localhost:3000/users/courses/${courseId}`, null, {headers:{
                        'authorization':'Bearer '+localStorage.getItem('token')
                    }}).then((response)=>{
                        navigate('/courses/purchased')
                    })
                }}>Purchase course</Button>
            </div>
        </div>
    </div>
}
export default ShowCourseById