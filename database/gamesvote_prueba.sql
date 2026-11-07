-- GamesVote: base de datos de prueba con datos inventados.
-- Cuentas: nuria@gamesvote.test, diego@gamesvote.test, elena@gamesvote.test
-- Contraseña de todas: Usuario123*
-- gameId es el identificador del juego en IGDB; las reseñas son inventadas.
-- Importar en MySQL o MariaDB. No borra nada: si las tablas ya existen, la importación se detiene con un error.

CREATE DATABASE IF NOT EXISTS `gamesvote` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `gamesvote`;
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE `Images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `from` enum('user','valoration') COLLATE utf8mb4_unicode_ci NOT NULL,
  `fromId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cognames` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tlf` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `Valoration` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gameId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `valoration_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Users` (`id`, `name`, `cognames`, `tlf`, `email`, `password`, `type`, `createdAt`, `updatedAt`) VALUES
  (1, 'Nuria', 'Salas Ortega', '600000001', 'nuria@gamesvote.test', '$2b$10$dYQeE7/N.xEjUk439Kh...0BOhgobPv3z.Epf.PnkxzVKxUP.Jb3G', 'user', '2026-10-10 12:00:00', '2026-10-10 12:00:00'),
  (2, 'Diego', 'Mora Gil', '600000002', 'diego@gamesvote.test', '$2b$10$dYQeE7/N.xEjUk439Kh...0BOhgobPv3z.Epf.PnkxzVKxUP.Jb3G', 'user', '2026-10-10 12:00:00', '2026-10-10 12:00:00'),
  (3, 'Elena', 'Ríos Pardo', '600000003', 'elena@gamesvote.test', '$2b$10$dYQeE7/N.xEjUk439Kh...0BOhgobPv3z.Epf.PnkxzVKxUP.Jb3G', 'user', '2026-10-10 12:00:00', '2026-10-10 12:00:00');
INSERT INTO `Valoration` (`id`, `description`, `value`, `gameId`, `userId`, `createdAt`, `updatedAt`) VALUES
  (1, 'Una historia larga y muy cuidada.', 10, 119133, 1, '2026-10-10 12:00:00', '2026-10-10 12:00:00'),
  (2, 'Exigente, pero explorar merece la pena.', 8, 119171, 2, '2026-10-10 12:00:00', '2026-10-10 12:00:00'),
  (3, 'Corto y con un humor muy bueno.', 9, 71, 3, '2026-10-10 12:00:00', '2026-10-10 12:00:00'),
  (4, 'Me gustó el mundo, aunque se me hizo largo.', 6, 1942, 2, '2026-10-10 12:00:00', '2026-10-10 12:00:00'),
  (5, 'Bonito y difícil a partes iguales.', 8, 14593, 1, '2026-10-10 12:00:00', '2026-10-10 12:00:00');

SET FOREIGN_KEY_CHECKS = 1;
