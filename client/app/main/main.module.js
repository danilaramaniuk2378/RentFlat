/*global angular:true*/

import MainHtml from './main.html';
import MainController from './main.controller';
import './main.css';

export default angular.module('app.main', [])
    .config(($stateProvider) => {
        $stateProvider
            .state('main', {
                url: '/',
                template: MainHtml,
                controller: MainController,
                controllerAs: 'main',
                resolve: {
                    flats: (Flat) => {
                        'ngInject';

                        return Flat.getApprovedFlats().$promise;
                    }
                }
            });
    }).name;
