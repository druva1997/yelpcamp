const mongoose = require('mongoose');
const { Schema } = mongoose;

const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Farm must have a name!']
    },
    city: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email required']
    },
    products:{
        type: String,
        required: [true, 'Farm must have a name!']
    }
})


const Farm = mongoose.model('Farm', farmSchema);



module.exports = Farm;