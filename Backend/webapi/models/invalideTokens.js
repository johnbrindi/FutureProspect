import db from "./dbConfig.js";

const InvalidToken = {
    add: async (token) => {
        const result = await db.query(
            'INSERT INTO InvalidTokens (token) VALUES ($1) RETURNING *',
            [token]
        );
        return result.rows[0];
    },

    find: async (token) => {
        const result = await db.query('SELECT * FROM InvalidTokens WHERE token = $1', [token]);
        return result.rows[0];
    }
};

export default InvalidToken;
