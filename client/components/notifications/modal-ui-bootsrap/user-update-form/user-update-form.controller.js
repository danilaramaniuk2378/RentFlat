/*global console:true*/

export default class UpdateUserController {
    constructor (user, $uibModalInstance, User) {
        'ngInject';

        this.user = user;
        this.userToUpdate = Object.assign({}, user);
        this.User = User;
        this.$uibModalInstance = $uibModalInstance;
    }

    save (form) {
        if (form.$valid) {
            this.User.update(this.userToUpdate).$promise
                .then((response) => {
                    this.user.username = response.user.username;
                    this.user.isAdmin = response.user.isAdmin;

                    this.$uibModalInstance.close('close');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    close () {
        this.$uibModalInstance.dismiss('cancel');
    }
}
