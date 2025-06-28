-- Message Board Database
-- Database Name: message_board_db
-- Table Name: message_tbl

-- Create database
CREATE DATABASE IF NOT EXISTS message_board_db;
USE message_board_db;

-- Create message table
CREATE TABLE IF NOT EXISTS message_tbl (
    Message_ID INT AUTO_INCREMENT PRIMARY KEY,
    Full_Name VARCHAR(100) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    Message_Content TEXT NOT NULL,
    Date_posted DATE NOT NULL
);

-- Insert sample data
INSERT INTO message_tbl (Full_Name, Email, Message_Content, Date_posted) VALUES
('John Doe', 'john.doe@example.com', 'Great portfolio! I really like your web development skills.', '2025-01-15'),
('Jane Smith', 'jane.smith@example.com', 'Your technical writing skills are impressive. Keep up the good work!', '2025-01-16'),
('Mike Johnson', 'mike.johnson@example.com', 'The penalty monitoring system project looks interesting. Would love to know more about it.', '2025-01-17'); 