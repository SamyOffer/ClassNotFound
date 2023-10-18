const db = require('./db_conf');

module.exports.add = (data) => {
  // use of prepared statement with parameters
  const stmt = db.prepare('INSERT INTO members (last_name, first_name, password, email) VALUES (?, ?, ?, ?)');
  const info = stmt.run(data.last_name, data.first_name, data.password, data.email);
  console.log(info.changes);
};


module.exports.searchEmail = (data) => {
  const stmt = db.prepare("Select id_member FROM members WHERE email = ?");
  let retour = stmt.get(data);
  return retour;
}

module.exports.searchPassword = (data) => {
  const stmt = db.prepare("Select password FROM members WHERE email = ?");
  let retour = stmt.get(data);
  console.log(retour)
  return retour;
}

module.exports.find = (data) => {
  console.log(data);
  return db.prepare('SELECT * FROM members WHERE email = ?').get(data);
}

module.exports.authorName = (data) => {
  console.log(data);
  const stmt = db.prepare('SELECT last_name FROM members WHERE id_member = ?');
  const stmt2 = stmt.get(data)
  console.log(stmt2)
  return JSON.stringify(stmt2.last_name);
}
