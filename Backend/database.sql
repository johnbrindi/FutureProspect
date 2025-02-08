-- Creating Database
CREATE DATABASE  FutureProspect;

-- Creating the Users table
CREATE TABLE Users1 (
    user_id SERIAL PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(15),
    department VARCHAR(100),
    year VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Creating the Students table
CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    FOREIGN KEY (student_id) REFERENCES Users(user_id),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    resume TEXT,
    skills TEXT,
    profile_picture TEXT
);

-- Creating the Companies table
CREATE TABLE Companies (
    company_id INT PRIMARY KEY,
    FOREIGN KEY (company_id) REFERENCES Users(user_id),
    company_name VARCHAR(100) NOT NULL,
    industry VARCHAR(50),
    Location VARCHAR(100),
    description TEXT,
    profile_picture TEXT
);

-- Creating the Internships table
CREATE TABLE Internships (
    internship_id SERIAL PRIMARY KEY,
    company_id INT,
    FOREIGN KEY (company_id) REFERENCES Companies(company_id),
    title VARCHAR(100) NOT NULL,
    description TEXT,
    location VARCHAR(100),
    requirements TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creating the Applications table
CREATE TABLE Applications (
    application_id SERIAL PRIMARY KEY,
    internship_id INT,
    FOREIGN KEY (internship_id) REFERENCES Internships(internship_id),
    student_id INT,
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    status VARCHAR(20) NOT NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- creating Invalid token table
CREATE TABLE InvalidTokens (
    token_id SERIAL PRIMARY KEY,
    token TEXT NOT NULL,
    invalidated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




-- Modify existing Users table
ALTER TABLE Users
ADD COLUMN last_login TIMESTAMP;

-- Modify Students table
ALTER TABLE Students
ADD COLUMN date_of_birth DATE,
ADD COLUMN field_of_study VARCHAR(200),
ADD COLUMN education_level VARCHAR(100),
ADD COLUMN bio TEXT,
ADD COLUMN phone_number VARCHAR(20),
ADD COLUMN address TEXT,
ADD COLUMN linkedin_url VARCHAR(255),
-- Convert skills to array type
ALTER COLUMN skills TYPE TEXT[] USING string_to_array(skills, ',');

-- Modify Companies table
ALTER TABLE Companies 
ADD COLUMN company_size VARCHAR(50),
ADD COLUMN website_url VARCHAR(255),
ADD COLUMN phone_number VARCHAR(20),
-- Rename Location to address for consistency
RENAME COLUMN Location TO address;

-- Create new company_locations table
CREATE TABLE company_locations (
    location_id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES Companies(company_id) ON DELETE CASCADE,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_headquarters BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Modify Internships table
ALTER TABLE internships
ADD COLUMN duration_weeks INTEGER,
ADD COLUMN is_paid BOOLEAN,
ADD COLUMN stipend_amount DECIMAL(10, 2),
ADD COLUMN spots_available INTEGER,
ADD COLUMN application_deadline DATE,
ADD COLUMN start_date DATE,
ADD COLUMN status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'closed', 'draft'));
-- Add location reference
ADD COLUMN location_id INTEGER REFERENCES company_locations(location_id);

-- Create internship_skills table
CREATE TABLE internship_skills (
    internship_id INTEGER REFERENCES Internships(internship_id) ON DELETE CASCADE,
    skill_name VARCHAR(100),
    PRIMARY KEY (internship_id, skill_name)
);

-- Modify Applications table
ALTER TABLE applications
ALTER COLUMN status SET DEFAULT 'pending',
ADD CONSTRAINT valid_status CHECK (status IN ('pending', 'reviewed', 'shortlisted', 'accepted', 'rejected')),
ADD COLUMN cover_letter TEXT,
ADD COLUMN resume_version_url VARCHAR(255);

-- Create application_status_history table
CREATE TABLE application_status_history (
    history_id SERIAL PRIMARY KEY,
    application_id INTEGER REFERENCES Applications(application_id) ON DELETE CASCADE,
    old_status VARCHAR(50),
    new_status VARCHAR(50),
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    changed_by INTEGER REFERENCES Users(user_id),
    notes TEXT
);

-- Create chat_messages table
CREATE TABLE chat_messages (
    message_id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES Users(user_id) ON DELETE SET NULL,
    recipient_id INTEGER REFERENCES Users(user_id) ON DELETE SET NULL,
    message_text TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create ai_chat_history table
CREATE TABLE ai_chat_history (
    chat_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(user_id) ON DELETE CASCADE,
    query TEXT NOT NULL,
    response TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create notifications table
CREATE TABLE notifications (
    notification_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(user_id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for better performance
CREATE INDEX idx_users_email ON Users(email);
CREATE INDEX idx_internships_company_id ON Internships(company_id);
CREATE INDEX idx_applications_student_id ON Applications(student_id);
CREATE INDEX idx_applications_internship_id ON Applications(internship_id);
CREATE INDEX idx_chat_messages_sender_recipient ON chat_messages(sender_id, recipient_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);

-- Add trigger for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to tables with updated_at column
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON Users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_internships_updated_at
    BEFORE UPDATE ON Internships
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();