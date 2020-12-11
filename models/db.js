const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://AnupamDevelopment:Anupam123@cluster0.kglnj.mongodb.net/form?retryWrites=true&w=majority', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./employee.model');
