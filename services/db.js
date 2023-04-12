const { dirname } = require('path');
const appDir = dirname(require.main.filename);

const sqlite = require('better-sqlite3');
const path = require('path');
const db = new sqlite(appDir + '/db/labeler.db', {fileMustExist: true});

function query(sql, params) {
  return db.prepare(sql).all(params);
}

function run(sql, params) {
  return db.prepare(sql).run(params);
}

module.exports = {
  query,
  run
}