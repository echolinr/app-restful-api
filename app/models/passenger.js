/** 
 * Mongoose Schema for the Entity Passenger
 * @author Clark Jeria
 * @version 0.0.3
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PassengerSchema   = new Schema({
    firstName: {type: String, max_Length: 15}, //1-15
    lastName: {type: String, max_Length: 15},  //1-15
    emailAddress: {type: String, required: true}, // - emailAddress (Reegex `/[a-zA-Z0-9_.]+\@[a-zA-Z](([a-zA-Z0-9-]+).)*/` , required) 
    password:{type: String},// - password (Used for POST only, String, 8-16, required - No constraints, Store clear text) 
    addressLine1: {type: String, max_Length: 50},
    addressLine2: {type: String, max_Length: 50},
    city: {type: String, max_Length: 50},
    state: {type: String, length: 2},
    zip: Number,
    phoneNumber: {type: String, required: true},// - phoneNumber (String, Regex XXX-XXX-XXXX, required)
    paymentAccount: { type: Schema.Types.ObjectId, ref: 'PaymentAccount' }   //not listed in homework.md
});

module.exports = mongoose.model('Passenger', PassengerSchema);

// - firstName (String, 1-15)
// - lastName (String, 1-15)
// - emailAddress (Reegex `/[a-zA-Z0-9_.]+\@[a-zA-Z](([a-zA-Z0-9-]+).)*/` , Required) 
// - password (Used for POST only, String, 8-16, Required - No constraints, Store clear text) 
// - addressLine1 (String, 50)
// - addressLine2 (String, 50)
// - city (String, 50)
// - state (String, 2)
// - zip (String, 5)
// - phoneNumber (String, Regex XXX-XXX-XXXX, Required)