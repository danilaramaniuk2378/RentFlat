'use strict';

var Flat = require('../models/flat');
var errorMessage = require('../consts/errors');
var statusMessages = require('../consts/status');
var async = require('async');
var aws = require('./aws');
var emailController = require('./email');

exports.getAllFlats = function (req, res, next) {
    Flat.find().exec(function (err, flats) {
        if (err) {
            return next(err);
        }

        res.send(flats);
    });
};

exports.deleteFlatById = function (req, res, next) {
    Flat.findOne({ _id: req.params.id }).remove().exec(function (err) {
        if (err) {
            return next(err);
        }

        return res.status(200).send({
            statusMessages: statusMessages.FLAT_DELETED
        });
    });
};

exports.updateFlatById =  function (req, res, next) {
    var body = req.body;

    if (!body.address || !body.price) {
        res.status(400).end(errorMessage.BAD_REQUEST);
    }

    Flat.findOne({ _id: req.params.id }, function (err, flat) {
        if (err) {
            return next(err);
        }

        if (!flat) {
            return res.status(401).send(errorMessage.NO_SUCH_FLAT);
        }

        flat.address = body.address;
        flat.price = body.price;
        flat.isApproved = body.isApproved;

        flat.save(function (err) {
            if (err) {
                return next(err);
            }

            res.status(201).send({
                flat: flat
            });
        });
    });
};

exports.getFlatById = function (req, res, next) {
    Flat.findOne({ _id: req.params.id }, function (err, flat) {
        if (err) {
            return next(err);
        }

        if (!flat) {
            return res.status(401).send(errorMessage.NO_SUCH_FLAT);
        }

        res.status(201).send(flat);
    });
};

exports.getAllApprovedFlats = function (req, res, next) {
    Flat.find({ isApproved: true }).exec(function (err, flats) {
        if (err) {
            return next(err);
        }

        res.send(flats);
    });
};

exports.addFlatToDB = function (req, res, next) {
    var body = req.body;

    if (!body.address || !body.price || !body.phone || !body.roomsNumber || !body.type) {
        res.status(400).end(errorMessage.BAD_REQUEST);
    }

    var imgUrls = [];
    var waterfallArrayOfFunctions = [];
    var files = req.files.file;


    Object.keys(files).forEach(function (key) {
        waterfallArrayOfFunctions.push(function (done) {
            aws.addPhotoToS3(
                new Date().getTime() + '_' + files[key].name,
                files[key].path,
                function (err, data) {
                    if (err) {
                        return res.status(500).send(err);
                    }

                    imgUrls.push(data.Location);
                    done(err);
                }
            );
        });
    });

    async.waterfall(
        waterfallArrayOfFunctions.concat(
            [
                function (done) {
                    var flat = new Flat({
                        address: body.address,
                        apartments: body.apartments,
                        cottage: body.cottage,
                        ownerId: req.user._id,
                        price: body.price,
                        photoUrls: imgUrls,
                        phone: body.phone,
                        roomsNumber: body.roomsNumber,
                        type: body.type
                    });

                    flat.save(function (err) {
                        done(err, flat);
                    });
                },
                function (flat, done) {
                    const userEmail = req.user.email ? req.user.email : req.user.facebook.email; // TODO: improve hot fix

                    emailController.sendSuccessAddFlatEmail(userEmail, flat, done);
                },
                function (flat, done) {
                    emailController.mailAdmin(flat, done);
                }
            ]
        ),
        function (err, flat) {
            if (err) {
                return next(err);
            }

            return res.status(200).send(flat);
        }
    );
};
