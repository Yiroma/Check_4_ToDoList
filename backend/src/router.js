const express = require("express");
const tasksController = require("./controllers/taskControllers");

const router = express.Router();

router.get("/", tasksController.getAllTasks);
router.post("/", tasksController.createTask);
router.put("/:id", tasksController.updateTask);
router.delete("/:id", tasksController.deleteTask);

module.exports = router;
