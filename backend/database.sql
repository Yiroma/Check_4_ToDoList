CREATE TABLE `tasks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `desc` VARCHAR(255) NOT NULL,
  `checked` TINYINT(1)
);

INSERT INTO `tasks`
(`desc`, `checked`) 
VALUES 
('Reprendre le projet de 0', 1),
('Faire une BDD', 1),
('Faire le CRUD', 0),
('Pleurer...', 1),
('Relier Back et Front', 1),
('Commander un corde à Anthony', 0),
('Faire le Front', 1),
('Youpi FINI', 0);
