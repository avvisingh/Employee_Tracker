USE employee_tracker;

INSERT INTO department (name)
VALUES
('Finance'),
('Operations'),
('Product Development');

INSERT INTO role (title, salary, department_id)
VALUES
('CFO', 120000, 1),
('COO', 120000, 2),
('Head of Product Development', 120000, 3),
('CEO', 135000, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Mark', 'Waugh', 4, NULL),
('Stephen', 'Larkham', 1, 1),
('George', 'Gregan', 2, 1),
('David', 'Pocock', 3, 3);