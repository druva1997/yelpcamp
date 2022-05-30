const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')

const Product = require('./modelMongo/product')

mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log('connection open!');
    }).catch(err => {
        console.log('Mongo connection error!');
        console.log(err);
    })


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}))

app.get('/product',async (req, res) => {

    const products = await Product.find({})
    // console.log(products)
    res.render('productss1/index',{products});
});

app.get('/product/new',(req,res)=>{
res.render('productss1/new' );
});


app.post('/product',(req,res)=>{
console.log(req.body)
res.send('making tour product');
});


app.get('/product/:id', async(req,res)=>{
    const{id} = req.params;
    const product1= await Product.findById(id)
    console.log(product1)
    res.render('product1/show', {product1})
    // res.send('details page')
});

app.listen(8000, () => {
    console.log("app is listening port 3000");
});