/*global console:true*/

export default class ForgotController {
    constructor (EmailService, $state, ACCOUNT, ModalService) {
        'ngInject';

        this.email = '';
        this.serverError = '';
        this.submitted = false;

        this.EmailService = EmailService;
        this.ModalService = ModalService;
        this.ACCOUNT = ACCOUNT;
        this.$state = $state;
    }

    resetPassword (form) {
        this.submitted = true;

        if (form.$valid) {
            this.EmailService.sendForgotEmail(this.email)
                .then((response) => {
                    if (response.status === this.ACCOUNT.RESPONSE_401) {
                        this.serverError = this.ACCOUNT.NO_SUCH_EMAIL;
                    }
                    else {
                        var modalOptions = {
                            closeButtonText: false,
                            actionButtonText: 'Ок',
                            headerText: 'Оповещение',
                            bodyText: `Письмо выслано вам на почтовый ящик <b>${this.email}</b>`
                        };

                        this.ModalService.show({ backdrop: 'static' }, modalOptions)
                            .then(this.$state.go.bind(this, 'main'));
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}
