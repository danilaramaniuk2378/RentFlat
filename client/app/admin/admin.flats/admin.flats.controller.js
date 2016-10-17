/*global console:true*/

export default class MainController {
    constructor (flats, $state, ModalService, FlatUpdateModal) {
        'ngInject';

        this.flats = flats;
        this.$state = $state;
        this.ModalService = ModalService;
        this.flatUpdateModal = FlatUpdateModal;
        this.search = {};
    }

    showFlatDetailPage (flat) {
        this.$state.go(
            'flat-details',
            {
                flatId: flat._id
            }
        );
    }

    showDeleteModal (flat) {
        var modalOptions = {
            closeButtonText: 'Нет',
            actionButtonText: 'Да',
            headerText: 'Удалить квартиру',
            bodyText: `Вы уверены, что хотите удалить квартиру по адресу ${flat.address}?`
        };

        this.ModalService.show({}, modalOptions)
            .then(() => flat.$remove())
            .then(() => this.flats.splice(this.flats.indexOf(flat), 1))
            .catch((err) => {
                console.log(err);
            });
    }

    showUpdateModal (flat) {
        this.ModalService.show(this.flatUpdateModal(flat), {});
    }
}
