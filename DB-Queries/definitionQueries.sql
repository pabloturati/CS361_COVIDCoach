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
  google_auth_token text,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  profile_image varchar(255)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Posts (
  post_id int auto_increment PRIMARY KEY,
  user_id int,
  date_published DATETIME NOT NULL,
  num_of_likes int NOT NULL,
  title varchar(255) NOT NULL,
  content text NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE SET NULL ON UPDATE CASCADE
) engine = innoDB;

CREATE TABLE IF NOT EXISTS Responses (
  response_id int auto_increment PRIMARY KEY,
  post_id int,
  user_id int,
  date_published DATETIME NOT NULL,
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

INSERT INTO Topics (topic_id, title) VALUES 
  (1, "Cases"),
  (2, "Infections"),
  (3, "Recommendations"),
  (4, "Medical Attention"),
  (5, "Prevention");

INSERT INTO Users (user_id, email,  google_auth_token, first_name, last_name, profile_image) VALUES
 (1, "john33stevens@gmail.com", "XXXXXXXXXYYYYYYZZZZ", "John", "Stevens", "https://www.ethree.com/wp-content/uploads/2017/10/Stevens-5D3_8699.jpg"),
 (2, "sanda17bullock@gmail.com", "XXXXXXXXXYYYYYYZZZZ", "Sandra", "Bullock", "https://upload.wikimedia.org/wikipedia/commons/3/3b/Sandra_Bullock_%289192365016%29_%28cropped%29.jpg"),
 (3, "eri40johnson@gmail.com", "XXXXXXXXXYYYYYYZZZZ", "Erie", "Johnson", "https://www2.erie.gov/johnson/sites/www2.erie.gov.johnson/files/uploads/howard-johnson.jpg");

INSERT INTO Posts (post_id, user_id, date_published, num_of_likes, title, content) VALUES 
  (1, 1, STR_TO_DATE('03-21-2020 9:06:26 AM', '%m-%d-%Y %r'), 3, "The struggle to survive", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada proin libero nunc consequat interdum varius sit amet mattis. Sapien pellentesque habitant morbi tristique senectus. In est ante in nibh mauris cursus mattis molestie a. Ut tortor pretium viverra suspendisse potenti."),
  (2, 1, STR_TO_DATE('03-22-2020 10:06:26 AM', '%m-%d-%Y %r'), 5, "The beginning of the end", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id velit ut tortor pretium. Rhoncus urna neque viverra justo nec ultrices."),
  (3, 2, STR_TO_DATE('04-22-2020 8:06:26 PM', '%m-%d-%Y %r'), 2, "List of Recommendations", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam donec adipiscing tristique risus nec feugiat in fermentum posuere. Ornare suspendisse sed nisi lacus sed. Enim nec dui nunc mattis enim ut tellus elementum sagittis."),
  (4, 2, STR_TO_DATE('05-01-2020 8:11:26 PM', '%m-%d-%Y %r'), 2, "Medical Attention Needed here", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."),
  (5, 2, STR_TO_DATE('05-02-2020 1:06:26 PM', '%m-%d-%Y %r'), 0, "Prevention is key", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Quis hendrerit dolor magna eget est lorem ipsum dolor. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Volutpat sed cras ornare arcu dui vivamus. Mi ipsum faucibus vitae aliquet nec ullamcorper sit.");

INSERT INTO topics_posts (topic_id, post_id) VALUES 
(1, 1),
(1, 2),
(3, 3),
(2, 4),
(4, 4);

INSERT INTO Responses (response_id, post_id, date_published, user_id, num_of_likes, content) VALUES 
  (1, 1, STR_TO_DATE('03-21-2020 6:11:26 PM', '%m-%d-%Y %r'), 2, 1, "Their could can widen ten she any. As so we smart those money in.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Quis hendrerit dolor magna eget est lorem ipsum dolor. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Volutpat sed cras ornare arcu dui vivamus. Mi ipsum faucibus vitae aliquet nec ullamcorper sit."),
  (2, 1, STR_TO_DATE('03-22-2020 3:06:29 PM', '%m-%d-%Y %r'), 2, 2, "It if sometimes furnished unwilling as additions so."),
  (3, 2, STR_TO_DATE('04-22-2020 1:36:36 PM', '%m-%d-%Y %r'), 2, 2, "Call park out she wife face mean."),
  (4, 2, STR_TO_DATE('05-01-2020 7:56:26 PM', '%m-%d-%Y %r'), 3, 2, "Passage weather. And natural related man subject. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Quis hendrerit dolor magna eget est lorem ipsum dolor. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Volutpat sed cras ornare arcu dui vivamus. Mi ipsum faucibus vitae aliquet nec ullamcorper sit."),
  (5, 2, STR_TO_DATE('05-02-2020 11:06:26 PM', '%m-%d-%Y %r'), 1, 0, "No great but music. ");