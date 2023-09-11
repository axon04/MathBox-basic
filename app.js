require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const {connect} = require('mongoose');
const indexRouter = require('./routes/index');

const Doc = require('./models/doc');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

connect(process.env.DBSTRING, {useNewUrlParser: true});

app.use('/', indexRouter);














app.listen(process.env.PORT, ()=>{
    console.log('PORT: \x1b[94m'+ process.env.PORT + '\x1b[0m');
})