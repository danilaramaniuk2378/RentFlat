/*global console:true*/

export default class AdminController {
    constructor (users, ModalService, UserUpdateModal) {
        'ngInject';

        this.users = users;
        this.ModalService = ModalService;
        this.userUpdateModal = UserUpdateModal;
    }

    showDeleteModal (user) {
        const modalOptions = {
            closeButtonText: 'Нет',
            actionButtonText: 'Да',
            headerText: 'Удалить полтзователя',
            bodyText: `Вы уверены, что хотите удалить пользователя ${user.username}?`
        };

        this.ModalService.show({}, modalOptions)
            .then(() => user.$remove())
            .then(() => this.users.splice(this.users.indexOf(user), 1))
            .catch((err) => {
                console.log(err);
            });
    }

    showUpdateModal (user) {
        this.ModalService.show(this.userUpdateModal(user), {});
    }
}
