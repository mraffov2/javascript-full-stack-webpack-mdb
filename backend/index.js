if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
} 

const express  = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

var upload = multer({ dest: (path.join(__dirname, 'public/uploads')) })
const app = express();
require('./database');

app.set('port', process.env.PORT || 4000);

// middlewares
app.use(morgan('dev'));
app.use(cors());

/*const storage = multer.diskStorage({
    destination: function ( req, file, cb) {
    	cb(null, (path.join(__dirname, 'public/uploads')))
    },
    filename: function(req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})*/



//app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/uploads', upload.single('image'), function (req, res, next) {
	console.log(req.files)
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

app.post('/test', (req, res) => {
	console.log(req.body, req.files);
	res.send('Received')
})

// routes
app.use('/api/games', require('./routes/games'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});