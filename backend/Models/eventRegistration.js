const mongoose = require('mongoose');

const eventRegistrationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  rollNo: { type: String, required: true },
  contactNo: { type: String, required: true },
  dynamic: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('EventRegistration', eventRegistrationSchema);
