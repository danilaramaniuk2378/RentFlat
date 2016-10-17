/*global google:true*/

export default () => {
    return {
        require: 'ngModel',
        link: (scope, element, attrs, model) => {
            model.$validators.googleplace = (modelValue) => modelValue ? Boolean(modelValue.latitude) : false;

            const options = {
                language: 'ru',
                componentRestrictions: {
                    country: 'by'
                }
            };

            const details = {};

            const autocomplete = new google.maps.places.Autocomplete(element[0], options);

            autocomplete.addListener('place_changed', () => {
                const geoComponents = autocomplete.getPlace();

                details.latitude = geoComponents.geometry.location.lat();
                details.longitude = geoComponents.geometry.location.lng();

                geoComponents.address_components.map((component) => {
                    switch (component.types[0]) {
                        case 'route': // street
                            details.street = component.short_name;
                            return true;
                        case 'street_number':
                            details.streetNumber = component.short_name;
                            return true;
                        case 'locality':
                            details.city = component.short_name;
                            return true;
                        default:
                            return false;
                    }
                });

                scope.$apply(() => {
                    model.$setViewValue(details);
                });
            });
        }
    };
};
