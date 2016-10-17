/* jslint node: true */
'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('./config');
var mongoose = require('mongoose');

require('./models/user');
require('./models/flat');

mongoose.connect(config.MONGO_URI);

var app = express();

app.use(bodyParser.json());
app.use(express.static(path.join('public')));
app.use(cors());

app.use(require('./routes'));

app.use(function (err, req, res) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(config.PORT, function () {
    console.log('Server running on ' + config.PORT);
});
