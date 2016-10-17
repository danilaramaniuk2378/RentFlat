'use strict';

var config = require('../config');
var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport('SMTP', {
    service: 'SendGrid',
    auth: {
        user: config.SENDGIRD_USER,
        pass: config.SENDGIRD_PASSWORD
    }
});

exports.sendForgotEmail = function (email, host, token, cb) {
    var mailOptions = {
        to: email,
        from: 'rentflat@rentflat.com',
        subject: 'Восстановление пароля',
        text: 'Вы получили это письмо, потому что ' +
        'вы или кто-то сделал запрос восстановления\n\n ' +
        'Перейдите по ссылке для восстановления пароля:\n\n ' +
        'http://' + host + '#/reset/' + token + '\n\n ' +
        'Если вы не хотите восстанавливать пароль ' +
        '- игнорируйте письмо.\n'
    };

    smtpTransport.sendMail(mailOptions, function (err) {
        return cb(err, email);
    });
};

exports.sendSuccessAddFlatEmail = function (email, flat, cb) {
    var mailOptions = {
        to: email,
        from: 'rentflat@rentflat.com',
        subject: 'Добавление квартиры',
        text: 'Ваше объявление выслано ' +
        'на рассмотрение администратору'
    };

    smtpTransport.sendMail(mailOptions, function (err) {
        return cb(err, flat);
    });
};

exports.mailAdmin = function (flat, cb) {
    var mailOptions = {
        to: 'juno_87@mail.ru',
        cc: 'daniladanila2378@gmail.com',
        from: 'rentflat@rentflat.com',
        subject: 'Добавление квартиры',
        text: 'Добавлен новый объект '
    };

    smtpTransport.sendMail(mailOptions, function (err) {
        return cb(err, flat);
    });
};

