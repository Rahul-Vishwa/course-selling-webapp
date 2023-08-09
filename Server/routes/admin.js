const {Admin, Course}=require('../db')
const express=require('express')
const jwt = require('jsonwebtoken');
const {secretKey} = require("../middleware/auth")
const {authenticateJwt} = require("../middleware/auth")

const router=express.Router()

router.get('/details', authenticateJwt,(req, res)=>{
  res.status(200).json({username: req.user.username})
})

router.post('/signup', async (req, res) => {
  const {username, password} = req.body;
  const existingAdmin = await Admin.findOne({username});
  if (existingAdmin) {
    res.status(409).json({ error: 'Admin already exists' });
  } else {
    const newAdmin=new Admin({username, password})
    await newAdmin.save()
    const token = jwt.sign({username, role:'admin'}, secretKey, {expiresIn:'1h'});
    res.json({ message: 'Admin created successfully',token });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({username, password});

  if (admin) {
    const token = jwt.sign({username, role:'admin'}, secretKey, {expiresIn:'1h'});
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Admin authentication failed' });
  }
});

router.post('/courses', authenticateJwt, async(req, res) => {
  const course = new Course(req.body) 
  await course.save()
  res.json({ message: 'Course created successfully', courseId: course.id });
});

router.put('/courses/:courseId', authenticateJwt, async(req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {new:true})

  if (course) {
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

router.get('/courses', authenticateJwt, async(req, res) => {
  const courses=await Course.find({})
  res.json(courses);
});

router.delete('/course/:courseId', authenticateJwt, async(req, res)=>{
  await Course.findOneAndDelete({_id:req.params.courseId})
  res.status(200).json({message: "Course deleted successfully"})
})

module.exports=router