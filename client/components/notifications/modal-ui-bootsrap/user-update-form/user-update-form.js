import ModalUpdateUserController from './user-update-form.controller.js';
import ModalUpdateUserHtml from './user-update-form.html';

export default (user) => {
    return {
        controllerAs: 'modalUpdateUser',
        controller: ModalUpdateUserController,
        template: ModalUpdateUserHtml,
        resolve: {
            user: user
        }
    };
};
