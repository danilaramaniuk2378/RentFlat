import FlatSearchHtml from './flat-search.html';
import './flat-search.css';
import FlatSearchController from './flat-search.controller';

export default () => {
    return {
        template: FlatSearchHtml,
        restrict: 'E',
        scope: {
            search: '='
        },
        controller: FlatSearchController,
        controllerAs: 'searchCtrl'
    };
};
