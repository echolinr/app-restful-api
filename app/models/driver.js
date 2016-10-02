/** 
 * Mongoose Schema for the Entity Driver
 * @author Clark Jeria
 * @version 0.0.3
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DriverSchema   = new Schema({
    firstName: {type: String, minLength:1, maxLength: 15, required: true}, 
    lastName: {type: String, minLength:1, maxLength: 15, required: true}, 
    licensedState: {type: String, maxLength:2, required: true},
    emailAddress: {type: String, validate: /[a-zA-Z0-9_.]+\@[a-zA-Z](([a-zA-Z0-9-]+).)*/, required: true},   
    password: {type: String, required: true, minLength: 8, maxLength:16},
    addressLine1: {type: String, maxLength: 50},
    addressLine2: {type: String, maxLength: 50},
    city: {type: String, maxLength: 50},
    state: {type: String, maxLength: 2},
    zip: {type: String, maxLength: 5},
    phoneNumber: {type: String, required: true, validate: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/}, // phoneNumber (String, Regex XXX-XXX-XXXX, Required)
    drivingLicense: {type: String, minLength: 8, maxLength:16, required: true, },
    // car: { type: Schema.Types.ObjectId, ref: 'Car' }
});

module.exports = mongoose.model('Driver', DriverSchema);

// lastName (String, 1-15)
// emailAddress (Reegex /[a-zA-Z0-9_.]+\@[a-zA-Z](([a-zA-Z0-9-]+).)*/ , Required)
// password (Used for POST only, String, 8-16, Required - No constraints, Store clear text)
// addressLine1 (String, 50)
// addressLine2 (String, 50)
// city (String, 50)
// state (String, 2)
// zip (String, 5)
// phoneNumber (String, Regex XXX-XXX-XXXX, Required)
// drivingLicense (String, 8-16, Required)
// licensedState (String, 2, Required)