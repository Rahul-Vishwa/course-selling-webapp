import './App.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Signin from './Signin'
import Signup from './Signup'
import Appbar from './Appbar'
import Addcourse from './Addcourse'
import Courses from './Courses'
import Course from './Course'
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';


function App() {

  return  <div style={{backgroundColor:"#eeeeee", width:"100vw", height:"100vh" }}>
    <RecoilRoot>
      <Router>
        <Appbar />
        <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/addcourse" element={<Addcourse />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:courseId" element={<Course />} />
        </Routes>
      </Router>
    </RecoilRoot>
  </div> 
}

export default App
