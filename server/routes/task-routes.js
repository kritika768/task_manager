const express = require("express");
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controller/task-controller");

const taskRouter = express.Router();
taskRouter.post("/task", createTask);
taskRouter.get("/", getAllTasks);
taskRouter.get("/:id", getTaskById);
taskRouter.put("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);

module.exports = taskRouter;
