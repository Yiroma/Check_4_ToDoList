const AbstractManager = require("./AbstractManager");

class TaskManager extends AbstractManager {
  constructor() {
    super({ table: "tasks" });
  }

  insert(task) {
    return this.database.query(
      `insert into ${this.table} (description, completed) values (?, ?)`,
      [task.description, task.completed]
    );
  }

  update(task) {
    return this.database.query(
      `update ${this.table} set description = ?, completed = ? where id = ?`,
      [task.description, task.completed, task.id]
    );
  }
}

module.exports = TaskManager;
