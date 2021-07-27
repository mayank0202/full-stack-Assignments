var Pg = require('pg').Pool;
var pg = new Pg({
    user: 'mayankdb',
    host: 'localhost',
    database: 'api',
    password: 'mayank',
    port: 5432
});
module.exports = pg;
// const getUsers = (request, response) => {
//     pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).json(results.rows)
//     })
//   }
//   const getUserById = (request, response) => {
//     const id = parseInt(request.params.id)
//     pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).json(results.rows)
//     })
//   }
//   const createUser = (request, response) => {
//     const { firstname,midddlename,lastname, email,phoneno,role,address } = request.body
//     pool.query('INSERT INTO users (firstname,midddlename,lastname, email,phoneno,role,address) VALUES ($1,$2,$3,$4,$5,$6,$7)',
//      [firstname,midddlename,lastname, email,phoneno,role,address], (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(201).send(`User added with ID: ${results.insertId}`)
//     })
//   }
//   const updateUser = (request, response) => {
//     const id = parseInt(request.params.id)
//     const { firstname,midddlename,lastname, email,phoneno,role,address } = request.body
//     pool.query(
//       'UPDATE users SET firstname = $1, midddlename= $2, lastname=$3, email=$4,phoneno=$5,role=$6,address=$7 WHERE id = $8',
//       [firstname,midddlename,lastname, email,phoneno,role,address, id],
//       (error, results) => {
//         if (error) {
//           throw error
//         }
//         response.status(200).send(`User modified with ID: ${id}`)
//       }
//     )
//   }
//   const deleteUser = (request, response) => {
//     const id = parseInt(request.params.id)
//     pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).send(`User deleted with ID: ${id}`)
//     })
//   }
//   module.exports = {
//     getUsers,
//     getUserById,
//     createUser,
//     updateUser,
//     deleteUser,
//   }
