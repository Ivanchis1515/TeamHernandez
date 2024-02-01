-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-02-2024 a las 03:47:27
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
(1, 'Baja en grasa', 'Restringen la cantidad de grasas que se consumen', 'Yogurt sin grasa', '2023-10-14 02:12:11'),
(4, 'Baja en calorías', 'Son las que restringen la cantidad de alimentos, sin importar el origen de los nutrientes. Lo importante \r\nes lograr una restricción calórica', 'Frutas, verduras etc.', '2023-10-14 02:15:02'),
(5, 'Tacos de asada', 'Carne bien asada , al carbon', 'Aguacate, cilantro, cebollina, salsa, carne, tortillas ', '2024-01-27 03:17:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planes_ejercicios`
--

CREATE TABLE `planes_ejercicios` (
  `id_ejercicio` int(11) NOT NULL,
  `id_plan` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `instrucciones` varchar(255) NOT NULL,
  `series_rep` text NOT NULL,
  `estado` tinyint(4) NOT NULL,
  `video_ejercicio` varchar(255) DEFAULT NULL,
  `fecha_registro` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `planes_ejercicios`
--

INSERT INTO `planes_ejercicios` (`id_ejercicio`, `id_plan`, `nombre`, `descripcion`, `instrucciones`, `series_rep`, `estado`, `video_ejercicio`, `fecha_registro`) VALUES
(2, 1, 'Burpees', 'Ejercicio que mide la resistencia anaeróbica. Se realiza en varios movimientos (nace de la unión de las flexiones de pecho, las sentadillas y los saltos verticales) y con él se trabaja el abdomen, la espalda, el pecho, los brazos y las piernas.', 'Se parte de una posición inicial en cuclillas (o sentadillas), se colocan las manos en el suelo y se mantiene la cabeza erguida.\r\nDespués se desplazan las piernas hacia atrás con los pies juntos y se hace una flexión de pecho (también conocida como flexió', '{\"series\":\"5\",\"repeticiones\":\"6\"}', 1, 'http://localhost/TeamHernandez/Img/Animations/Animation_1706502909318.json', '2024-02-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planes_menu`
--

CREATE TABLE `planes_menu` (
  `id_plan` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `objetivo` varchar(50) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `estado` tinyint(4) NOT NULL,
  `foto` varchar(255) NOT NULL,
  `fecha_creacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `planes_menu`
--

INSERT INTO `planes_menu` (`id_plan`, `nombre`, `objetivo`, `descripcion`, `estado`, `foto`, `fecha_creacion`) VALUES
(1, 'Entrenamiento con peso corporal', 'Controlar el peso corporal', 'Aquellos diseñados sobre la base de un concepto similar al de la calistenia, en la que no se utilizan pesas de ningún tipo y es el cuerpo el que funciona como carga.', 1, 'http://localhost/TeamHernandez/Uploads/planes_imagenes/foto_entrenamiento_entrenamiento_con_peso_corporal.jfif', '2024-01-28'),
(2, 'Entrenamiento de resistencia', 'Ganar sobrecarga progresiva a medida que se entren', 'Atención en la resistencia básica o el entrenamiento de intervalos', 1, 'http://localhost/TeamHernandez/Uploads/planes_imagenes/foto_entrenamiento_entrenamiento_de_resistencia.jfif', '2024-01-28'),
(3, 'Entrenamiento de fuerza', 'Incremento de fuerza muscular', 'Marca una progresión a medida que el deportista va adquiriendo habilidades es clave para promover su evolución y no estancarse. Y esto, el hecho de incrementar la carga de trabajo según la progresión', 1, 'http://localhost/TeamHernandez/Uploads/planes_imagenes/foto_entrenamiento_entrenamiento_de_fuerza.jfif', '2024-01-28');

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
(1, 'Jorge Iván Hernández Velázquez', 'Ivanchis', '$2y$10$CjlN4hdB6ghZU2N5EL4Pi.FbMrbaMrJl0FsV2PMjMOuB8OlNqHxtm', 'Administrador', 19, 1),
(4, 'Ricardo Sánchez Romero', 'Ricarditouwu', '$2y$10$CB9FTp0VeXcGnAuMtKersuZq3T4/9carOMNhAcZokzKHqb9y.zdnK', 'Administrador', 22, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `dietas`
--
ALTER TABLE `dietas`
  ADD PRIMARY KEY (`iddieta`);

--
-- Indices de la tabla `planes_ejercicios`
--
ALTER TABLE `planes_ejercicios`
  ADD PRIMARY KEY (`id_ejercicio`),
  ADD KEY `id_plan` (`id_plan`);

--
-- Indices de la tabla `planes_menu`
--
ALTER TABLE `planes_menu`
  ADD PRIMARY KEY (`id_plan`);

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
  MODIFY `iddieta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `planes_ejercicios`
--
ALTER TABLE `planes_ejercicios`
  MODIFY `id_ejercicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `planes_menu`
--
ALTER TABLE `planes_menu`
  MODIFY `id_plan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `planes_ejercicios`
--
ALTER TABLE `planes_ejercicios`
  ADD CONSTRAINT `planes_ejercicios_ibfk_1` FOREIGN KEY (`id_plan`) REFERENCES `planes_menu` (`id_plan`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
