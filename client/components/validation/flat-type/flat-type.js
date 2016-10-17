export default (flatType) => {
    if (flatType === 'flat') {
        return {
            title: 'Квартира',
            icon: 'http://maps.google.com/mapfiles/kml/pal3/icon21.png'
        };
    }
    else if (flatType === 'house') {
        return {
            title: 'Коттедж',
            icon: 'http://maps.google.com/mapfiles/kml/pal3/icon48.png'
        };
    }
    else if (flatType === 'hostel') {
        return {
            title: 'Хостел',
            icon: 'http://maps.google.com/mapfiles/kml/pal2/icon28.png'
        };
    }

    return {
        title: 'Не определено',
        icon: 'http://maps.google.com/mapfiles/kml/pal3/icon21.png'
    };
};
