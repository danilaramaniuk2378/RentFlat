/*global angular:true*/

import MatchDirective from './match/match.directive';
import TelFilter from './tel-filter/tel-filter';
import FlatTypeFilter from './flat-type/flat-type.js';

export default angular.module('app.module.validation', [])
    .directive('match', MatchDirective)
    .filter('tel', () => TelFilter)
    .filter('flatType', () => FlatTypeFilter)
    .name;
