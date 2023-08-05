import axios from "axios";
import React from "react";

function ShowCourses() {
    if (!localStorage.getItem('authorization')){
        return <div>Unauthorized</div>
    }
    const [courses, setCourses] = React.useState([]);

    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    
        let header={'authorization': localStorage.getItem('authorization')}
        React.useEffect(()=>{
                axios.get('http://localhost:3000/admin/courses', {headers:header}).then((response)=>{
                    setCourses(response.data)
                    console.log(JSON.stringify(response.data))
                })
        }, [])

    return <div>
        <h1>All Courses </h1>
            {(courses).map((course)=>{
                return <Course title={course.title} description={course.description}/>
            })}
    </div>
}

function Course(props) {
    return <div>
        {props.title}
        <br />
        {props.description}
    </div>
}

export default ShowCourses;