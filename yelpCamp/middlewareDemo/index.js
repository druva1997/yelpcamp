const express=require('express')
const app=express();
const morgan=require('morgan')

const AppError=require('./appError')

let checkPass=function(req,res,next){
    let {pass}=req.query
    if(pass=='Druva'){
        next();
    }
    else{
        throw new AppError()
    }
}
app.get('/secrete',checkPass,(req,res)=>{
    res.send('yeyy matched')
})
app.use((req,res)=>{
    throw new AppError('you are not admin',403)
})
app.use((err,req,res,next)=>{
    console.log('worked')
    const {status=500,message='this is an error'}=err;
    res.status(status).send(message)
})

app.listen(3000,()=>{
    console.log('listening')
})
