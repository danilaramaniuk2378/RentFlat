export default class FacebookButtonController {
    constructor (AuthService, $state) {
        'ngInject';

        this.AuthService = AuthService;
        this.$state = $state;
    }

    facebookLogin () {
        this.AuthService.facebookLogin()
            .then(() => {
                this.$state.go('main');
            });
    }
}
