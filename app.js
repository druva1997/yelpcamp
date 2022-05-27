const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate=require('ejs-mate');
const methodOverride = require('method-override');
const campground = require('./models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp');

const app = express();

app.engine('ejs',ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride ('_method'))
app.get('/', (req, res) => {
    res.render("campgrounds/home")
});

app.get('/makecampground', async (req, res) => {
    const camp = new campground({ title: 'My backyard', description: 'cheap camping' });
    await camp.save();
    res.send(camp)
});

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await campground.find({});
    res.render('campgrounds/index', { campgrounds })
});
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.post('/campgrounds', async (req, res) => {
    console.log(req.body.campground)
    const campgrounds = new campground(req.body.campground);
    await campgrounds.save();
    res.redirect(`/campgrounds/${campgrounds._id}`)

})



app.get('/campgrounds/:id', async (req, res,) => {
    const {id}=req.params
    console.log(id)
    const campgrounds = await campground.findById(id)
    console.log(campgrounds)

    res.render('campgrounds/show', { campgrounds });
});

app.get('/campgrounds/:id/edit',async(req,res)=>{
    const campgrounds = await campground.findById(req.params.id)
    res.render('campgrounds/edit', { campgrounds });

})

app.put('/campgrounds/:id',async(req,res)=>{
const {id}= req.params;
const campgrounds= await campground.findByIdAndUpdate(id,{...req.body.campground});
res.redirect(`/campgrounds/${campgrounds._id}`)

});

app.delete('/campgrounds/:id',async(req,res)=>{
    const{id}=req.params;
    await campground.findOneAndDelete(id);
    res.redirect('/campgrounds');
})





app.listen(3000, () => {
    console.log("serving on port 6000 ")
})