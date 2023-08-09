const express = require('express');
const mongoose=require('mongoose')
const cors=require('cors')
const adminRouter=require('./routes/admin')
const userRouter=require('./routes/user')
const dotenv=require('dotenv')

dotenv.config()
const app = express();

app.use(express.json());
app.use(cors())

app.use('/admin', adminRouter)
app.use('/users', userRouter)

try{
  mongoose.connect(`${process.env.URI}`, {useNewUrlParser: true, useUnifiedTopology: true})
}
catch(error){
  console.log(error)
}

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});