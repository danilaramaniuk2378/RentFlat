export default ($resource) => {
    'ngInject';

    return $resource(
        '/user/:id/:resetPassword/:recoveryToken',
        {
            id: '@_id',
            recoveryToken: '@recoveryToken'
        },
        {
            update: {
                method: 'PUT'
            },

            recovery: {
                method: 'GET',
                params: {
                    id: 'recovery'
                }
            },

            resetPassword: {
                method: 'PUT',
                params: {
                    resetPassword: 'resetPassword'
                }
            }
        });
};
