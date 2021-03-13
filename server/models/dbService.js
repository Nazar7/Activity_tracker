const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Bob:Bob123@cluster0.k9q1i.mongodb.net/ActivityData?retryWrites=true&w=majority', { useNewUrlParser: true}, (err) => {
    
if (!err) { console.log('MongoDB Connection Succeded.') }
    else {console.log('Error in DB connection : ' + err)}
});



require('./dbData')