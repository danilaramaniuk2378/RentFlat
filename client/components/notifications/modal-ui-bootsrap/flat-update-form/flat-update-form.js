import ModalUpdateFlatController from './flat-update-form.controller.js';
import ModalUpdateFlatHtml from './flat-update-form.html';

export default (flat) => {
    return {
        controllerAs: 'modalUpdateFlat',
        controller: ModalUpdateFlatController,
        template: ModalUpdateFlatHtml,
        resolve: {
            flat: flat
        }
    };
};
