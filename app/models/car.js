/** 
 * Mongoose Schema for the Entity Car
 * @author Clark Jeria
 * @version 0.0.3
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CarSchema   = new Schema({
    driver: { type: Schema.Types.ObjectId, ref: 'Driver', required: true },
    license: {type: String, maxLength: 10, required: true},
    doorCount: {type: Number, min: 1, max: 8, required: true, trim: true },      
    make: {type: String, maxLength: 18, required: true},
    model: {type: String, maxLength: 18, required: true},
});

module.exports = mongoose.model('Car', CarSchema);