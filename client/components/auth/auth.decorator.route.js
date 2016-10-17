export default ($rootScope, $state, AuthService) => {
    'ngInject';

    $rootScope.$on('$stateChangeStart', (event, next) => {
        if (!next.authenticate) {
            return;
        }

        const admin = 'admin';
        const noAuth = 'no-auth';

        if (next.authenticate === admin && !AuthService.isAdmin()) {
            event.preventDefault();
            $state.go('main');
            return;
        }

        if (next.authenticate === noAuth && AuthService.isLogin()) {
            event.preventDefault();
            $state.go('main');
            return;
        }
    });
};
