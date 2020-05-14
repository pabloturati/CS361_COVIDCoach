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
  email varchar(255) NOT NULL UNIQUE,
  google_auth_token varchar(255),
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  profile_image varchar(255)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Posts (
  post_id int auto_increment PRIMARY KEY,
  user_id int,
  date_published datetime NOT NULL,
  num_of_likes int NOT NULL,
  title varchar(255) NOT NULL,
  content text NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE SET NULL ON UPDATE CASCADE
) engine = innoDB;

CREATE TABLE IF NOT EXISTS Responses (
  response_id int auto_increment PRIMARY KEY,
  post_id int,
  user_id int,
  date_published datetime NOT NULL,
  num_of_likes int NOT NULL,
  content text NOT NULL,
  FOREIGN KEY (post_id) REFERENCES Posts(post_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE SET NULL ON UPDATE CASCADE
) engine = innoDB;

CREATE TABLE IF NOT EXISTS Topics (
  topic_id int auto_increment PRIMARY KEY,
  title varchar(255) NOT NULL
) engine = innoDB; 

CREATE TABLE IF NOT EXISTS topics_posts (
  topic_id int,
  post_id int,
  PRIMARY KEY (topic_id, post_id),
  FOREIGN KEY (topic_id) REFERENCES Topics(topic_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (post_id) REFERENCES Posts(post_id) ON DELETE CASCADE ON UPDATE CASCADE
)engine = innoDB;

-- Part 3.  Populate base values.
-- INSERT INTO Users(email, first_name, last_name, profile_image, google_auth_token) 
-- VALUES ('johnlee@email.com', 'John', 'Lee', "https://image.shutterstock.com/image-vector/male-silhouette-avatar-profile-picture-260nw-199246382.jpg", "XXXXX");