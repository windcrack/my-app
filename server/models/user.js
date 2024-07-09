const db = require("../config/db");
const bcrypt = require("bcryptjs");

const User = {
  create: (user, callback) => {
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) throw err;
      const sql =
        "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
      db.query(sql, [user.username, hash, "user"], callback);
    });
  },
  findByUsername: (username, callback) => {
    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], (err, results) => {
      if (err) throw err;
      callback(null, results[0]);
    });
  },
  findById: (id, callback) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      if (err) throw err;
      callback(null, results[0]);
    });
  },
};

module.exports = User;
