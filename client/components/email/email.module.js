/*global angular:true*/

import EmailService from './email.service.js';

export default angular.module('app.module.email', [])
    .service('EmailService', EmailService)
    .name;
