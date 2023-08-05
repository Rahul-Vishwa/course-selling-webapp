import axios from "axios"
import React from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function Courses(){
    const [courses, setCourses]=React.useState([])
    const navigate=useNavigate()

    React.useEffect(()=>{
        axios.get('http://localhost:3000/admin/courses', {headers:{
            "authorization":`Bearer ${localStorage.getItem('token')}`
        }}).then((response)=>{
            setCourses(response.data)
        })
    }, [])
    function handleClick(){
        navigate('/addcourse')
    }

    return <div>
        <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-evenly', paddingTop:'50px'}}>
            {
                courses.map((course)=>{
                    return <Link to={`/course/${course._id}`} style={{textDecoration:'none'}}>
                        <CourseCard title={course.title} description={course.description} imageLink={course.imageLink} price={course.price} />
                    </Link>
                })
            }
        </div>
        <div style={{display:'flex', justifyContent:'center'}}>
            <Button variant="contained" onClick={handleClick}>Add Course</Button>
        </div>
    </div> 
}
function CourseCard(props){
    return <div style={{paddingTop:'50px', paddingBottom:'50px'}}>
        <Card sx={{ width:'300px' }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={props.imageLink}
              alt="image"
              />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {props.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {props.price}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
    </div>
}

export default Courses
export {CourseCard}