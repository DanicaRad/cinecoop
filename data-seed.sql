\connect cinecoop;
\i data-seed.sql

INSERT INTO users (username, password, first_name, last_name, email, phone, join_at)
  VALUES
    ('testuser', 'test', 'Test', 'User', 'test@test.com', 1111111111, current_timestamp),
    ('testuser2', 'test', 'Test2', 'User2', 'test2@test.com', 2222222222, current_timestamp),
    ('test3', 'test', 'Test3', 'User3', 'test3@test.com', 3333333333, current_timestamp);

INSERT INTO users_movies (username, movie_id, is_favorite, rating)
  VALUES 
  ('testuser', 569094, true, 10), ('testuser', 575264, false, null), ('testuser', 447277, false, 10), ('testuser', 298618, false, 6),
  ('testuser2', 502356, false, 7), ('testuser2', 385687, true, 10), ('testuser2', 603692, false, 8),
  ('testuser3', 238, true, 10), ('testuser3', 447365, false, 8), ('testuser3', 155, true, 9);
  
INSERT INTO watchlists (username, movie_id)
  VALUES ('testuser', 575264), ('testuser', 976573), ('testuser', 346698), 
    ('testuser2', 298618), ('testuser3', 447277);

INSERT INTO lists (username, name, is_private, created_at)
  VALUES 
    ('testuser', 'My New Test List', false, current_timestamp),
    ('testuser2', 'Testuser2s New List', false, current_timestamp),
    ('testuser3', 'Testuser3 Test List', false, current_timestamp);

INSERT INTO movies_lists (movie_id, list_id)
  VALUES (240, 10), (238, 10), (278, 11), (155, 11), (575264, 12), (1130818, 12), (603692, 12);

INSERT INTO lists_likes (list_id, username)
  VALUES (12, 'testuser'), (12, 'testuser2'), (12, 'testuser3'), (10, 'testuser3'), (11, 'testuser3');