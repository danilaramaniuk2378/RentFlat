import NavbarHtml from './navbar.html';

export default () => {
    return {
        template: NavbarHtml,
        restrict: 'E',
        controllerAs: 'nav',
        controller: 'NavbarController'
    };
};
