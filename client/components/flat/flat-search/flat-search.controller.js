export default class {
    constructor ($scope) {
        'ngInject';
        this.scope = $scope;

        this.filtersRentType = [
            {
                title: 'Квартиры',
                type: 'flat'
            },
            {
                title: 'Коттеджи',
                type: 'house'
            },
            {
                title: 'Хостелы',
                type: 'hostel'
            }
        ];

        this.filtersRoomNumber = [
            {
                quantity: 1,
                title: '1'
            },
            {
                quantity: 2,
                title: '2'
            },
            {
                quantity: 3,
                title: '3'
            },
            {
                quantity: 4,
                title: '4'
            },
            {
                quantity: 5,
                title: '5+'
            }
        ];

        this.selectedRentType = 0;
        this.selectedRentRoomNumbers = [];

        this.scope.search.type = this.filtersRentType[this.selectedRentType].type;
        this.scope.search.roomsNumber = [];
    }

    setRentType (index) {
        if (this.selectedRentType !== index) {
            this.selectedRentType = index;

            this.scope.search.type = this.filtersRentType[this.selectedRentType].type;
        }
    }

    setRentRoomNumber (indexOfButtonClicked) {
        const indexInArray = this.selectedRentRoomNumbers.indexOf(indexOfButtonClicked);

        if (indexInArray > -1) {
            this.selectedRentRoomNumbers.splice(indexInArray, 1);
            this.scope.search.roomsNumber.splice(indexInArray, 1);
        }
        else {
            this.selectedRentRoomNumbers.push(indexOfButtonClicked);
            this.scope.search.roomsNumber.push(this.filtersRoomNumber[indexOfButtonClicked].quantity);
        }
    }

}
