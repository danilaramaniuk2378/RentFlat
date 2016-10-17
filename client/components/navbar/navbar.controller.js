export default class NavbarController {
    constructor ($state) {
        'ngInject';

        this.isCollapsed = true;
        this.$state = $state;

        this.menu = [
            {
                title: 'Главная',
                state: 'main'
            },
            {
                title: 'Подать объявление',
                state: 'flat-new-form'
            },
            {
                title: 'Карта',
                state: 'map'
            }
        ];
    }
}
