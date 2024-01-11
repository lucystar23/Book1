require('dotenv').config();
const express=require('express')

const cors=require('cors')

const userRoutes=require('./routes/users');
const authRoutes=require('./routes/auth');
const bookRoutes=require('./routes/book');

const app=new express();

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/books",bookRoutes)




app.listen(3000,()=>{
    console.log("Port 3000 is up and running")
})