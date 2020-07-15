DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  firstname VARCHAR NOT NULL CHECK (firstname != ''),
  lastname VARCHAR NOT NULL CHECK (lastname != ''),
  email VARCHAR NOT NULL UNIQUE CHECK (email != ''),
  password VARCHAR NOT NULL CHECK (password != ''),
  profile_pic_url VARCHAR,
  bio VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reset_codes(
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL,
  code VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friend_requests(
  id SERIAL PRIMARY KEY,
  requester_id INT NOT NULL,
  recipient_id INT NOT NULL,
  accepted BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
