-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-11-2023 a las 22:15:38
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `team_hernandez`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dietas`
--

CREATE TABLE `dietas` (
  `iddieta` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `caracteristicas` varchar(150) NOT NULL,
  `tipos_alimentos` varchar(100) NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `dietas`
--

INSERT INTO `dietas` (`iddieta`, `nombre`, `caracteristicas`, `tipos_alimentos`, `fecha`) VALUES
(1, 'Baja en grasa', 'Restringenlacantidaddegrasasqueseconsumen', 'Yogurt sin grasa', '2023-10-14 02:12:11'),
(4, 'Baja en calorías', 'Sonlasquerestringenlacantidaddealimentos,sinimportarelorigendelosnutrientes.Loimportante\r\neslograrunarestriccióncalórica', 'Frutas, verduras etc.', '2023-10-14 02:15:02'),
(5, 'Tacos de asada', 'Carne bien asada , al carbon', 'Aguacate, cilantro, cebollina, salsa, carne, tortillas ', '2023-10-16 16:22:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `usuario` varchar(20) NOT NULL,
  `psswd` varchar(255) NOT NULL,
  `tipo_rol` varchar(100) NOT NULL,
  `edad` int(11) NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `usuario`, `psswd`, `tipo_rol`, `edad`, `estado`) VALUES
(1, 'Jorge Iván Hernández Velázquez', 'Ivanchis1515', '$2y$10$hPrVg7t88HzYG5h5JqaxzeEYfiZrPWSyC5AmFzwpsMbbtNVrf3Q7S', 'Administrador', 19, 1),
(4, 'Ricardo Sánchez Romero', 'Ricarditouwu', '$2y$10$CB9FTp0VeXcGnAuMtKersuZq3T4/9carOMNhAcZokzKHqb9y.zdnK', 'Administrador', 22, 1),
(7, 'Ángel David Moreno Aragón', 'angel24', '$2y$10$YyZHMADmfOC5RrPrHFRFz.LFybiKrRd19PpZ3LVVWw/672FZIGNza', 'Coach', 20, 1),
(15, 'Maria Eva', 'Eva', '$2y$10$Vvj3HvWXWYSWqJeQDfIGKuFHcorQdpFxWhF/5EsFcUauH6RxBLo/2', 'Administrador', 111, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `dietas`
--
ALTER TABLE `dietas`
  ADD PRIMARY KEY (`iddieta`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `dietas`
--
ALTER TABLE `dietas`
  MODIFY `iddieta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
create table planes_ejercicios(
  id_ejercicio int PRIMARY KEY AUTO_INCREMENT NOT NULL, 
  id_plan int not null, nombre varchar(30) not null, 
  descripcion varchar(255) not null, 
  instrucciones varchar(255) not null, 
  series_rep text not null, 
  estado tinyint not null,
  video_ejercicio varchar(255), 
  fecha_registro date,
  FOREIGN KEY(id_plan) REFERENCES planes_menu(id_plan));