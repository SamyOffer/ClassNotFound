const db = require('./db_conf');

module.exports.add = (data) => {
    const stmt = db.prepare('INSERT INTO answers (description, date, id_member, good_answer, reported, id_question) VALUES (?,?,?,?,?,?)');
    const info = stmt.run(data.description, data.date, data.id_member, data.good_answer, data.reported, data.id_question);
    console.log(info.changes);
};

module.exports.list = (data) => {
    const stmt = db.prepare('SELECT * FROM answers WHERE id_question = ?');
    return stmt.all(data);
};

module.exports.list_unresolved = (data) => {
    const stmt = db.prepare('SELECT * FROM answers WHERE id_question = ? AND good_answer = 0');
    return stmt.all(data);
};

module.exports.list_resolved = (data) => {
    const stmt = db.prepare('SELECT * FROM answers WHERE id_question = ?  AND good_answer = 1');
    return stmt.all(data);
};

module.exports.reportedList = () => {
    const stmt = db.prepare('SELECT * FROM answers WHERE reported = 1');
    return stmt.all();
};

module.exports.remove = (data) => {
    const stmt = db.prepare('DELETE FROM answers WHERE id_answer = ?');
    stmt.run(data);
};

module.exports.removeAllAnswersFromAQuestion = (data) => {
    const stmt = db.prepare('DELETE FROM answers WHERE id_question = ?');
    stmt.run(data);
};

module.exports.setAsCorrectAnswer = (data) => {
    const stmt = db.prepare('UPDATE answers SET good_answer = 1 WHERE id_answer = ?');
    stmt.run(data);
};

module.exports.reportAnswer = (data) => {
    const stmt = db.prepare('UPDATE answers SET reported = 1 WHERE id_answer = ?');
    stmt.run(data);
};

module.exports.unreport = (data) => {
    const stmt = db.prepare('UPDATE answers SET reported = 0 WHERE id_answer = ?');
    stmt.run(data);
};




