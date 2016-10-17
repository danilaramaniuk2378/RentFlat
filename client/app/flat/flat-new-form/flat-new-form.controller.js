/*global console:true*/

export default class NewFlatFormController {
    constructor (AuthService, Upload) {
        'ngInject';

        this.isLogin = AuthService.isLogin();
        this.Upload = Upload;

        this.photos = {};
        this.flat = {};
        this.disableForm = false;
    }

    submitNewFlat (form) {
        this.submitted = true;

        if (form.$valid) {
            this.disableForm = true;
            this.Upload.upload({
                url: '/flat',
                method: 'POST',
                data: this.flat,
                file: this.photos
            }).then(() => {
                this.flat = {};
                this.showInfo = true;
                this.submitted = false;
                this.photos = {};
            }).catch((error) => {
                console.log('Error status: ' + error.status);
            }).then(() => {
                this.disableForm = false;
            });
        }
    }
}

