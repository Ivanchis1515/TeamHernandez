-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-04-2024 a las 04:06:17
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
-- Estructura de tabla para la tabla `periodos`
--

CREATE TABLE `periodos` (
  `idperiodo` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `periodo` varchar(45) NOT NULL,
  `inicio` date NOT NULL,
  `fin` date NOT NULL,
  `estado` tinyint(4) NOT NULL,
  `inicio_disponibilidad` date NOT NULL,
  `estado_inscripcion` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `periodos`
--

INSERT INTO `periodos` (`idperiodo`, `nombre`, `periodo`, `inicio`, `fin`, `estado`, `inicio_disponibilidad`, `estado_inscripcion`) VALUES
(1, 'Marzo - Abril', '2024', '2024-03-10', '2024-04-11', 1, '2024-03-11', 1),
(2, 'abril', '2024', '2024-03-19', '2024-05-01', 0, '2024-04-01', 0);

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
(2, 1, 'Burpees', 'Ejercicio que mide la resistencia anaeróbica. Se realiza en varios movimientos (nace de la unión de las flexiones de pecho, las sentadillas y los saltos verticales) y con él se trabaja el abdomen, la espalda, el pecho, los brazos y las piernas.', 'Se parte de una posición inicial en cuclillas (o sentadillas), se colocan las manos en el suelo y se mantiene la cabeza erguida.\r\nDespués se desplazan las piernas hacia atrás con los pies juntos y se hace una flexión de pecho (también conocida como flexió', '{\"series\":\"5\",\"repeticiones\":\"6\"}', 1, 'http://localhost/TeamHernandez/Img/Animations/Animation_1706502909318.json', '2024-02-01'),
(3, 2, 'Planchas laterales', 'Este tipo de rutina es exigente y requiere de fuerza y resistencia pero, sin duda, es lo más recomendable a la hora de marcar y tonificar los laterales de nuestro cuerpo.', '1. Colócate sobre uno de tus costados en una esterilla, apoyándote en uno de los lados de tu cuerpo, con la pierna y el antebrazo.\r\n2. A continuación, ejerce fuerza y eleva tu cuerpo de tal manera que todo el peso esté repartido entre el antebrazo y el pi', '{\"series\":\"6\",\"repeticiones\":\"17\"}', 1, 'http://localhost/TeamHernandez/Img/Animations/Animation_1706502928162.json', '2024-02-01'),
(9, 3, 'Peso completo', 'Es un ejercicio que implica fundamentalmente los músculos del hombro, en concreto, la cabeza anterior y posterior de los deltoides, el trapecio y los serratos.', 'Agarra la barra en pronación con las manos separadas a una distancia mayor que la anchura de los hombros, mantén los antebrazos perpendiculares a la barra durante todo el ejercicio.\r\nLevanta la barra, codos semiextendidos. Baja la barra hasta que esté a l', '{\"series\":\"4\",\"repeticiones\":\"5\"}', 1, 'http://localhost/TeamHernandez/Img/Animations/Animation_1707238889636.json', '2024-03-17'),
(10, 4, 'Aperturas', 'Con este se mejora el pectoral de manera aislada. Es con el que mejoraras los ganchos a la misma altura.', 'Golpea el saco, pero no no dejes de guardar una distancia prudente con él. Esta será le mejor práctica posible antes de enfrentarte a un verdadero oponente. Párate sobre ambos pies y no te caigas encima del saco. Mantén el equilibrio para conseguir una me', '{\"series\":\"4\",\"repeticiones\":\"3\"}', 1, 'http://localhost/TeamHernandez/Img/Animations/Animation_1710665996349.json', '2024-03-17');

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
(3, 'Entrenamiento de fuerza', 'Incremento de fuerza muscular', 'Marca una progresión a medida que el deportista va adquiriendo habilidades es clave para promover su evolución y no estancarse. Y esto, el hecho de incrementar la carga de trabajo según la progresión', 1, 'http://localhost/TeamHernandez/Uploads/planes_imagenes/foto_entrenamiento_entrenamiento_de_fuerza.jfif', '2024-01-28'),
(4, 'Entrenamiento de potencia', 'Los continuos movimientos y golpes que se incluyen', 'Tonificar y fortalecer; brazos, piernas y glúteos. Pero no solo eso. Con esta clase de entrenamiento trabajarás tu cuerpo desde los pies hasta la cabeza.', 1, 'http://localhost/TeamHernandez/Uploads/planes_imagenes/foto_entrenamiento_entrenamiento_de_potencia.png', '2024-03-17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios_costos`
--

CREATE TABLE `servicios_costos` (
  `id_servicio` int(11) NOT NULL,
  `servicio` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `costo` float NOT NULL,
  `oferta` tinyint(1) NOT NULL,
  `descuento` int(11) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicios_costos`
--

INSERT INTO `servicios_costos` (`id_servicio`, `servicio`, `descripcion`, `costo`, `oferta`, `descuento`, `estado`, `fecha`) VALUES
(1, 'Subscripción Mensual', '* Acceso ilimitado a las instalaciones\r\n* Asesoría personalizada\r\n* Acompañamiento de principio a fin', 300, 0, 0, 1, '2024-03-16'),
(2, 'Nutricionalista', 'Analizar la situación clínica y física de cada persona. Diseñar los parámetros deportivos y nivel de intensidad para cubrir las demandas energéticas. Mejorar el rendimiento deportivo y cubrir necesidades energéticas mediante la nutrición. Aconsejar suplementación alimenticia cuando sea necesario.', 450, 0, 0, 1, '2024-03-18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transacciones`
--

CREATE TABLE `transacciones` (
  `idtransaccion` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_servicio` int(11) NOT NULL,
  `id_periodo` int(11) NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `transacciones`
--

INSERT INTO `transacciones` (`idtransaccion`, `id_usuario`, `id_servicio`, `id_periodo`, `transaction_id`, `monto`, `estado`, `created_at`) VALUES
(2, 4, 1, 1, 'b8avxsfz', '300.00', 'submitted_for_settlement', '2024-03-18 05:54:56');

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
(4, 'Ricardo Sánchez Romero', 'Richi', '$2y$10$fEH7mW2x38neF/53DAi5v.qyTy3unnNfwwz5faJCJtvA3Ioiq.WYK', 'Cliente', 22, 1),
(32, 'Pilar Elisama Luna Aguilar', 'Elisama', '$2y$10$3IR.QOPFjJeyWjGM2d9JY.QI255apJQH8i/I1roWoldP.6w1h/xs.', 'Cliente', 21, 1),
(36, 'Jose Angel Luna Sedeño', 'Angelitobb', '$2y$10$vSmWuKotVouPnEBh.oxvPORbWYZkA5LP9XKvQmivg7bEUVLKaj32K', 'Administrador', 20, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `dietas`
--
ALTER TABLE `dietas`
  ADD PRIMARY KEY (`iddieta`);

--
-- Indices de la tabla `periodos`
--
ALTER TABLE `periodos`
  ADD PRIMARY KEY (`idperiodo`);

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
-- Indices de la tabla `servicios_costos`
--
ALTER TABLE `servicios_costos`
  ADD PRIMARY KEY (`id_servicio`);

--
-- Indices de la tabla `transacciones`
--
ALTER TABLE `transacciones`
  ADD PRIMARY KEY (`idtransaccion`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_servicio` (`id_servicio`),
  ADD KEY `id_periodo` (`id_periodo`);

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
  MODIFY `iddieta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `periodos`
--
ALTER TABLE `periodos`
  MODIFY `idperiodo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `planes_ejercicios`
--
ALTER TABLE `planes_ejercicios`
  MODIFY `id_ejercicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `planes_menu`
--
ALTER TABLE `planes_menu`
  MODIFY `id_plan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `servicios_costos`
--
ALTER TABLE `servicios_costos`
  MODIFY `id_servicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `transacciones`
--
ALTER TABLE `transacciones`
  MODIFY `idtransaccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `planes_ejercicios`
--
ALTER TABLE `planes_ejercicios`
  ADD CONSTRAINT `planes_ejercicios_ibfk_1` FOREIGN KEY (`id_plan`) REFERENCES `planes_menu` (`id_plan`);

--
-- Filtros para la tabla `transacciones`
--
ALTER TABLE `transacciones`
  ADD CONSTRAINT `transacciones_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `transacciones_ibfk_2` FOREIGN KEY (`id_servicio`) REFERENCES `servicios_costos` (`id_servicio`),
  ADD CONSTRAINT `transacciones_ibfk_3` FOREIGN KEY (`id_periodo`) REFERENCES `periodos` (`idperiodo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
