require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const multer = require('multer');
const employeeController = require('./controllers/employeeController');

var app = express();
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb (null, 'uploads');
    },
filename: (req, file, cb)=>{
    cb(null, new Date().toISOString().replace(/:/g,'-')+ file.originalname);
    
}
});

const filefilter = (req,file,cb)=>{
    if (file.mimetype === 'image/png'|| file.mimetype === 'image/jpeg'||file.mimetype === 'image/jpg' ){
        cb(null,true);
    } else {
        cb ( null, false);
    }
};

app.use(multer({ storage: fileStorage, fileFilter: filefilter }).single('image'));
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(process.env.PORT, () => {
    console.log('Express server started at port : 3000');
});

app.use('/employee',employeeController);
