/*global angular:true*/

import FlatDirective from './flat-preview/flat.preview.directive';
import Flat from './flat.factory';
import FlatSearchDirective from './flat-search/flat-search.directive';
import FlatFilter from './flat-search/flat-search.filter';

export default angular.module('app.module.flat', [])
    .directive('flatPreview', FlatDirective)
    .directive('flatSearch', FlatSearchDirective)
    .factory('Flat', Flat)
    .filter('flatFilter', () => FlatFilter)
    .name;
