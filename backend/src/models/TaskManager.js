const AbstractManager = require("./AbstractManager");

class TaskManager extends AbstractManager {
  constructor() {
    super({ table: "tasks" });
  }

  insert(task) {
    return this.database.query(
      `insert into ${this.table} (\`desc\`, checked) values (?, ?)`,
      [task.desc, task.checked]
    );
  }

  update(task) {
    console.warn("Updating task with ID:", task.id);
    console.warn("New description:", task.desc);
    console.warn("New checked status:", task.checked);

    return this.database.query(
      `update ${this.table} set \`desc\` = ?, checked = ? where id = ?`,
      [task.desc, task.checked, task.id]
    );
  }
}

module.exports = TaskManager;
