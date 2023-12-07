const jwt = require("jsonwebtoken");
const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { name, description, dueDate, collaborators } = req.body;

    // Extract the token from the request header
    const extractedToken = req.headers.authorization.split(" ")[1];

    if (!extractedToken || extractedToken.trim() === "") {
      return res.status(401).json({ message: "Unauthorized: Token not found" });
    }

    // Verify the token and get the user's ID and role from it
    const decodedToken = jwt.verify(extractedToken, process.env.SECRET_KEY);
    const userId = decodedToken.id;
    const userRole = decodedToken.role;

    if (userRole !== "admin") {
      // If the user is not an admin, they can only create tasks for themselves
      const task = new Task({
        name,
        description,
        dueDate,
        owner: userId,
        collaborators,
      });

      const savedTask = await task.save();
      return res.status(201).json(savedTask);
    } else {
      // Admins can create tasks for anyone
      const task = new Task({
        name,
        description,
        dueDate,
        owner: userId,
        collaborators,
      });

      const savedTask = await task.save();
      return res.status(201).json(savedTask);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    // Extract the token from the request header
    const extractedToken = req.headers.authorization.split(" ")[1];

    if (!extractedToken || extractedToken.trim() === "") {
      return res.status(401).json({ message: "Unauthorized: Token not found" });
    }

    // Verify the token and get the user's role from it
    const decodedToken = jwt.verify(extractedToken, process.env.SECRET_KEY);
    const userRole = decodedToken.role;

    if (userRole !== "admin") {
      // If the user is not an admin, they can only access their own tasks
      const userId = decodedToken.id;
      const tasks = await Task.find({ owner: userId }).populate("owner collaborators");
      return res.json(tasks);
    } else {
      // Admins can access all tasks
      const tasks = await Task.find().populate("owner collaborators");
      return res.json(tasks);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getTaskById = async (req, res) => {
  const id = req.params.id;

  try {
    const extractedToken = req.headers.authorization.split(" ")[1];

    if (!extractedToken || extractedToken.trim() === "") {
      return res.status(401).json({ message: "Unauthorized: Token not found" });
    }

    const decodedToken = jwt.verify(extractedToken, process.env.SECRET_KEY);
    const userId = decodedToken.id;
    const userRole = decodedToken.role;

    const task = await Task.findById(id).populate("owner collaborators");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    console.log("Task Owner:", task.owner.toString());
    console.log("User ID from Token:", userId);

    if (userId === task.owner.toString() || userRole === "admin") {
      res.json(task);
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  const id = req.params.id;
  const update = req.body;

  try {
    const extractedToken = req.headers.authorization.split(" ")[1];

    if (!extractedToken || extractedToken.trim() === "") {
      return res.status(401).json({ message: "Unauthorized: Token not found" });
    }

    const decodedToken = jwt.verify(extractedToken, process.env.SECRET_KEY);
    const userId = decodedToken.id;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (userId !== task.owner.toString() && decodedToken.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedTask = await Task.findByIdAndUpdate(id, update, {
      new: true,
    }).populate("owner collaborators");

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const id = req.params.id;

  try {
    const extractedToken = req.headers.authorization.split(" ")[1];

    if (!extractedToken || extractedToken.trim() === "") {
      return res.status(401).json({ message: "Unauthorized: Token not found" });
    }

    const decodedToken = jwt.verify(extractedToken, process.env.SECRET_KEY);
    const userId = decodedToken.id;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (userId !== task.owner.toString() && decodedToken.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const deletedTask = await Task.findByIdAndRemove(id);

    if (deletedTask) {
      res.status(200).json({ message: "Task Deleted Successfully" });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
