import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { ThemeProvider} from 'styled-components'
import './styles.css'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Signup(){
    const navigate=useNavigate()
    const [email, setEmail]=React.useState('')
    const [password, setPassword]=React.useState('')
    const [userAlreadyExist, setUserAlreadyExist]=React.useState(false)

    return <div className='signupcontainer normalflex'>
        <div className='normalflex alignflexcenter welcometext'> 
            <Typography variant='h6' fontWeight={700} color={'#05386b'}>
                Welcome to Coursera. Sign up below.
            </Typography>
        </div>
        <div className='basicflex alignflexcenter cardcontainer'>
            <Card className='basiccard'  style={{backgroundColor:'#edf5e1'}}>
                <div className='textfieldcontainer'>
                    <TextField className='textfield' onChange={(e)=>setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" />
                </div>
                <div className='textfieldcontainer'>
                    <TextField className='textfield' onChange={(e)=>setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" />
                </div>
                <div className='normalflex alignflexcenter errordisplay'>
                    {userAlreadyExist && <p>User already exists!</p>}
                </div>
                <div className='buttoncontainer'>
                    <Button style={{backgroundColor:'#05386b'}} size='large' variant="contained" onClick={()=>{
                        axios.post('http://localhost:3000/users/signup', {
                            username:email,
                            password:password
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