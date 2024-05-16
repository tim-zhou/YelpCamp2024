const mongoose = require('mongoose');
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campgrounds')

mongoose.connect('mongodb://localhost:27017/YelpCamp', {})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})


const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i <50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Tempor anim do eiusmod reprehenderit in ad. Sit sunt minim eiusmod anim et qui laboris qui do Lorem tempor sint amet. Aliquip dolore nulla commodo velit nisi ad ipsum labore. Esse qui proident amet aliqua ut mollit esse irure veniam id ullamco commodo fugiat. Amet exercitation voluptate magna mollit.',
            price
        })
        await camp.save()
    }
}

seedDB();