import MapHtml from './map.html';
import MapController from './map.controller';

export default () => {
    return {
        template: MapHtml,
        restrict: 'E',
        replace: true,
        controller: MapController,
        controllerAs: 'mapCtrl',
        scope: {
            flats: '=',
            search: '=?'
        }
    };
};
