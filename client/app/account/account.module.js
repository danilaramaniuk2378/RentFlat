/*global angular:true*/

import LoginHtml from './login/login.html';
import LoginController from './login/login.controller';
import SignupHtml from './signup/signup.html';
import SignupController from './signup/signup.controller';
import ForgotHtml from './forgot/forgot.html';
import ForgotController from './forgot/forgot.controller';
import ForgotRecoveryHtml from './forgot/forgot.recovery.html';
import ForgotRecoveryController from './forgot/forgot.recovery.controller';

export default angular.module('app.account', [])
    .config(($stateProvider) => {
        $stateProvider
            .state('login', {
                url: '/login',
                template: LoginHtml,
                controller: LoginController,
                controllerAs: 'login',
                authenticate: 'no-auth'
            })
            .state('signup', {
                url: '/signup',
                template: SignupHtml,
                controller: SignupController,
                controllerAs: 'signup',
                authenticate: 'no-auth'
            })
            .state('forgot', {
                url: '/forgot',
                template: ForgotHtml,
                controller: ForgotController,
                controllerAs: 'forgot',
                authenticate: 'no-auth'
            })
            .state('forgotRecovery', {
                url: '/reset/:recoveryToken',
                template: ForgotRecoveryHtml,
                controller: ForgotRecoveryController,
                controllerAs: 'forgotRecovery',
                authenticate: 'no-auth',
                resolve: {
                    user: (User, $stateParams) => {
                        'ngInject';

                        return User.recovery({
                            recoveryToken: $stateParams.recoveryToken
                        }).$promise;
                    }
                }
            })
            .state('logout', {
                url: '/logout',
                controller: ($state, AuthService) => {
                    'ngInject';

                    AuthService.logout();
                    $state.go('main');
                }
            });
    })
    .constant('ACCOUNT', {
        WRONG_PASS_ERROR: 'Почта или пароль не корректны',
        REPEATED_PASS_ERROR: 'Такой email уже зарегистрирован',
        NO_SUCH_EMAIL: 'Нету такой почты',
        RESPONSE_401: 401,
        ALL_RIGHT: 200
    })
    .name;
