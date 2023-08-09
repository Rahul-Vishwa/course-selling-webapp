import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function ShowCourses(){
    const navigate=useNavigate()
    const [courses, setCourses]=React.useState([])

    React.useEffect(()=>{
        axios.get('http://localhost:3000/users/courses', {headers:{
            "authorization":"Bearer "+localStorage.getItem('token')
        }}).then((response)=>{
            setCourses(response.data)
        })
    },[])

    return <div className='normalflex flexdirect'>

        <div className='basicflex coursescard'>
            {courses.map((course)=>{
              return <Link to={`/courses/${course._id}`} style={{textDecoration:'none'}}>
                  <InsertDataInCard title={course.title} description={course.description} imageLink={course.imageLink} price={course.price} />
                  </Link>
            })}
        </div>
        <div className='normalflex alignflexcenter'>
          <Button style={{backgroundColor:'#05386b'}} size='large' variant="contained" onClick={()=>{
            navigate('/courses/purchased')
          }}>Purchased courses</Button>
        </div>
    </div>
}

function InsertDataInCard(props){
    return <div className='basicflex'>

        <Card sx={{ width: '300px' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.imageLink}
          alt="green iguana"
          />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
            <div>
                Price: {props.price}
            </div>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
}

export default ShowCourses
export {InsertDataInCard}