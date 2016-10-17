'use strict';

var UserModel = require('../models/user');
var authHelper = require('../helpers/auth');
var errorMessage = require('../consts/errors');
var async = require('async');
var crypto = require('crypto');
var email = require('./email');
var userController = require('./user');
var config = require('../config');

exports.authenticate = function (req, res, next) {
    var body = req.body;

    if (!body.email || !body.password) {
        res.status(400).end(errorMessage.MUST_PROVIDE_EMAIL_OR_PASSWORD);
    }

    UserModel.findOne({ email: body.email }, function (err, user) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401)
                .send(errorMessage.EMAIL_OR_PASSWORD_DONT_MATCH);
        }

        user.comparePassword(body.password, function (err, isMatch) {
            if (err) {
                return next(err);
            }

            if (isMatch) {
                return res.status(201).send({
                    token: authHelper.createToken(user)
                });
            }

            return res.status(401)
                .send(errorMessage.EMAIL_OR_PASSWORD_DONT_MATCH);
        });
    });
};

exports.sendForgotEmail = function (req, res, next) {
    if (!req.body.email) {
        res.status(400).end(errorMessage.BAD_REQUEST);
    }

    async.waterfall(
        [
            function (done) {
                crypto.randomBytes(20, function (err, buf) {
                    done(err, buf.toString('hex'));
                });
            },
            function (token, done) {
                userController.setResetPasswordToken(req.body.email, token, done, next, res);
            },
            function (token, user, done) {
                email.sendForgotEmail(user.email, req.headers.host, token, done);
            }
        ],
        function (err, email) {
            if (err) {
                return next(err);
            }

            return res.status(200).send(email);
        }
    );
};

exports.loginFacebook = function(req, res, next) {
    var profile = req.body.profile;
    var signedRequest = req.body.signedRequest;
    var encodedSignature = signedRequest.split('.')[0];
    var payload = signedRequest.split('.')[1];

    // TODO: explain this sort of magic (it's copy past)
    var expectedSignature = crypto.createHmac('sha256',
        config.FACEBOOK_AUTH.clientSecret).update(payload).digest('base64');
    expectedSignature = expectedSignature.replace(/\+/g, '-')
        .replace(/\//g, '_').replace(/=+$/, '');

    if (encodedSignature !== expectedSignature) {
        return res.status(400).send(errorMessage.INVALID_REQUEST_SIGNATURE);
    }

    UserModel.findOne({ 'facebook.id': profile.id }, function(err, existingUser) {
        if (err) {
            return next(err);
        }

        if (existingUser) {
            return res.status(201).send({
                token: authHelper.createToken(existingUser)
            });
        }

        var user = new UserModel({
            username: profile.name,
            facebook: {
                id: profile.id,
                email: profile.email
            }
        });

        user.save(function(err) {
            if (err) {
                return next(err);
            }

            return res.status(200).send({
                token: authHelper.createToken(user)
            });
        });
    });
};
