const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require("./seedHelpers");
const Campground = require('../models/campground');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
    console.log("connected")
};
const sample = array => array[Math.floor(Math.random() * array.length)]
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)}${sample(places)}`,
            description:'Druva druvadruvadruvadruvadruvadruvadruvadruvadruvadruvadruvadruvadruvadruvadruvadruvadruvadruvadruvadruvadruvadruvadruva',
            price: Math.floor(Math.random()*100),
            image : "https://source.unsplash.com/collection/483251"
        })
        await camp.save();
    }
}
seedDB();
