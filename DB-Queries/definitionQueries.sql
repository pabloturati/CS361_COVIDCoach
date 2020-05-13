-- MySQL
-- Team #covid_coach - Definition queries
-- ------------------------------------------------------
-- This file contains queries to start the database tables.  Should be run to start the database new.
-- Process: 
-- 1. Cleanup the DB and remove previous versions of each table, if they exist.
-- 2. Define and create new empty tables.
-- NOTES: The order of the remove table (drop) process is fundamental to avoid relational errors while removing existing linked tables.


-- Part 1.  Drop existing tables.
DROP TABLE IF EXISTS topics_posts;
DROP TABLE IF EXISTS Topics;
DROP TABLE IF EXISTS Responses;
DROP TABLE IF EXISTS Posts;
DROP TABLE IF EXISTS Users;

-- Part 2.  Create new definition tables.
CREATE TABLE IF NOT EXISTS Users (
    user_id int auto_increment PRIMARY KEY,
    username varchar(255) NOT NULL UNIQUE,
    google_auth_token varchar(255) NOT NULL UNIQUE,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    profile_image varchar(255) NOT NULL
) engine = innoDB;

