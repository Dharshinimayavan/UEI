-- =============================================
-- Sample SQL Data for Online Educational Interface
-- Run AFTER the application starts (tables are auto-created by JPA)
-- Default accounts are created by DataInitializer.java on startup
-- =============================================

-- Sample Courses (teacher_id = 2 is the default teacher)
INSERT IGNORE INTO courses (course_name, description, teacher_id) VALUES
('Introduction to Java', 'Learn the basics of Java programming from scratch', 2),
('Web Development with React', 'Build modern web applications with React.js', 2),
('Database Management', 'Master SQL and relational databases', 2),
('Data Structures & Algorithms', 'Core computer science concepts and problem solving', 2);

-- Sample Announcements
INSERT IGNORE INTO announcements (course_id, title, message, created_at) VALUES
(1, 'Welcome to Java Course!', 'Welcome everyone! Please check the study materials section for Week 1 resources.', NOW()),
(2, 'React Project Submission', 'Final project submissions are due next Friday. Upload to the assignments section.', NOW()),
(1, 'Mid-term Schedule', 'Mid-term quiz will be held on the platform next Monday at 10 AM.', NOW());

-- Sample Study Materials
INSERT IGNORE INTO study_materials (course_id, title, file_url, uploaded_at) VALUES
(1, 'Java Basics - Week 1 Slides', 'https://example.com/materials/java-week1.pdf', NOW()),
(1, 'OOP Concepts Guide', 'https://example.com/materials/oop-guide.pdf', NOW()),
(2, 'React Getting Started', 'https://example.com/materials/react-intro.pdf', NOW()),
(2, 'JSX and Components', 'https://example.com/materials/react-jsx.pdf', NOW()),
(3, 'SQL Fundamentals', 'https://example.com/materials/sql-basics.pdf', NOW());

-- Sample Assignments
INSERT IGNORE INTO assignments (course_id, title, description, due_date) VALUES
(1, 'Java Hello World Program', 'Write a Java program that prints Hello World and explain each line', DATE_ADD(NOW(), INTERVAL 7 DAY)),
(1, 'OOP Assignment', 'Create a class hierarchy for a Library Management System', DATE_ADD(NOW(), INTERVAL 14 DAY)),
(2, 'React Counter App', 'Build a simple counter application using React hooks', DATE_ADD(NOW(), INTERVAL 10 DAY)),
(3, 'SQL Queries Practice', 'Write 10 SQL queries on the provided dataset', DATE_ADD(NOW(), INTERVAL 7 DAY));

-- Sample Quiz
INSERT IGNORE INTO quizzes (course_id, title, duration) VALUES
(1, 'Java Basics Quiz', 30),
(2, 'React Fundamentals Quiz', 20),
(3, 'SQL Quiz', 25);

-- Sample Questions for Java Basics Quiz (quiz_id = 1)
INSERT IGNORE INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer) VALUES
(1, 'What is the correct way to declare a variable in Java?', 'var x = 10;', 'int x = 10;', 'x = 10;', 'declare x = 10;', 'B'),
(1, 'Which keyword is used to create an object in Java?', 'create', 'object', 'new', 'make', 'C'),
(1, 'What does JVM stand for?', 'Java Visual Machine', 'Java Virtual Machine', 'Java Variable Module', 'Java Version Manager', 'B'),
(1, 'Which is NOT a primitive data type in Java?', 'int', 'String', 'boolean', 'char', 'B'),
(1, 'What is the entry point of a Java program?', 'start()', 'run()', 'main()', 'init()', 'C');

-- Sample Questions for React Quiz (quiz_id = 2)
INSERT IGNORE INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer) VALUES
(2, 'What hook is used for state management in React?', 'useEffect', 'useState', 'useContext', 'useRef', 'B'),
(2, 'What does JSX stand for?', 'JavaScript XML', 'Java Syntax Extension', 'JavaScript Extension', 'None of the above', 'A'),
(2, 'Which method is called after component renders?', 'componentWillMount', 'componentDidMount', 'componentUpdate', 'render', 'B');

-- Sample Enrollment (student_id = 3 enrolls in courses)
INSERT IGNORE INTO enrollments (student_id, course_id, enrolled_at) VALUES
(3, 1, NOW()),
(3, 2, NOW());
