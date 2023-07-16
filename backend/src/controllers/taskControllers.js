const models = require("../models");

const getAllTasks = (req, res) => {
  models.task
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.task
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const createTask = (req, res) => {
  const newTask = req.body;
  models.task
    .insert(newTask) // Corrected line
    .then((createdTask) => {
      res.status(201).json(createdTask);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "Erreur lors de la création de la tâche." });
    });
};

const updateTask = (req, res) => {
  const task = req.body;

  task.id = parseInt(req.params.id, 10);

  const taskId = req.params.id;
  const updatedTask = req.body;
  models.task
    .update(taskId, updatedTask)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "Erreur lors de la mise à jour de la tâche." });
    });
};

const deleteTask = (req, res) => {
  const taskId = req.params.id;
  models.task
    .delete(taskId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "Erreur lors de la suppression de la tâche." });
    });
};

module.exports = {
  getAllTasks,
  read,
  createTask,
  updateTask,
  deleteTask,
};
