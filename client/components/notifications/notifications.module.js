/*global angular:true*/

import AlertDirective from './alert/alert.directive';
import ModalService from './modal-ui-bootsrap/modal-ui-bootsrap.service';
import UserUpdateModal from './modal-ui-bootsrap/user-update-form/user-update-form';
import FlatUpdateModal from './modal-ui-bootsrap/flat-update-form/flat-update-form';

export default angular.module('app.module.notifications', [])
    .directive('customAlert', AlertDirective)
    .service('ModalService', ModalService)
    .value('UserUpdateModal', UserUpdateModal)
    .value('FlatUpdateModal', FlatUpdateModal)
    .name;
