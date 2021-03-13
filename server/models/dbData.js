const mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({

    date: {
        type: String
    },
    activeType: {
        type: String
    },
    dis: {
        type: String
    },
    sTime: {
        type: String
    },
    fTime: {
        type: String
    },
    restime: {
        type: String
    },
    speed: {
        type: String
    }


});

const model = mongoose.model('dataSchema', dataSchema);



module.exports = model;

// mongoose.model('Data', dataSchema);