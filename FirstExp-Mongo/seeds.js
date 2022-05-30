const mongoose = require('mongoose')
const Product = require('./modelMongo/product')

mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log('connection open!');
    }).catch(err => {
        console.log('Mongo connection error!');
        console.log(err);
    })

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// });

// p.save()
//     .then(p => {
//         console.log(p)
//     })
//     .catch(e=>{
//         console.log(e)
//     })

const seedProducts = [
    {
        name: 'Orange',
        price: 12.99,
        category: 'vegetable'
    },
    {
        name: 'Apple',
        price: 12.99,
        category: 'diary'
    },
    {
        name: 'banana',
        price: 11,
        category: 'fruit'
    },
    {
        name: 'tomamto',
        price: 12.99,
        category: 'vegetable'
    },

]

Product.insertMany(seedProducts)
.then (res =>{
    console.log(res)
})
.catch (e=>{
    console.log(e)
})