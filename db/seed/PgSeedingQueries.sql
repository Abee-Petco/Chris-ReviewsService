/* Run these queries in the psql shell from within petco_reviews. */
/* BE SURE TO RUN THEM IN THE ORDER LISTED OR ERRORS WILL OCCUR DUE TO DEPENDENCIES BETWEEN TABLES. */
/* reviews may require the checkpointInterval to be raised to avoid frequent warnings. */
/* reviews also takes a while to import due to it's size.  Just let it go.' */

COPY users FROM '/Users/chrish/Desktop/HR-SDC/reviews/users.csv' DELIMITER ',' CSV;
COPY items FROM '/Users/chrish/Desktop/HR-SDC/reviews/items.csv' DELIMITER ',' CSV;
COPY reviews(score, date, title, review, recommended, promotion, user_id_users, item_id_items) FROM '/Users/chrish/Desktop/HR-SDC/reviews/reviews.csv' DELIMITER ',' CSV HEADER;
COPY yeses_noes (yeses, noes) FROM '/Users/chrish/Desktop/HR-SDC/reviews/yeses_noes.csv' DELIMITER ',' CSV HEADER;



/* below are for seeding uploaded csv's to t2.micro ec2 instance on AWS.  Note that for reviews table, foreign keys must be added after seeding in order for COPY to succeed.  Not true locally' */

/* COPY users FROM '/home/ubuntu/users.csv' DELIMITER ',' CSV; */
/* COPY items FROM '/home/ubuntu/items.csv' DELIMITER ',' CSV; */
/* COPY reviews(score, date, title, review, recommended, promotion, user_id_users, item_id_items) FROM '/home/ubuntu/reviews.csv' DELIMITER ',' CSV HEADER; */
/* COPY yeses_noes (yeses, noes) FROM '/home/ubuntu/yeses_noes.csv' DELIMITER ',' CSV HEADER; */