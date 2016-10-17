/*global angular:true*/

import InputPhoto from './input-photo/input.photo.directive';
import InputGA from './input-google-autocomplete/input-google-autocomplete.directive';

export default angular.module('app.module.inputs', [])
    .directive('inputPhoto', InputPhoto)
    .directive('googleplace', InputGA)
    .name;
