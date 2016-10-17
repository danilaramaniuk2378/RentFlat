/*global angular:true*/
import AuthService from './auth.service.js';
import AuthInterceptor from './auth.interceptor.js';
import authRoutes from './auth.decorator.route.js';
import User from './user.factory.js';
import AuthButtons from './auth-buttons/auth-buttons.module';

export default angular.module('app.module.auth', [ AuthButtons ])
    .service('AuthService', AuthService)
    .service('AuthInterceptor', AuthInterceptor)
    .factory('User', User)
    .run(authRoutes)
    .name;
