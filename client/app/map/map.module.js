/*global angular:true*/

import MapHtml from './map.html';
import MapController from './map.controller';
import './map.css';

export default angular.module('app.map', [])
    .config(($stateProvider) => {
        $stateProvider
            .state('map', {
                url: '/map',
                template: MapHtml,
                controller: MapController,
                controllerAs: 'mapCtrl',
                resolve: {
                    flats: (Flat) => {
                        'ngInject';

                        return Flat.getApprovedFlats().$promise;
                    }
                }
            });
    }).name;
