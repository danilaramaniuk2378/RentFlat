export default (items, searchObject) => {
    if (!searchObject) {
        return items;
    }

    return items.filter((item) => {
        const isType = item.type === searchObject.type;
        const isFlatNumber = (searchObject.roomsNumber.indexOf(item.roomsNumber) > -1 || searchObject.roomsNumber.length === 0)
            || (searchObject.roomsNumber.indexOf(5) > -1 && item.roomsNumber >= 5);

        return isType && isFlatNumber;
    });
};
