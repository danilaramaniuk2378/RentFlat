import FlatPreviewHtml from './flat.preview.html';
import './flat.preview.css';

export default () => {
    return {
        template: FlatPreviewHtml,
        restrict: 'E',
        scope: {
            flat: '=',
            small: '=?',
            close: '&?'
        }
    };
};
