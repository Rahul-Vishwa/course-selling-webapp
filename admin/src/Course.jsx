import { useParams } from "react-router"
import React from "react"
import axios from "axios"
import { CourseCard } from "./Courses"
import { Card, TextField, Typography } from "@mui/material"
import Button from "@mui/material/Button"
import { atom, useSetRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"
import { rootShouldForwardProp } from "@mui/material/styles/styled"

function Course(){
    const {courseId}=useParams()

    const [courses, setCourses]=React.useState([])
    // const setCourses=useSetRecoilState(coursesState)
    
    React.useEffect(()=>{
        axios.get('http://localhost:3000/admin/courses', {headers:{
            "authorization":`Bearer ${localStorage.getItem('token')}`
        }}).then((response)=>{
            setCourses(response.data)
        })
    }, [])
    const course=courses.find(a=>a._id===courseId)
    if (course){
        return <div>
                <div style={{display:"flex", justifyContent:"center", paddingTop:"50px"}}>
                    <Typography variant={"h6"}>
                        Update course below.
                    </Typography> 
                </div>
            <div style={{display:'flex', justifyContent:'space-evenly'}}>
                <CourseDetail course={course} />
                <CourseUpdate id={courseId} course={course} courses={courses} setCourses={setCourses}/>
            </div>
        </div>
    }
    if (!course){
        return <div style={{display:"flex", justifyContent:"center", paddingTop:"200px"}}>
            <Typography variant="h6">
                Loading...
            </Typography>
        </div>
    }
}

function CourseDetail(props){
    const navigate=useNavigate()
    return <div style={{display:'flex', flexDirection:'column', justifyContent:'center', paddingTop:'10px'}}>
            <div>
                <CourseCard title={props.course.title} description={props.course.description} imageLink={props.course.imageLink} price={props.course.price} />
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>
                <Button size="large" variant="contained" onClick={()=>{
                    axios.delete(`http://localhost:3000/admin/course/${props.course._id}`, {headers:{
                        "Authorization":"Bearer "+localStorage.getItem('token')
                    }}).then((response)=>{
                        console.log(response.data)
                        navigate('/courses')
                    })
                }}>Delete Course</Button>
            </div>
        </div> 
}

function CourseUpdate(props){
    const [title, setTitle]=React.useState(props.course.title)
    const [description, setDescription]=React.useState(props.course.description)
    const [imageLink, setImageLink]=React.useState(props.course.imageLink)
    const [price, setPrice]=React.useState(props.course.price)

    // React.useEffect(()=>{
    //     axios.get('http://localhost:3000/admin/courses', {headers:{
    //         'authorization':'Bearer '+localStorage.getItem('token')
    //     }}).then((response)=>{
    //         for (let i=0; i<response.data.length; i++){
    //             if (response.data[i]._id==props.id){
    //                     setTitle(response.data[i].title)
    //                     setDescription(response.data[i].description)
    //                     setImageLink(response.data[i].imageLink)
    //                     setPrice(response.data[i].price)
    //             }
    //         }
    //     })
    // },[])
    
    return <div>
        
    <div style={{display:"flex", justifyContent:"center", marginTop:"50px"}}>
    <Card variant={"elevation"} style={{
        width:"400px", 
        display:"flex",
        justifyContent:"center",
        flexDirection:"column"
    }}>
        <div style={{padding:"20px 20px 0px 20px"}}>
            <TextField defaultValue={title} onChange={(e)=> setTitle(e.target.value)} type="text" fullWidth={true} id="outlined-basic" label="Title" variant="outlined" />
        </div>
        <div style={{padding:"20px 20px 0px 20px"}}>
            <TextField defaultValue={description} onChange={(e)=> setDescription(e.target.value)} type="text" fullWidth={true} id="outlined-basic" label="Description" variant="outlined" />
        </div>
        <div style={{padding:"20px 20px 0px 20px"}}>
            <TextField defaultValue={imageLink} onChange={(e)=> setImageLink(e.target.value)} type="text" fullWidth={true} id="outlined-basic" label="Image link" variant="outlined" />
        </div>
        <div style={{padding:"20px 20px 0px 20px"}}>
            <TextField defaultValue={price} onChange={(e)=> setPrice(e.target.value)} type="text" fullWidth={true} id="outlined-basic" label="Price" variant="outlined" />
        </div>
        <div style={{padding:"20px 20px 20px 20px", display:'flex', justifyContent:'center'}}>
            <Button size="large" variant="contained" onClick={()=>{
                axios.put(`http://localhost:3000/admin/courses/${props.id}`, {
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
                    let updatedCourses=[]
                    for (let i=0; i<props.courses.length; i++){
                        if (props.courses[i]._id==props.id){
                            updatedCourses.push(
                                {
                                    _id:props.id,
                                    title:title,
                                    description:description,
                                    imageLink:imageLink,
                                    price:price
                                }
                            )
                        }
                        else{
                            updatedCourses.push(props.courses[i])
                        }
                    }
                    props.setCourses(updatedCourses)
                })
            }}>Update course</Button>
        </div>
    </Card>
        </div>
        </div>
}

export default Course