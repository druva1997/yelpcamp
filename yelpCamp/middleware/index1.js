const express=require('express')
const path=require('path')
const app=express();
const mongoose=require('mongoose')
const AppError = require('./appError')


app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/agriMart1');
  console.log('connected to mongoose')
}


app.get('/products',async(req,res)=>{
   let products= await Product.find({})
   res.render('show',{products})
})
app.get('/products/new',(req,res)=>{
  throw new AppError('not allowed',404)
   res.render('new')
})
function handleError(fn){
  return function(req,res,next){
    fn(req,res,next).catch(e=>next(e))
  }
}
app.get('/products/:id',handleError(async(req,res,next)=>{
    const {id}=req.params
    let product=await Product.findById(id)
   
    console.log(product)
    res.render('details',{product})

}))
// app.get('/products/:id',async(req,res,next)=>{
//   try{
//     const {id}=req.params
//     let product=await Product.findById(id)
   
//     console.log(product)
//     res.render('details',{product})
//   }catch(e){
//     next(e)
//   }
  
// })

app.post('/products',async(req,res)=>{
  console.log(req.body)
  let product=new Product(req.body)
  await product.save();
  res.redirect('/products')
})
app.get('/products/async/a',async(req,res,next)=>{
  if(true){
    next(new AppError('error occured vchfuy',502))
  }
})
app.use((req,res)=>{
    res.send('heyyyy')
})
app.use((err,req,res,next)=>{
  const {error=500,message='error accured'}=err
  res.status(error).send(message)
})


app.listen(3000,()=>[
    console.log('app is listening')
])