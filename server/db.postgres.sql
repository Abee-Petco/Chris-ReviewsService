CREATE TABLE reviews (
 review_id INTEGER NOT NULL,
 score INTEGER NOT NULL DEFAULT 1,
 date VARCHAR NOT NULL,
 title VARCHAR NOT NULL DEFAULT ''no title'',
 review TEXT NOT NULL DEFAULT ''no review'',
 recommended BOOLEAN NOT NULL,
 promotion BOOLEAN NOT NULL,
 user_id_users INTEGER NOT NULL,
 item_id_items INTEGER NOT NULL DEFAULT 100
);


ALTER TABLE reviews ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);

CREATE TABLE users (
 user_id BIGSERIAL NOT NULL,
 username VARCHAR NOT NULL,
 verified BOOLEAN NOT NULL
);


ALTER TABLE users ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);

CREATE TABLE yeses_noes (
 yeses INTEGER NOT NULL DEFAULT 0,
 noes INTEGER NOT NULL DEFAULT 0,
 review_id_reviews INTEGER NOT NULL
);


ALTER TABLE yeses_noes ADD CONSTRAINT yeses_noes_pkey PRIMARY KEY ();

CREATE TABLE items (
 item_id BIGSERIAL NOT NULL DEFAULT 100,
 number_of_reviews INTEGER NOT NULL DEFAULT 0,
 review_average INTEGER NOT NULL DEFAULT 0
);


ALTER TABLE items ADD CONSTRAINT items_pkey PRIMARY KEY (item_id);

ALTER TABLE reviews ADD CONSTRAINT reviews_user_id_users_fkey FOREIGN KEY (user_id_users) REFERENCES users(user_id);
ALTER TABLE reviews ADD CONSTRAINT reviews_item_id_items_fkey FOREIGN KEY (item_id_items) REFERENCES items(item_id);
ALTER TABLE yeses_noes ADD CONSTRAINT yeses_noes_review_id_reviews_fkey FOREIGN KEY (review_id_reviews) REFERENCES reviews(review_id);