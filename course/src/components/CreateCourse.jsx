import axios from "axios";
import React from "react";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
    if (!localStorage.getItem('authorization')){
        return <div>Unauthorized</div>
    }
    const [course, setCourse] = React.useState({});

    function handleChange(event){
        const {name, value}=event.target
        setCourse({...course, [name]:value})
    }
    let header={'authorization':localStorage.getItem('authorization')}
    function sendCourse(){
            axios.post('http://localhost:3000/admin/courses', course, {headers:header}).then((response)=>{
                console.log(response.data)
            })
            setCourse({})
    }

    return <div>
        <h1>Create Course Page</h1>
        Title:<br/>
        <input type={"text"} name="title" onChange={handleChange} />
        <br />
        Description:<br/>
        <input type={"text"} name="description" onChange={handleChange} />
        <br />
        Price:<br/>
        <input type={"text"} name="price" onChange={handleChange} />
        <br />
        Image link:<br/>
        <input type={"text"} name="imageLink" onChange={handleChange} />
        <br />
        Published:<br/>
        <input type={"text"} name="published" onChange={handleChange} />
        <br />
        <button onClick={sendCourse}>Create Course</button>
    </div>
}
export default CreateCourse;