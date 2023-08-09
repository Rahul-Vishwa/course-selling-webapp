import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { ThemeProvider} from 'styled-components'
import './styles.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import React from 'react'

function Appbar(){
    const navigate=useNavigate()
    
    const [username, setUsername]=React.useState(null)

    React.useEffect(()=>{
        axios.get('http://localhost:3000/users/details', {headers:{
            'authorization':'Bearer '+localStorage.getItem('token')
        }}).then((response)=>{
            setUsername(response.data.username)
        })
    },[])

    if (username){
        return <div className='basicflex appbar'>
            <div className='appname'>
                <Typography variant='h5' fontWeight={800}>
                    Coursera
                </Typography>
            </div>
            <div className='basicflex appbarbuttons'>
                <div style={{marginTop:'5px', marginRight:'20px'}}>
                    <Typography variant='h6'>
                        {username}
                    </Typography>
                </div>
                <div className='appbarbutton'>
                    <Button style={{color:'#05386b'}} onClick={()=>{
                        window.location.href='/signin'
                        localStorage.removeItem('token')
                    }} className='buttons' variant="text">
                        <Typography variant='h6' fontWeight={800}>
                            Logout
                        </Typography>
                    </Button>
                </div>
            </div>
        </div>
    }

    return <div className='basicflex appbar'>
        <div className='appname'>
            <Typography variant='h5' fontWeight={800}>
                Coursera
            </Typography>
        </div>
        <div className='basicflex appbarbuttons'>
            <div className='appbarbutton'>
                <Button style={{color:'#05386b'}} onClick={()=>{
                    navigate('/signup')
                }} className='buttons' variant="text">
                    <Typography variant='h6' fontWeight={800}>
                        Signup
                    </Typography>
                </Button>
            </div>
            <div className='appbarbutton'>
            <Button style={{color:'#05386b'}} onClick={()=>{
                    navigate('/signin')
                }} className='buttons' variant="text">
                    <Typography variant='h6' fontWeight={800}>
                        Signin
                    </Typography>
                </Button>
            </div>
        </div>
    </div>
}

export default Appbar