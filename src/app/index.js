const express = require("express");
const methodOverride = require("method-override");
const morgan = require("morgan");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize")
const path = require ('path');
const Form = require('../database/models');
const app = express();

//instance mongoose
app.use(mongoSanitize());
//cross-origin 
app.use(cors());

//development
app.use(morgan("dev"));

//set template engine
app.set('view engine', 'ejs');
// middlewares
app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, '../../public/')));
const viewPath = path.join(__dirname, "../views");
app.set('views', viewPath)
//route for the index
app.get('/', async (request, response) => {
    let forms = await Form.find().sort({ timeCreated: 'desc' });
  
    response.render('index', { forms: forms });
    // response.render('index');
  });
const routes = require("./routes");
app.use('/forms',routes);

module.exports = app;