const JWT = require('jsonwebtoken');
const { comparePassword, hashPassword } = require('./authHelper.js');
const mongoose = require('mongoose')
const UserModel = require('./Models/user.js')
const DataModel = require('./Models/data.js')
const cors = require('cors');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const dotenv = require('dotenv')

dotenv.config();
const PORT = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err))

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));

// Middleware to verify token and extract email
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    //const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).send({ success: false, message: 'No token provided' });
    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send({ success: false, message: 'Invalid token' });
      }
}

//login
app.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password'
            })
        }
        //check user
        const userdata = await UserModel.findOne({email})
        if(!userdata){
            return res.status(404).send({
                success:false,
                message:'Email is not registered'
            })
        }
        const match = await comparePassword(password,userdata.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid Password'
            })
        }
        //token
        const user = { id: userdata._id, email: userdata.email };
        const token = JWT.sign(user,process.env.JWT_SECRET,{expiresIn: "7d"})
        res.status(200).send({
            success:true,
            message:'login successfully',
            user:{
                name:user.name,
                email:user.email
            },
            token
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Login',
            error
        })
    }
})

//register
app.post('/register',async(req,res)=>{
    try{
        const {name,dateOfBirth,email,password} = req.body
        //validations
        if(!name){
            return res.send({error:'Name is Required'})
        }
        if(!dateOfBirth){
            return res.send({error:'Date of birth is Required'})
        }
        if(!email){
            return res.send({error:'Email is Required'})
        }
        if(!password){
            return res.send({error:'Password is Required'})
        }
        
        //Check user
        const existingUser = await UserModel.findOne({email})
        //existing user
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:'Already Register please login'
            })
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new UserModel({name,dateOfBirth,email,password:hashedPassword}).save()
        res.status(201).send({
            success:true,
            message:'User Register Successfully'
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error
        })
    }
})

//1. `GET /home`: Retrieve data.
app.get("/home", verifyToken, async(req,res)=>{
    try{
        const data = await DataModel.find();
        res.status(200).send(data)
    }catch (error) {
        res.status(500).send({ success: false, message: 'Error fetching data' });
      }
})


app.listen(PORT,()=>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode on ${PORT}`)
})