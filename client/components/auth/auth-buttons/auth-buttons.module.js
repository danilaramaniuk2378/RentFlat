/*global angular:true*/

import './auth-buttons.css';
import FacebookButton from './facebook/facebook.button.directive';

export default angular.module('app.module.auth-buttons', [])
    .directive('facebookButton', FacebookButton)
    .name;
