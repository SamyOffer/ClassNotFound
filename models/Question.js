const { json } = require('express');
const db = require('./db_conf');

module.exports.add = (data) => {
    const stmt = db.prepare('INSERT INTO questions (title, date_creation, category, description, id_member) VALUES (?,?,?,?,?) RETURNING id_question');
    const info = stmt.run(data.title, data.date_creation, data.category, data.description, data.id_member);
    console.log(info);
    return info.lastInsertRowid;
};

module.exports.list = () => {
    const stmt = db.prepare('SELECT * FROM questions');
    return stmt.all();
};

/**SELECT THE FIRST 20 QUESTIONS BY DESC */
module.exports.first20list = () => {
    const stmt = db.prepare('SELECT * FROM questions WHERE resolved = 0 ORDER BY id_question DESC LIMIT 20')
    return stmt.all();
}

module.exports.remove = (data) => {
    const stmt = db.prepare('DELETE FROM questions WHERE id_question = ?');
    stmt.run(data);
};

module.exports.answered = (data) => {
    const stmt = db.prepare('SELECT * FROM answers WHERE good_answer = 1 AND id_question = ?');
    const retour = stmt.all(data);
    console.log(retour.changes);
    return retour;
};


module.exports.reportQuestion = (data) => {
    const stmt = db.prepare('UPDATE questions SET reported = 1 WHERE id_question = ?');
    stmt.run(data);
};

module.exports.unreport = (data) => {
    const stmt = db.prepare('UPDATE questions SET reported = 0 WHERE id_question = ?');
    stmt.run(data);
};

module.exports.GetFromId = (data) => {
    const stmt = db.prepare('SELECT * FROM questions WHERE id_question = ?');
    return stmt.get(data);
};

module.exports.listWithCategory = (data) => {
    const stmt = db.prepare('SELECT * FROM questions WHERE category = ? ORDER BY id_question DESC');
    retour = stmt.all(data);
    console.log(retour.changes)
    return retour
};

module.exports.reportedList = () => {
    const stmt = db.prepare('SELECT * FROM questions WHERE reported = 1');
    retour = stmt.all();
    console.log(retour.changes)
    return retour
};

module.exports.listWithTitle = (data) => {
    const stmt = db.prepare('SELECT * FROM questions WHERE Title LIKE ? ORDER BY id_question DESC');
    return stmt.all('%' + data + '%');
};

module.exports.openQuestionsOfAMember = (data) => {
    const stmt = db.prepare('SELECT * FROM questions WHERE id_member = ? AND resolved = 0 ORDER BY id_question DESC')
    return stmt.all(data);
}

module.exports.resolvedQuestionsOfAMember = (data) => {
    const stmt = db.prepare('SELECT * FROM questions WHERE id_member = ? AND resolved = 1 ORDER BY id_question DESC')
    return stmt.all(data);
}

module.exports.AsResolved = (data) => {
    const stmt = db.prepare('UPDATE questions SET resolved = 1 WHERE id_question = ?')
    stmt.run(data);
}






