/*global angular:true*/

import AdminHtml from './admin.html';
import AdminUsersHtml from './admin.users/admin.users.html';
import AdminUsersController from './admin.users/admin.users.controller';
import AdminFlatsHtml from './admin.flats/admin.flats.html';
import AdminFlatsController from './admin.flats/admin.flats.controller';

export default angular.module('app.admin', [])
    .config(($stateProvider) => {
        $stateProvider
            .state('admin', {
                abstract: true,
                url: '/admin',
                template: AdminHtml
            })
            .state('admin.users', {
                url: '/users',
                template: AdminUsersHtml,
                controller: AdminUsersController,
                controllerAs: 'adminUser',
                authenticate: 'admin',
                resolve: {
                    users: (User) => {
                        'ngInject';

                        return User.query().$promise;
                    }
                }
            })
            .state('admin.flats', {
                url: '/flats',
                template: AdminFlatsHtml,
                controller: AdminFlatsController,
                controllerAs: 'adminFlat',
                authenticate: 'admin',
                resolve: {
                    flats: (Flat) => {
                        'ngInject';

                        return Flat.query().$promise;
                    }
                }
            });
    })
    .name;
