/*global console:true*/

export default class SignupController {
    constructor (AuthService, $state, ACCOUNT) {
        'ngInject';

        this.user = {};
        this.serverError = null;
        this.submitted = false;

        this.AuthService = AuthService;
        this.$state = $state;
        this.ACCOUNT_CONST = ACCOUNT;
    }

    register (form) {
        this.submitted = true;

        if (form.$valid) {
            this.AuthService.createUser(this.user)
                .then((response) => {
                    if (response.status === this.ACCOUNT_CONST.RESPONSE_401) {
                        this.serverError = this.ACCOUNT_CONST.REPEATED_PASS_ERROR;
                    }
                    else {
                        this.$state.go('main');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}
