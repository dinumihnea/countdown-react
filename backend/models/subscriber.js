const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Subscriber', new Schema({
    email: {type: String, unique: true, required: true},
    date: {type: Date, required: true}
}));
