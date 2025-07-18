const { MESSAGES } = require('../config/messagesFile')
const mongodb = require("mongodb")
const City = require("./../Models/City")
const pool = require('../config/database'); // Import the database connection

// const saveCity = (req, res) => {
//   const { name, effectedBy } = req.body;

//   try {

//     checkExists(req.body)
//       .then((exists) => {
//         if (exists) {
//           res.status(200).json({ status: false, data: {}, message: "already exists" });
//         }
//         else {
//           const sql = 'INSERT INTO cities (name, effectedBy,effectedDate) VALUES (?, ?,?)';
//           const values = [name, effectedBy, new Date()];

//           pool.query(sql, values, (error, results) => {
//             if (error) {
//               res.status(200).json({ status: false, data: {}, message: error.toString() });
//             } else {

//               if (results.insertId > 0) {
//                 const sql2 = 'SELECT * FROM cities WHERE id = ?';
//                 const values2 = [results.insertId];

//                 pool.query(sql2, values2, (err, response) => {
//                   res.status(200).json({ status: true, data: response, message: MESSAGES.CREATED });
//                 });
//               }
//               else {
//                 res.status(200).json({ status: false, data: [], message: MESSAGES.FAILED_MESSAGE });
//               }
//             }
//           });
//         }
//       })
//       .catch((error) => {
//         // Handle errors here
//         console.error('An error occurred:', error);
//       });




//   }
//   catch (err) {
//     res.status(500).json({ status: false, data: {}, message: err.toString() });

//   }
// };


const getAllCities = (req, res) => {
  try {


  //  pool.query('SELECT cities.*, users.name AS userName FROM cities INNER JOIN users ON cities.effectedBy = users.id', (err, results) => {
      return res.status(200).json({ status: true, data: [1,2,3,4], message: MESSAGES.FOUND });
  //  });

  } catch (err) {
    res.status(200).json({ status: false, data: [], message: err.toString() });
  }
};


// const deleteCity = (req, res) => {
//   try {
//     const { id } = req.body;

//     const sql = 'DELETE FROM cities WHERE id = ?';
//     const values = [id];

//     pool.query(sql, values, (error, results) => {

//       if (results.affectedRows > 0) {
//         res.status(200).json({ status: true, data: results, message: MESSAGES.DELETE });
//       }
//       else {
//         res.status(200).json({ status: false, data: results, message: MESSAGES.FAILED_MESSAGE });

//       }
//     });
//   }
//   catch (err) {
//     res.status(200).json({ status: false, data: [], message: MESSAGES.FAILED_MESSAGE });
//   }
// };


// const updateCity = (req, res) => {
//   try {
//     const { name, id, effectedBy } = req.body

//     const sql = 'UPDATE cities SET name = ?, effectedBy = ?, effectedDate = ? WHERE id = ?';
//     const values = [name, effectedBy, new Date(), id];

//     pool.query(sql, values, (error, results) => {

//       if (results.affectedRows > 0) {
//         res.status(200).json({ status: true, data: results, message: MESSAGES.UPDATE });
//       }
//       else {
//         res.status(200).json({ status: false, data: [], message: MESSAGES.FAILED_MESSAGE });

//       }

//     });



//   } catch (err) {
//     return res.status(200).json({ status: false, data: [], message: MESSAGES.FAILED_MESSAGE });
//   }
// };



// const checkExists = (data) => {
//   return new Promise((resolve, reject) => {

//     const sql = 'SELECT * FROM cities WHERE LOWER(name) = LOWER(?)';
//     const values = [data.name.toLowerCase()];

//     pool.query(sql, values, (err, results) => {
//       if (err) {
//         reject(err); // Reject the Promise in case of an error
//       } else if (results.length > 0) {
//         resolve(true); // Resolve with true if data exists
//       } else {
//         resolve(false); // Resolve with false if data does not exist
//       }
//     });
//   });
// };




module.exports = { getAllCities}
