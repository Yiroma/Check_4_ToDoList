CREATE TABLE `tasks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `desc` VARCHAR(255) NOT NULL,
  `checked` TINYINT(1)
);

INSERT INTO `tasks`
(`desc`, `checked`) 
VALUES 
('tache numero1', 1),
('tache 2', 0),
('refaire le crud', 1),
('tadiiin', 0);
