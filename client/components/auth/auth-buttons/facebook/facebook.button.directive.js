import FacebookButtonHtml from './facebook.button.html';
import FacebookController from './facebook.button.controller';
import './facebook.button.css';

export default () => {
    return {
        template: FacebookButtonHtml,
        restrict: 'E',
        controllerAs: 'facebook',
        controller: FacebookController
    };
};
