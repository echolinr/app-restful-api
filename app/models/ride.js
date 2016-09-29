

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
// - passenger (reference)
// - driver (reference)
// - car (reference)
// - rideType (ECONOMY, PREMIUM, EXECUTIVE)
// - startPoint  (latitude/longitude combination)
// - endPoint (latitude/longitude combination)
// - requestTime
// - pickupTime
// - dropOffTime
// - status (REQUESTED, AWAITING_DRIVER, DRIVE_ASSIGNED, IN_PROGRESS, ARRIVED, CLOSED )
// - fare
// - route (series of latitude/longitude values)

var RideSchema   = new Schema({
    passenger:{type: Schema.Types.ObjectId, ref: 'Passenger'},
    driver: { type: Schema.Types.ObjectId, ref: 'Driver' },
    car: { type: Schema.Types.ObjectId, ref: 'Car' },
    rideType = ['ECONOMY', 'PREMIUM', 'EXECUTIVE'],
    startPoint: Number,
    endPoint: Number, 
    requestTime: Date,
    pickupTime: Date,
    dropOffTime: Date,
    status = ['REQUESTED', 'AWAITING_DRIVER', 'DRIVE_ASSIGNED', 'IN_PROGRESS', 'ARRIVED', 'CLOSED'],
    fare: Number,
    route:Number
});

module.exports = mongoose.model('Ride', RideSchema);