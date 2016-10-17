/*global console:true*/

export default class LoginController {
    constructor (AuthService, $state, ACCOUNT) {
        'ngInject';

        this.user = {};
        this.serverError = '';
        this.submitted = false;

        this.AuthService = AuthService;
        this.$state = $state;
        this.ACCOUNT = ACCOUNT;
    }

    login (form) {
        this.submitted = true;

        if (form.$valid) {
            this.AuthService.login(this.user)
                .then((response) => {
                    if (response.status === this.ACCOUNT.RESPONSE_401) {
                        this.serverError = this.ACCOUNT.WRONG_PASS_ERROR;
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
