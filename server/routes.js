'use strict';

var express = require('express');
var app = express.Router();
var authHelper = require('./helpers/auth');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var auth = require('./controllers/auth');
app.post('/login', auth.authenticate);
app.post('/email/forgot', auth.sendForgotEmail);
app.post('/auth/facebook', auth.loginFacebook);

var user = require('./controllers/user');
app.post('/user', user.createUser);
app.get('/user', authHelper.isAdmin, user.getUsers);
app.delete('/user/:id', authHelper.isAdmin, user.deleteUserById);
app.put('/user/:id', authHelper.isAdmin, user.updateUserById);
app.get('/user/recovery/:recoveryToken', user.getUserForRecovery);
app.put('/user/resetPassword/:recoveryToken', user.resetPassword);

var flat = require('./controllers/flat');
app.get('/flat', authHelper.isAdmin, flat.getAllFlats);
app.delete('/flat/:id', authHelper.isAdmin, flat.deleteFlatById);
app.put('/flat/:id', authHelper.isAdmin, flat.updateFlatById);
app.get('/flat/:id', flat.getFlatById);
app.get('/flat/all/approved', flat.getAllApprovedFlats);
app.post('/flat', multipartMiddleware, authHelper.isAuthenticate, flat.addFlatToDB);

module.exports = app;
