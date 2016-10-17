import ModalUIBootstrapServiceHTML from './modal-ui-bootsrap.html';
import ModalUIBootstrapController from './modal-ui-bootsrap.controller';

export default class ModalUIBootstrapService {
    constructor ($uibModal) {
        'ngInject';

        this.$uibModal = $uibModal;

        this.modalDefaults = {
            controllerAs: 'modalUI',
            template: ModalUIBootstrapServiceHTML
        };

        this.modalOptions = {
            closeButtonText: 'Close',
            actionButtonText: 'OK',
            headerText: 'headerText',
            bodyText: 'bodyText'
        };
    }

    show (customModalDefaults, customModalOptions) {
        var tempModalDefaults = Object.assign({}, this.modalDefaults, customModalDefaults);
        var tempModalOptions = Object.assign({}, this.modalOptions, customModalOptions);

        if (!tempModalDefaults.controller) {
            tempModalDefaults.resolve = {
                tempModalOptions
            };

            tempModalDefaults.controller = ModalUIBootstrapController;
        }

        return this.$uibModal.open(tempModalDefaults).result;
    }
}
