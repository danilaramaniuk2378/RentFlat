export default class ModalController {
    constructor (tempModalOptions, $uibModalInstance) {
        'ngInject';

        this.modalOptions = tempModalOptions;
        this.$uibModalInstance = $uibModalInstance;
    }

    ok (result) {
        this.$uibModalInstance.close(result);
    }

    close () {
        this.$uibModalInstance.dismiss('cancel');
    }
}
