const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    dueDate: Date,
    status:{
        type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
