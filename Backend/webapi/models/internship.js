import db from "./dbConfig";

const Internship = {
    // want to insert internship details in the database
    create: async (internshipData) => {
        const { company_id, title, description, location, requirements, duration_weeks, is_paid, stipend_amount, spots_available, application_deadline, start_date, status} = internshipData;
        const result = await db.query(
            'INSERT INTO Internships (company_id, title, description, location, requirements, created_at, updated_at, duration_weeks, is_paid, stipend_amount, spots_available, application_deadline, start_date, status) VALUES ($1, $2, $3, $4, $5, NOW(), NOW(), $6, $7, $8, $9, $10, $11, $12) RETURNING *',
            [company_id, title, description, location, requirements, duration_weeks, is_paid, stipend_amount, spots_available, application_deadline, start_date, status]
        );
        return result.rows[0];
    },
// searches for internship based on input criteria
    findById: async (internship_id) => {
        const result = await db.query('SELECT * FROM Internships WHERE internship_id = $1', [internship_id]);
        return result.rows[0];
    },

    findAll: async () => {
        const result = await db.query('SELECT * FROM Internships');
        return result.rows;
    },
// implementing search algoritm
    search: async (searchCriteria) => {
        const { title, location, requirements } = searchCriteria;
        const result = await db.query(
            `SELECT * FROM Internships WHERE 
             title ILIKE '%' || $1 || '%' AND 
             location ILIKE '%' || $2 || '%' AND 
             requirements ILIKE '%' || $3 || '%'`,
            [title, location, requirements]
        );
        return result.rows;
    },

    update: async (internship_id, internshipData) => {
        const { title, description, location, requirements } = internshipData;
        const result = await db.query(
            'UPDATE Internships SET title = $1, description = $2, location = $3, requirements = $4, updated_at = NOW() WHERE internship_id = $5 RETURNING *',
            [title, description, location, requirements, internship_id]
        );
        return result.rows[0];
    },
    delete: async (internship_id) => {
        const result = await db.query('DELETE FROM Internships WHERE internship_id = $1 RETURNING *', [internship_id]);
        return result.rows[0];
    }
};

export default Internship;
