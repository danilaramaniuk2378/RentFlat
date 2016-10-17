import './input-file.css';
// TODO: Make progress bar and more configurable also use ngModel and reorginize code
import InputPhotoHtml from './input.photo.html';

export default () => {
    return {
        template: InputPhotoHtml,
        restrict: 'E',
        scope: {
            photoSize: '@',
            photoModel: '=',
            label: '@',
            submitted: '=',
            isRequired: '=',
            isDisabled: '='
        }
    };
};
