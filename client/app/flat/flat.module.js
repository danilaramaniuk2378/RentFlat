/*global angular:true*/

import NewFlatFormHtml from './flat-new-form/flat-new-form.html';
import NewFlatFormController from './flat-new-form/flat-new-form.controller';
import FlatDetailsHtml from './flat-details/flat-details.html';
import FlatDetailsController from './flat-details/flat-details.controller';

export default angular.module('app.flat-new-form', [])
    .config(($stateProvider) => {
        $stateProvider
            .state('flat-new-form', {
                url: '/flat-new-form',
                template: NewFlatFormHtml,
                controller: NewFlatFormController,
                controllerAs: 'newFlat'
            })
            .state('flat-details', {
                url: '/flat-details/:flatId',
                template: FlatDetailsHtml,
                controller: FlatDetailsController,
                controllerAs: 'flatDetails',
                resolve: {
                    flat: (Flat, $stateParams) => {
                        'ngInject';

                        return Flat.get({
                            id: $stateParams.flatId
                        }).$promise;
                    }
                }
            });
    }).name;
