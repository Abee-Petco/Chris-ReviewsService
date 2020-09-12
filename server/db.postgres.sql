CREATE TABLE users (
 user_id INTEGER PRIMARY KEY,
 username VARCHAR NOT NULL,
 verified BOOLEAN NOT NULL
);

CREATE TABLE items (
 item_id INTEGER PRIMARY KEY,
 review_average DECIMAL (2, 1) DEFAULT 0.0,
 number_of_reviews INTEGER DEFAULT 0
);

CREATE TABLE reviews (
 review_id INTEGER PRIMARY KEY,
 score INTEGER NOT NULL DEFAULT 1,
 date VARCHAR NOT NULL,
 title VARCHAR NOT NULL,
 review TEXT NOT NULL,
 recommended BOOLEAN NOT NULL,
 promotion BOOLEAN NOT NULL,
 user_id_users INTEGER NOT NULL REFERENCES users(user_id),
 item_id_items INTEGER DEFAULT 100 REFERENCES items(item_id)
);

CREATE TABLE yeses_noes (
 yeses INTEGER DEFAULT 0,
 noes INTEGER DEFAULT 0,
 review_id_reviews INTEGER REFERENCES reviews(review_id) ON DELETE CASCADE
);
