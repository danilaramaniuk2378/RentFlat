import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import resource from 'angular-resource';
import ngMap from 'ngmap';
import ngFileUpload from 'ng-file-upload';
import Modal from 'angular-ui-bootstrap/src/modal';
import ngSanitize from 'angular-sanitize';
import uiMask from 'angular-ui-mask';

import Navbar from './components/navbar/navbar.module';
import Auth from './components/auth/auth.module';
import Validation from './components/validation/validation.module';
import Notifications from './components/notifications/notifications.module';
import Email from './components/email/email.module';
import FlatComponent from './components/flat/flat.module';
import Inputs from './components/inputs/input.module';
import CustomMap from './components/map/map.module';

import MainPage from './app/main/main.module';
import Account from './app/account/account.module';
import Admin from './app/admin/admin.module';
import FlatApp from './app/flat/flat.module';
import Map from './app/map/map.module';

angular.module('app', [
    uirouter,
    resource,
    ngMap,
    uiMask,
    Auth,
    ngSanitize,
    ngFileUpload,
    Navbar,
    Validation,
    Notifications,
    MainPage,
    Account,
    Admin,
    Email,
    FlatComponent,
    FlatApp,
    Inputs,
    Map,
    Modal,
    CustomMap
], ($httpProvider, $urlRouterProvider) => {
    'ngInject';

    $urlRouterProvider.otherwise('/');
    $httpProvider.interceptors.push('AuthInterceptor');
}).run((AuthService) => {
    'ngInject';

    const token = AuthService.getToken();

    if (token) {
        AuthService.setCurrentUserByToken(token);
    }
});
