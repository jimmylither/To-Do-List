const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class Task {
  static create(taskData, callback) {
    const id = uuidv4();
    const { title, description, priority, dueDate } = taskData;
    const status = 'pending';
    const createdAt = new Date();

    const query = 'INSERT INTO tasks (id, title, description, priority, status, dueDate, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [id, title, description, priority, status, dueDate, createdAt], (err, result) => {
      if (err) return callback(err, null);
      callback(null, { id, title, description, priority, status, dueDate, createdAt });
    });
  }

  static getAll(callback) {
    const query = 'SELECT * FROM tasks ORDER BY createdAt DESC';
    db.query(query, (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM tasks WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  }

  static update(id, taskData, callback) {
    const { title, description, priority, status, dueDate } = taskData;
    const query = 'UPDATE tasks SET title = ?, description = ?, priority = ?, status = ?, dueDate = ? WHERE id = ?';
    
    db.query(query, [title, description, priority, status, dueDate, id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  }

  static delete(id, callback) {
    const query = 'DELETE FROM tasks WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  }

  static getByStatus(status, callback) {
    const query = 'SELECT * FROM tasks WHERE status = ? ORDER BY createdAt DESC';
    db.query(query, [status], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  }
}

module.exports = Task;