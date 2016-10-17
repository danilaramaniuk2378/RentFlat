/*global angular:true*/

import NavbarDirective from './navbar.directive.js';
import NavbarController from './navbar.controller.js';

export default angular.module('app.module.navbar', [])
    .directive('navbar', () => new NavbarDirective())
    .controller('NavbarController', NavbarController)
    .name;
