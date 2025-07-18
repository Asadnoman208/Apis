const mysql = require('mysql');

const dbConfig = {
  host: 'business200.mypowerfulserver.com',
  user: 'tender786_asad',
  password: 'c_ucUu-nFV%Q',
  database: 'tender786_live'
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;