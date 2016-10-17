/*global console:true*/

export default class UpdateFlatController {
    constructor (flat, $uibModalInstance, Flat) {
        'ngInject';

        this.flat = flat;
        this.flatToUpdate = Object.assign({}, flat);
        this.Flat = Flat;
        this.$uibModalInstance = $uibModalInstance;
    }

    save (form) {
        if (form.$valid) {
            this.Flat.update(this.flatToUpdate).$promise
                .then((response) => {
                    const newFlat = response.flat;

                    this.flat.address = newFlat.address;
                    this.flat.price = newFlat.price;
                    this.flat.isApproved = newFlat.isApproved;

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
