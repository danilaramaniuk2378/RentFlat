import AlertHtml from './alert.html';
import './alert.css';

export default () => {
        return {
            restrict: 'E',
            scope: {
                onCancel: '&',
                classType: '@',
                show: '='
            },
            template: AlertHtml,
            transclude: true
        };
};
