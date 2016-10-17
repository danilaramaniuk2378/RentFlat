'use strict';

var mongoose = require('mongoose');

var flatSchema = new mongoose.Schema({
    address: {
        latitude: String,
        longitude: String,
        streetNumber: String,
        street: String,
        city: String
    },
    apartments: {
        accountingDocuments: Boolean,
        airConditioning: Boolean,
        appliances: String,
        balcony: String,
        floor: Number,
        furniture: String,
        heatedFloors: Boolean,
        nearPlaces: String,
        parking: String,
        priceInHolidays: Number,
        repairs: String,
        sleepPlaces: String,
        studioApartment: Boolean,
        transfer: Boolean,
        twoFloorFlat: Boolean,
        wifi: Boolean
    },
    cottage: {
        alcove: Boolean,
        appliances: String,
        billiards: Boolean,
        fireplace: Boolean,
        floors: Number,
        karaoke: Boolean,
        parking: Boolean,
        pool: Boolean,
        sleepPlaces: Number,
        spa: Boolean,
        summerCuisine: Boolean,
        terrace: Boolean
    },
    type: String,
    ownerId: { type: String, required: true },
    price: { type: Number, required: true },
    roomsNumber: { type: Number, required: true },
    phone: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
    photoUrls: [ String ]
});

module.exports = mongoose.model('Flat', flatSchema);
