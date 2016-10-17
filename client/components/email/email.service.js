/*global console:true*/

export default class EmailService {
    constructor ($http) {
        'ngInject';

        this.$http = $http;
    }

    sendForgotEmail (email) {
        return this.$http.post('/email/forgot', { email })
            .then((response) => response)
            .catch((error) => {
                console.log(error);
                return error;
            });
    }
}
