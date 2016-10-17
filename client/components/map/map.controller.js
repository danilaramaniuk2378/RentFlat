export default class MapController {
    constructor (NgMap) {
        'ngInject';

        this.flatToShow = null;

        NgMap.getMap(0).then((map) => {
            const customMarker = map.customMarkers[0];

            this.showCustomMarker = (event, flat) => {
                this.flatToShow = flat;
                customMarker.setVisible(true);
                customMarker.setPosition(customMarker.getPosition());
            };

            this.closeCustomMarker = () => {
                // TODO: event prevent default
                customMarker.setVisible(false);
            };
        });
    }
}

