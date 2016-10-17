/*global angular:true*/

import MapDirective from './map.directive';
import './map.css';

export default angular.module('app.module.map', [])
    .directive('customMap', MapDirective)
    .name;
