const express = require('express');
const app= express();
const morgan = require('morgan');

app.use(morgan('common'))
app.use((req,res,next)=>{
    console.log("this is my first middleware")
    next();
})

app.get('/',(req,res)=>{
    res.send('home page')
})
app.get('/dogs',(req,res)=>{
    res.send('wooof woooof')
})

app.listen(3000,()=>{
    console.log('app is running in 3000')
})
