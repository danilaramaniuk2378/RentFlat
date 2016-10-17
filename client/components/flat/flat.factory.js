export default ($resource) => {
    'ngInject';

    return $resource(
        '/flat/:id/:approved',
        {
            id: '@_id'
        },
        {
            update: {
                method: 'PUT'
            },

            getApprovedFlats: {
                method: 'GET',
                isArray: true,
                params: {
                    id: 'all',
                    approved: 'approved'
                }
            }
        }
    );
};
