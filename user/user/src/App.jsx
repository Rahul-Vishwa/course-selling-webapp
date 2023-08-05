import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Appbar from './Appbar'
import Signup from './Signup'
import Signin from './Signin'
import ShowCourses from './ShowCourses'
import ShowCourseById from './ShowCourseById'
import ShowPurchasedCourses from './ShowPurchasedCourses'

function App() {
  
  return (
      
    <div>
      <Router>
        <Appbar />
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/courses' element={<ShowCourses />} />
          <Route path='/courses/:courseid' element={< ShowCourseById />} />
          <Route path='/courses/purchased' element={<ShowPurchasedCourses />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
