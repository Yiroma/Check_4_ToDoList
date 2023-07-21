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
    .insert(newTask)
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

  if (!task.desc) {
    res.status(200).json({ message: "Modification ok." });
    return;
  }

  models.task
    .update(task)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
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
