/* Run these queries in the psql shell from within petco_reviews. */
/* BE SURE TO RUN THEM IN THE ORDER LISTED OR ERRORS WILL OCCUR DUE TO DEPENDENCIES BETWEEN TABLES. */
/* reviews may require the checkpointInterval to be raised to avoid frequent warnings. */
/* reviews also takes a while to import due to it's size.  Just let it go.' */

COPY users FROM '/Users/chrish/Desktop/HR-SDC/reviews/users.csv' DELIMITER ',' CSV;
COPY items FROM '/Users/chrish/Desktop/HR-SDC/reviews/items.csv' DELIMITER ',' CSV;
COPY reviews(score, date, title, review, recommended, promotion, user_id_users, item_id_items) FROM '/Users/chrish/Desktop/HR-SDC/reviews/reviews.csv' DELIMITER ',' CSV HEADER;
COPY yeses_noes (yeses, noes) FROM '/Users/chrish/Desktop/HR-SDC/reviews/yeses_noes.csv' DELIMITER ',' CSV HEADER;