/*global console:true*/

export default class ForgotRecoveryController {
    constructor (EmailService, user, $state, User, $stateParams, AuthService) {
        'ngInject';

        this.confirmPassword = '';
        this.password = '';
        this.submitted = false;

        this.user = user;
        this.$stateParams = $stateParams;
        this.UserResource = User;
        this.$state = $state;
        this.EmailService = EmailService;
        this.AuthService = AuthService;
    }

    goMain () {
        this.$state.go('main');
    }

    resetPassword (form) {
        this.submitted = true;

        if (form.$valid) {
            this.UserResource.resetPassword(
                {
                    recoveryToken: this.$stateParams.recoveryToken
                },
                {
                    password: this.password
                }
            ).$promise
                .then((response) => {
                    this.AuthService.loginUserByToken(response.token);
                    this.goMain();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}
