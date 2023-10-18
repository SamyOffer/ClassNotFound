const db = require('./db_conf');

module.exports.add = (data) => {
    const stmt = db.prepare('INSERT INTO categories (name) VALUES (?)');
    const info = stmt.run(data.name);
    console.log(info.changes);
};

module.exports.list = () => {
    const stmt = db.prepare('SELECT * FROM categories');
    return stmt.all();
};

module.exports.remove = (data) => {
    const stmt = db.prepare('DELETE FROM categories WHERE id_category = ?');
    stmt.run(data);
};

module.exports.getNameFromeId = (data) => {
    const stmt = db.prepare('SELECT name FROM categories WHERE id_category = ?');
    let stmt2 = stmt.get(data)
    return JSON.stringify(stmt2.name);
};





