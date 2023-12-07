const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  },
  message: String,
  isRead: Boolean,
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
