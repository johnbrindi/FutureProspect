import db from './dbConfig.js';
db.connect()

const User = {
  create: async (userData) => {
    const { firstName, lastName, email, password, phoneNumber, department, year } = userData;
    const result = await db.query(
      'INSERT INTO Users (firstname, lastname, email, password, phonenumber, department, year, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *',
      [firstName, lastName, email, password, phoneNumber, department, year]
    );
    return result.rows[0];
  },

  findByEmail: async (email) => {
    const result = await db.query('SELECT * FROM Users WHERE email = $1', [email]);
    return result.rows[0];
  },

  findById: async (user_id) => {
    const result = await db.query('SELECT * FROM Users WHERE user_id = $1', [user_id]);
    return result.rows[0];
  },

  update: async (user_id, userData) => {
    const { firstName, lastName, email, phoneNumber, department, year } = userData;
    const result = await db.query(
      'UPDATE Users SET firstname = $1, lastname = $2, email = $3, phone_number = $4, department = $5, year = $6, updated_at = NOW() WHERE user_id = $7 RETURNING *',
      [firstName, lastName, email, phoneNumber, department, year, user_id]
    );
    return result.rows[0];
  },

  delete: async (user_id) => {
    const result = await db.query('DELETE FROM Users WHERE user_id = $1 RETURNING *', [user_id]);
    return result.rows[0];
  }
};

export default User;
