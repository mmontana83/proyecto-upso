CREATE DATABASE  IF NOT EXISTS `proyecto` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `proyecto`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 192.168.0.254    Database: proyecto
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id_cliente` varchar(11) NOT NULL COMMENT 'El Id será el CUIT/CUIL del Cliente',
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `empresa` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `id_tipoCondicionIVA` int NOT NULL,
  `id_tipoEstado` int NOT NULL DEFAULT '1',
  `id_usuario` varchar(11) NOT NULL,
  PRIMARY KEY (`id_cliente`),
  KEY `id_usuario` (`id_usuario`),
  KEY `clientes_ibfk_2_idx` (`id_tipoCondicionIVA`),
  KEY `clientes_ibfk_3_idx1` (`id_tipoEstado`),
  CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `clientes_ibfk_2` FOREIGN KEY (`id_tipoCondicionIVA`) REFERENCES `tipocondicioniva` (`id_tipoCondicionIVA`),
  CONSTRAINT `clientes_ibfk_3` FOREIGN KEY (`id_tipoEstado`) REFERENCES `tipoestado` (`id_tipoestado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES ('12246549873','Roberto Julián','Carlos','RJC Computación','stisrlpa@gmail.com','2932224455','Murature 1',4,2,'20302022731'),('20110336209','Antonio','Montaña','','antonio@gmail.com','2932454545','ATEPAM 1 CASA 44',1,1,'23302022739'),('20139570910','Walter Rubén','Bozzo','Bozzo Construcciones','wrbozzo@gmail.com','2932444555','Uriburu 1357',3,2,'24302022737'),('23183214579','Rosa','Gonzalez','Rosita Pastelería','rositapasteles@gmail.com','2932447788','Bº CENTENARIO CASA 44',5,2,'20302022731'),('23491199983','Laura','Gonzalez','Panadería Anocheciendo','panaderiaamanacer@gmail.com','2932556677','Paso 2044',2,2,'23302022739'),('23551234563','Rodrigo','Forte','STI S.R.L COMPUTACIÓN','stisrlpa@gmail.com','2932224455','Murature 1234',4,1,'23302022739'),('23668931023','Carla','Rueda','Fashion Nails','fnails@gmail.com','2195566778','Colón 123, Bahía Blanca',2,1,'24302022737'),('23668931331','Roberto','Martinez','Calzado Sport','sportcalzadospa@gmail.com','2932444666','Colón 123, Punta Alta',1,1,'24302022737'),('24123654889','Norma','Martínez',NULL,'normamartinez@gmail.com','2932455444','Uriburu 758',5,1,'23302022739'),('24234569878','José Bruno','Canceso','Las ligas Mayores S.R.L','ligas@gmail.com','2932445557','Paso 2332',8,2,'20302022731'),('24367894360','','','La Carlota Rectificaciones','carlotarect@gmail.com','011288371098','Florida 443',1,1,'24302022737'),('25789457891','null','null','Clínica Salud Mental','saludmentalpa@gmail.com','2932457897','Murature 688',1,1,'20302022731'),('30627393713','','','Dirección de Cultura y Educación (Bajo Hondo)','essa1coronesrosales@abc.gob.ar','2392491114','C. 8 - Victoria Llanos, Bajo Hondo',4,1,'23302022739'),('30681157375',NULL,NULL,'Hospital Eva Perón','evaperon@gmail.com','2932422955','Uriburu 650',1,1,'20302022731'),('30999018447','','','Ministerio de Seguridad (Punta Alta)','estacionpuntaalta@gmail.com','2932421444','Murature 572',3,1,'23302022739'),('78126543215','Juan Manuel','Martinez','Casa Martinez','casamartinezpa@gmail.com','2932456987','Irigoyen 457',1,1,'20302022731'),('95124568798','Lucrecia','Martinez','Lu Deco ART','ludeco@gmail.com','29326456987','Av. Alem 2344',6,1,'20302022731');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `controlstock`
--

DROP TABLE IF EXISTS `controlstock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `controlstock` (
  `id_controlstock` int NOT NULL AUTO_INCREMENT,
  `id_producto` int DEFAULT NULL,
  `movimiento` int DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `id_cliente` varchar(11) DEFAULT NULL,
  `nroFactura` int DEFAULT NULL,
  `id_usuario` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id_controlstock`),
  KEY `cs_ibfk_1_idx` (`id_producto`),
  KEY `cs_ibfk_4_idx` (`id_usuario`),
  CONSTRAINT `cs_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`),
  CONSTRAINT `cs_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `controlstock`
--

LOCK TABLES `controlstock` WRITE;
/*!40000 ALTER TABLE `controlstock` DISABLE KEYS */;
INSERT INTO `controlstock` VALUES (12,24,-2,'2023-11-24 00:00:00',91554.00,'23183214579',1,'20302022731'),(13,27,-1,'2023-11-24 00:00:00',4400.00,'23183214579',1,'20302022731'),(14,7,-100,'2023-11-24 00:00:00',300000.00,'25789457891',2,'20302022731'),(15,8,-100,'2023-11-24 00:00:00',17500.00,'25789457891',2,'20302022731');
/*!40000 ALTER TABLE `controlstock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detallefactura`
--

DROP TABLE IF EXISTS `detallefactura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detallefactura` (
  `id_detalle` int NOT NULL AUTO_INCREMENT,
  `nroFactura` int NOT NULL,
  `id_cliente` varchar(11) NOT NULL,
  `id_usuario` varchar(11) NOT NULL,
  `id_producto` int NOT NULL,
  `cantidad` int NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `precioTotal` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `detallefactura_ibfk_2_idx` (`id_producto`),
  KEY `detallefactura_ibfk_1_idx` (`nroFactura`,`id_cliente`,`id_usuario`),
  CONSTRAINT `detallefactura_ibfk_1` FOREIGN KEY (`nroFactura`, `id_cliente`, `id_usuario`) REFERENCES `factura` (`nroFactura`, `id_cliente`, `id_usuario`),
  CONSTRAINT `detallefactura_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detallefactura`
--

LOCK TABLES `detallefactura` WRITE;
/*!40000 ALTER TABLE `detallefactura` DISABLE KEYS */;
INSERT INTO `detallefactura` VALUES (18,1,'23183214579','20302022731',24,2,45777.00,91554.00),(19,1,'23183214579','20302022731',27,1,4400.00,4400.00),(20,2,'25789457891','20302022731',7,100,3000.00,300000.00),(21,2,'25789457891','20302022731',8,100,175.00,17500.00);
/*!40000 ALTER TABLE `detallefactura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factura`
--

DROP TABLE IF EXISTS `factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `factura` (
  `nroFactura` int NOT NULL,
  `id_cliente` varchar(11) NOT NULL,
  `id_usuario` varchar(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `id_tipoFactura` int DEFAULT NULL,
  `id_condicionVenta` int DEFAULT NULL,
  PRIMARY KEY (`nroFactura`,`id_cliente`,`id_usuario`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_cliente` (`id_cliente`),
  KEY `factura_ibfk_1_idx` (`id_tipoFactura`),
  KEY `factura_ibfk_4_idx` (`id_condicionVenta`),
  CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`id_tipoFactura`) REFERENCES `tipofactura` (`id_tipoFactura`),
  CONSTRAINT `factura_ibfk_3` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `factura_ibfk_4` FOREIGN KEY (`id_condicionVenta`) REFERENCES `tipocondicionventa` (`idtipocondicionventa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura`
--

LOCK TABLES `factura` WRITE;
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
INSERT INTO `factura` VALUES (1,'23183214579','20302022731','2023-11-24',95954.00,3,1),(2,'25789457891','20302022731','2023-11-24',317500.00,1,1);
/*!40000 ALTER TABLE `factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `codigoProducto` int NOT NULL,
  `producto` varchar(100) NOT NULL,
  `descripcion` text,
  `precio` decimal(10,2) NOT NULL,
  `stock` int NOT NULL,
  `id_tipoProducto` int NOT NULL,
  `id_tipoEstado` int NOT NULL DEFAULT '1',
  `id_usuario` varchar(11) NOT NULL,
  PRIMARY KEY (`id_producto`),
  UNIQUE KEY `codigoProducto_UNIQUE` (`codigoProducto`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_tipoproducto` (`id_tipoProducto`),
  KEY `tipoestado_ibfk_1_idx` (`id_tipoEstado`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `tipoestado_ibfk_1` FOREIGN KEY (`id_tipoEstado`) REFERENCES `tipoestado` (`id_tipoestado`),
  CONSTRAINT `tipoproducto_ibfk_1` FOREIGN KEY (`id_tipoProducto`) REFERENCES `tipoproducto` (`id_tipoProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,123456,'NEUMATICOS','bridgestone',50.20,-6,1,1,'23302022739'),(2,134567,'BUJÍA NAFTERA','BUJÍA',6500.00,50,1,2,'23302022739'),(3,145678,'BUJÍA DIESEL','BUJÍA',7988.00,4,1,1,'23302022739'),(4,145645,'ACEITE MOTOR 15W40','ACEITE MOTOR MÁS CARITO',37880.00,25,1,2,'23302022739'),(5,156456,'SERVICE AUTOMOTOR','SERVICE QUE SE REALIZA CADA 10.000 KM',18000.00,0,2,1,'23302022739'),(6,148457,'AFINACIÓN','AFINACIÓN',15000.00,0,2,1,'23302022739'),(7,254874,'GASAS','Rollo de 100m.',3000.00,50,1,1,'20302022731'),(8,254856,'JERINGA X 10ml','Jeringa apta para visitas.',175.00,100,1,1,'20302022731'),(9,258746,'NEBULIZADOR','No incluye máscara.',7800.00,3,1,1,'20302022731'),(10,245477,'VACUNACION A DOMICILIO','No incluye viáticos.',3000.00,0,2,1,'20302022731'),(11,254545,'MEDICION PRESION','',500.00,0,2,1,'20302022731'),(15,198765,'Neumaticos','fate',100.00,10,1,1,'23302022739'),(16,198762,'Neumaticos','continental',100.00,10,1,1,'23302022739'),(17,198764,'Neumaticos','michelin',250.00,100,1,1,'23302022739'),(18,198763,'Neumaticos','yacohama',250.00,100,1,1,'23302022739'),(19,198767,'Neumsasasaticos','yacohama',250.00,100,1,2,'23302022739'),(20,198769,'NEUMATICOS','TWISTER',250.00,100,1,2,'23302022739'),(21,198770,'NEUMATICOS','PINOCHO',250.00,100,1,1,'23302022739'),(22,198771,'NEUMATICOS','LAMOROCHA',250.00,100,1,1,'23302022739'),(23,145648,'ACEITE MOTOR 25W40','ACEITE PARA MOTORES FUNDIDOS',45000.00,5,1,1,'23302022739'),(24,654987,'Purificador','Este producto sirve para purificar el aire',45777.00,2,1,1,'20302022731'),(25,256987,'Purificador','Purificador de Aire',45500.00,3,1,1,'23302022739'),(26,123123,'Purificador','Este producto sirve para purificar el aire',45777.00,3,1,1,'20302022731'),(27,321321,'Vick Vaporub','Para la descongestión nasal',3700.00,15,1,2,'20302022731'),(28,999888,'Novalgina','por 900ml',7880.00,3,1,2,'20302022731'),(29,788777,'TosoTos','Para la Tos y el catarro!',600.00,5,1,2,'20302022731');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipocondicioniva`
--

DROP TABLE IF EXISTS `tipocondicioniva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipocondicioniva` (
  `id_tipoCondicionIVA` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) NOT NULL,
  PRIMARY KEY (`id_tipoCondicionIVA`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipocondicioniva`
--

LOCK TABLES `tipocondicioniva` WRITE;
/*!40000 ALTER TABLE `tipocondicioniva` DISABLE KEYS */;
INSERT INTO `tipocondicioniva` VALUES (1,'IVA RESPONSABLE INSCRIPTO'),(2,'IVA RESPONSABLE NO INSCRIPTO'),(3,'IVA NO RESPOSABLE'),(4,'IVA SUJETO EXTERNO'),(5,'CONSUMIDOR FINAL'),(6,'RESPONSABLE MONOTRIBUTO'),(7,'SUJETO NO CATEGORIZADO'),(8,'PROVEEDOR DEL EXTERIOR'),(9,'CLIENTE DEL EXTERIOR'),(10,'IVA LIBERADO - LEY Nº 19.640'),(11,'IVA RESPONSABLE INSCRIPTO - AGENTE DE PERCEPCIÓN'),(12,'PEQUEÑO CONTRIBUYENTE EVENTUAL'),(13,'MONOTRIBUTISTA SOCIAL'),(14,'PEQUEÑO CONTRIBUYENTE EVENTUAL SOCIAL');
/*!40000 ALTER TABLE `tipocondicioniva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipocondicionventa`
--

DROP TABLE IF EXISTS `tipocondicionventa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipocondicionventa` (
  `idtipocondicionventa` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idtipocondicionventa`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipocondicionventa`
--

LOCK TABLES `tipocondicionventa` WRITE;
/*!40000 ALTER TABLE `tipocondicionventa` DISABLE KEYS */;
INSERT INTO `tipocondicionventa` VALUES (1,'Contado'),(2,'Tarjeta de Débito'),(3,'Tarjeta de Crédito'),(4,'Cuenta Corriente'),(5,'Cheque'),(6,'Ticket');
/*!40000 ALTER TABLE `tipocondicionventa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoestado`
--

DROP TABLE IF EXISTS `tipoestado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoestado` (
  `id_tipoestado` int NOT NULL AUTO_INCREMENT,
  `tipoestado` varchar(6) NOT NULL,
  PRIMARY KEY (`id_tipoestado`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='En esta tabla almaceno el estado de un cliente: "ACTIVO" si el cliente esta vigente, "BAJA" si el cliente fue dado de baja';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoestado`
--

LOCK TABLES `tipoestado` WRITE;
/*!40000 ALTER TABLE `tipoestado` DISABLE KEYS */;
INSERT INTO `tipoestado` VALUES (1,'ACTIVO'),(2,'BAJA');
/*!40000 ALTER TABLE `tipoestado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipofactura`
--

DROP TABLE IF EXISTS `tipofactura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipofactura` (
  `id_tipoFactura` int NOT NULL AUTO_INCREMENT,
  `tipoFactura` varchar(50) NOT NULL,
  PRIMARY KEY (`id_tipoFactura`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipofactura`
--

LOCK TABLES `tipofactura` WRITE;
/*!40000 ALTER TABLE `tipofactura` DISABLE KEYS */;
INSERT INTO `tipofactura` VALUES (1,'FACTURA A'),(2,'FACTURA B'),(3,'FACTURA C'),(4,'RECIBO C'),(5,'REMITO'),(6,'NOTA DE CRÉDITO'),(7,'NOTA DE DÉBITO');
/*!40000 ALTER TABLE `tipofactura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoproducto`
--

DROP TABLE IF EXISTS `tipoproducto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoproducto` (
  `id_tipoProducto` int NOT NULL AUTO_INCREMENT,
  `tipoProducto` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id_tipoProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoproducto`
--

LOCK TABLES `tipoproducto` WRITE;
/*!40000 ALTER TABLE `tipoproducto` DISABLE KEYS */;
INSERT INTO `tipoproducto` VALUES (1,'PRODUCTO'),(2,'SERVICIO');
/*!40000 ALTER TABLE `tipoproducto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` varchar(11) NOT NULL COMMENT 'El id será el CUIT/CUIL del usuario. Se utlizaran solamente numeros.',
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `contraseña` char(200) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `id_tipoEstado` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_usuario`),
  KEY `usuarios_ibfk_1_idx` (`id_tipoEstado`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_tipoEstado`) REFERENCES `tipoestado` (`id_tipoestado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('20302022731','Cristian','Lich','clich','scrypt:32768:8:1$GLb3yZMp5oehEr9t$8a1b2f3bcc9de44b142df1fca15deeec34dee1d594b6a6d007e98c7cda4a791dc4869c3dbec1310cdfde2d43fad942f2324357ee784f67fd9ebc1d8892a4f735','cris.joel.lich@gmail.com','+5492932613757',1),('21302022735','Gerónimo','Sanchez','gsanchez','scrypt:32768:8:1$GLb3yZMp5oehEr9t$8a1b2f3bcc9de44b142df1fca15deeec34dee1d594b6a6d007e98c7cda4a791dc4869c3dbec1310cdfde2d43fad942f2324357ee784f67fd9ebc1d8892a4f735','sanchezgeronimo01@gmail.com','+5492932495043',1),('23302022739','Martín','Montaña','mmontana','scrypt:32768:8:1$GLb3yZMp5oehEr9t$8a1b2f3bcc9de44b142df1fca15deeec34dee1d594b6a6d007e98c7cda4a791dc4869c3dbec1310cdfde2d43fad942f2324357ee784f67fd9ebc1d8892a4f735','martin.miguel.montana@gmail.com','+5492932614608',1),('24302022737','Eduardo','Weinzettel','eweinz','scrypt:32768:8:1$GLb3yZMp5oehEr9t$8a1b2f3bcc9de44b142df1fca15deeec34dee1d594b6a6d007e98c7cda4a791dc4869c3dbec1310cdfde2d43fad942f2324357ee784f67fd9ebc1d8892a4f735','eduardoweinz@hotmail.com','+5492932540008',1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'proyecto'
--
/*!50003 DROP PROCEDURE IF EXISTS `sp_actualizarCliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_actualizarCliente`(in p_id_cliente varchar(11), in p_nombre varchar(50), in p_apellido varchar(50), in p_empresa varchar(50), in p_email varchar(50),
										 in p_telefono varchar(50), in p_direccion varchar(100), in p_id_tipoCondicionIVA int, in p_id_usuario varchar(11))
BEGIN
	UPDATE clientes
    SET nombre = p_nombre, apellido = p_apellido, empresa = p_empresa, email = p_email, telefono = p_telefono, direccion = p_direccion,
		id_tipoCondicionIVA = p_id_tipoCondicionIVA
	WHERE clientes.id_usuario = p_id_usuario AND clientes.id_cliente = p_id_cliente;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_actualizarProducto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_actualizarProducto`(
    in p_codigoProducto int,
    in p_producto varchar(100), 
    in p_descripcion text, 
    in p_precio decimal(10,2), 
    in p_stock int, 
    in p_id_tipoProducto int,     
    in p_id_usuario varchar(11)    
)
BEGIN   
    UPDATE productos
    SET 
		producto = p_producto, 
        descripcion = p_descripcion, 
        precio = p_precio, 
        stock = p_stock, 
        id_tipoProducto = p_id_tipoProducto        
    WHERE id_usuario = p_id_usuario 
    AND codigoProducto = p_codigoProducto;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_altaCliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_altaCliente`(in p_id_cliente varchar(11), in p_id_usuario varchar(11))
BEGIN
	UPDATE clientes
    SET id_tipoEstado = 1
    WHERE id_cliente = p_id_cliente AND id_usuario = p_id_usuario;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_altaProducto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_altaProducto`(
    in p_id_usuario varchar(11), 
    in p_codigoProducto int)
BEGIN    
    UPDATE productos
    SET id_tipoEstado = 1
    WHERE id_usuario = p_id_usuario 
    AND codigoProducto = p_codigoProducto;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_dashboard_clientesActivos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_dashboard_clientesActivos`(in p_id_usuario varchar(11))
BEGIN
	SELECT count(id_cliente) as ClientesActivos
	from clientes
	where id_usuario = p_id_usuario and id_tipoEstado = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_dashboard_clientesTotales` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_dashboard_clientesTotales`(in p_id_usuario varchar(11))
BEGIN
	SELECT count(id_cliente) as ClientesTotales 
	from clientes
	where id_usuario = p_id_usuario and id_tipoEstado = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_dashboard_controlStock` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_dashboard_controlStock`(in p_id_usuario varchar(11))
BEGIN
	SELECT producto, stock
    FROM productos
    WHERE id_usuario = p_id_usuario and id_tipoProducto = '1';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_dashboard_historialVentas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_dashboard_historialVentas`(in p_id_usuario varchar(11))
BEGIN
SELECT year(fecha) as Año, month(fecha) as Mes, sum(total) as Ventas 
from factura
where id_usuario = p_id_usuario
group by Mes, Año
order by Año, Mes;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_dashboard_movimientoStock` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_dashboard_movimientoStock`(in p_id_usuario varchar(11))
BEGIN
SELECT productos.producto as Producto, movimiento as Movimiento, fecha as Fecha, 
controlstock.precio as Precio, IF ((clientes.nombre IS NULL OR clientes.nombre = "" OR clientes.nombre = "null") OR (clientes.apellido IS NULL OR clientes.apellido = "" OR clientes.apellido = "null"), clientes.empresa,
		IF ((clientes.empresa is NULL or clientes.empresa = "" or clientes.empresa="null"), concat(clientes.apellido, ' ', clientes.nombre), concat(clientes.apellido, ' ', clientes.nombre, ' (', clientes.empresa, ')'))) AS Cliente,
 nrofactura as Factura
FROM controlstock
INNER JOIN productos ON productos.id_producto = controlstock.id_producto
INNER JOIN clientes ON clientes.id_cliente = controlstock.id_cliente
INNER JOIN usuarios ON usuarios.id_usuario = controlstock.id_usuario
WHERE controlstock.id_usuario = p_id_usuario and productos.id_tipoProducto = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_dashboard_rankingVentasByCliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_dashboard_rankingVentasByCliente`(in p_id_usuario varchar(11))
BEGIN
	SELECT IF ((clientes.nombre IS NULL OR clientes.nombre = "" OR clientes.nombre = "null") OR (clientes.apellido IS NULL OR clientes.apellido = "" OR clientes.apellido = "null"), clientes.empresa,
		IF ((clientes.empresa is NULL or clientes.empresa = "" or clientes.empresa="null"), concat(clientes.apellido, ' ', clientes.nombre), concat(clientes.apellido, ' ', clientes.nombre, ' (', clientes.empresa, ')'))) AS Cliente,  sum(factura.total) as Venta 
    FROM factura
    INNER JOIN clientes on factura.id_cliente = clientes.id_cliente
    WHERE factura.id_usuario = p_id_usuario
    GROUP BY factura.id_cliente;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_dashboard_rankingVentasByProducto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_dashboard_rankingVentasByProducto`(in p_id_usuario varchar(11))
BEGIN
SELECT productos.producto as Producto, sum(detallefactura.precioTotal) as Venta
    FROM detallefactura
	INNER JOIN productos on detallefactura.id_producto = productos.id_producto
    WHERE detallefactura.id_usuario = p_id_usuario and productos.id_tipoProducto = '1' 
    GROUP BY productos.producto;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_dashboard_rankingVentasByServicio` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_dashboard_rankingVentasByServicio`(in p_id_usuario varchar(11))
BEGIN
SELECT productos.producto as Servicio, sum(detallefactura.precioTotal) as Venta
    FROM detallefactura
	INNER JOIN productos on detallefactura.id_producto = productos.id_producto
    WHERE detallefactura.id_usuario = p_id_usuario and productos.id_tipoProducto = '2' 
    GROUP BY productos.producto;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_dashboard_ventasTotales` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_dashboard_ventasTotales`(in p_id_usuario varchar(11))
BEGIN
	SELECT sum(total) as VentasTotales 
	from factura
	where id_usuario = p_id_usuario;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_eliminarCliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_eliminarCliente`(in p_id_cliente varchar(11), in p_id_usuario varchar(11))
BEGIN
	UPDATE clientes
    SET id_tipoEstado = 2
    WHERE id_cliente = p_id_cliente AND id_usuario = p_id_usuario;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_eliminarProducto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb3 */ ;
/*!50003 SET character_set_results = utf8mb3 */ ;
/*!50003 SET collation_connection  = utf8mb3_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_eliminarProducto`(
    in p_id_usuario varchar(11),
    in p_codigoProducto int
)
BEGIN    
    UPDATE productos
    SET productos.id_tipoEstado = 2
    WHERE codigoProducto = p_codigoProducto 
    AND id_usuario = p_id_usuario
    AND productos.id_tipoEstado = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insertarCliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_insertarCliente`(in p_id_cliente varchar(11), in p_nombre varchar(50), in p_apellido varchar(50),
									   in p_empresa varchar(50), in p_email varchar(50), in p_telefono varchar(50), in p_direccion varchar(100),
                                       in p_id_tipoCondicionIVA int, in p_id_usuario varchar(11))
BEGIN
	INSERT INTO clientes (id_cliente, nombre, apellido, empresa, email, telefono, direccion, id_tipoCondicionIVA, id_tipoEstado, id_usuario)
	VALUES (p_id_cliente, p_nombre, p_apellido, p_empresa, p_email, p_telefono, p_direccion, p_id_tipoCondicionIVA, 1, p_id_usuario);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insertarFactura` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_insertarFactura`(in p_id_cliente varchar(11), in p_id_usuario varchar(11),
															 in p_fecha date, in p_total decimal(10,2), in p_id_tipoFactura int,
                                                             in p_id_condicionVenta int)
BEGIN
    DECLARE p_nrofactura int;
    # Obtengo el número de la última factura asociada al cliente y usuario
	SELECT MAX(nroFactura) INTO p_nroFactura FROM factura WHERE id_usuario = p_id_usuario;
    # Si el número obtenido es null lo inicializo en 0 (Significa que el cliente-usuario no tiene facturas asociadas)
    IF p_nroFactura IS NULL THEN SET p_nroFactura = 0; END IF;
    #Inserto la nueva factura.
	INSERT INTO factura (nroFactura, id_cliente, id_usuario, fecha, total, id_tipoFactura, id_condicionVenta)
	VALUES (p_nroFactura + 1, p_id_cliente, p_id_usuario, p_fecha, p_total, p_id_tipoFactura, p_id_condicionVenta);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insertarFacturaDetalle` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_insertarFacturaDetalle`(in p_id_cliente varchar(11), in p_id_usuario varchar(11), in p_id_producto int, 
																	in p_cantidad int , in p_precio decimal(10,2))
BEGIN
	
    DECLARE p_nroFactura int;
    DECLARE p_id_tipoProducto int;
    DECLARE p_fechaFactura datetime;
	
    -- obtengo el último número de factura
    SELECT MAX( nroFactura ) INTO p_nroFactura FROM factura WHERE id_cliente = p_id_cliente and id_usuario = p_id_usuario;
	
    -- inserto el detalle de la factura
    INSERT INTO detallefactura (nroFactura, id_cliente, id_usuario, id_producto, cantidad, precio, precioTotal)
	VALUES (p_nroFactura, p_id_cliente, p_id_usuario, p_id_producto, p_cantidad, p_precio, p_cantidad * p_precio);
    
    -- actualizo el stock en la tabla productos. PENDIENTE: controlar que la cantidad sea menor al stock
    UPDATE productos
    SET stock = stock - p_cantidad
    WHERE id_usuario = p_id_usuario 
    AND id_producto = p_id_producto;
    
    -- agrego esta salida de producto al control de stock. Si es un servicio no lo agrego.
    SELECT fecha INTO p_fechaFactura FROM factura WHERE id_cliente = p_id_cliente and id_usuario = p_id_usuario and nroFactura = p_nroFactura;
    SELECT id_tipoProducto into p_id_tipoProducto from productos where id_producto = p_id_producto;
    IF p_id_tipoProducto = 1
    THEN 
		INSERT INTO controlstock(id_producto, movimiento, fecha, precio, id_cliente, nroFactura, id_usuario)
        VALUES (p_id_producto, -1 * p_cantidad, p_fechaFactura, p_cantidad * p_precio, p_id_cliente, p_nroFactura, p_id_usuario);
	END IF;
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_insertarProducto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_insertarProducto`(
	 in p_codigoProducto int,
    in p_producto varchar(100), 
    in p_descripcion text, 
    in p_precio decimal(10,2), 
    in p_stock int, 
    in p_id_tipoProducto int, 
    in p_id_usuario varchar(11))
BEGIN
    DECLARE p_id_producto int;
    DECLARE codigoExists int;

    -- Verificar si el código ya existe en la tabla
    SELECT COUNT(*) INTO codigoExists FROM productos WHERE codigoProducto = p_codigoProducto;

    IF codigoExists = 0 THEN
        -- Insertar el nuevo producto solo si el código no existe
        INSERT INTO productos (codigoProducto,
                               producto, 
                               descripcion, 
                               precio, 
                               stock, 
                               id_tipoProducto, 
                               id_tipoEstado, 
                               id_usuario)
        VALUES (p_codigoProducto,
                p_producto, 
                p_descripcion, 
                p_precio, 
                p_stock, 
                p_id_tipoProducto, 
                1, 
                p_id_usuario);

        -- Recupero el ID del producto recién insertado
        SELECT MAX(id_producto) INTO p_id_producto 
        FROM productos WHERE id_usuario = p_id_usuario;

        -- Inserto el último producto en el controlstock
        INSERT INTO controlstock (id_producto, movimiento, fecha, precio, id_usuario)
        VALUES (p_id_producto, p_stock, NOW(), p_precio, p_id_usuario);
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_listarTipoCondicionIVA` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_listarTipoCondicionIVA`()
BEGIN
	SELECT * FROM tipocondicioniva;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_listarTipoCondicionVenta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_listarTipoCondicionVenta`()
BEGIN
	select * from tipocondicionventa;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_listarTipoFactura` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_listarTipoFactura`()
BEGIN
	SELECT * FROM tipofactura;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_listarTipoProducto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_listarTipoProducto`()
BEGIN
	SELECT * FROM tipoproducto;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_loginUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_loginUsuario`(in p_usuario varchar(50), in p_contraseña char(200))
BEGIN
	SELECT id_usuario, nombre, apellido, email, telefono, id_tipoEstado
	FROM usuarios
    WHERE usuario = lower(p_usuario) AND contraseña = p_contraseña;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtenerClienteById_Cliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_obtenerClienteById_Cliente`(in p_id_usuario varchar(11), in p_id_cliente varchar(11))
BEGIN
	SELECT CONCAT(clientes.nombre,' ',clientes.apellido, ' (',clientes.empresa,')') as Cliente, clientes.id_tipoEstado
    FROM clientes
    WHERE clientes.id_usuario = p_id_usuario AND clientes.id_cliente = p_id_cliente;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtenerClientesByUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_obtenerClientesByUsuario`(in id_usuario varchar(11))
BEGIN
	SELECT clientes.id_cliente, clientes.nombre, clientes.apellido, clientes.empresa, clientes.email, clientes.telefono, 
		   clientes.direccion, tipocondicioniva.descripcion as 'condicionIVA'
    FROM clientes INNER JOIN tipocondicioniva ON clientes.id_tipoCondicionIVA = tipocondicioniva.id_tipoCondicionIVA
    WHERE clientes.id_usuario = id_usuario and clientes.id_tipoEstado = '1';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtenerDetalleFactura` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_obtenerDetalleFactura`(in p_id_usuario varchar(11), in p_id_cliente varchar(11), in p_nroFactura int)
BEGIN
	SELECT productos.producto, detallefactura.cantidad, detallefactura.precio, detallefactura.cantidad * detallefactura.precio as precioTotal
		FROM proyecto.detallefactura
	INNER JOIN productos ON detallefactura.id_producto = productos.id_producto
	WHERE detallefactura.id_usuario = p_id_usuario AND detallefactura.id_cliente = p_id_cliente AND detallefactura.nroFactura = p_nroFactura;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtenerFacturaByCliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_obtenerFacturaByCliente`(in p_id_usuario varchar(11), in p_id_cliente varchar(11), in p_nroFactura int)
BEGIN
    DECLARE razonSocial VARCHAR(255);
    
    -- Formateo el campo razonSocial
    SELECT 
        CASE 
			WHEN (clientes.nombre is NULL or clientes.nombre = "" or clientes.nombre = "null") AND (clientes.apellido is NULL or clientes.apellido="" or clientes.apellido="null") THEN clientes.empresa
			WHEN (clientes.empresa is NULL or clientes.empresa = "" or clientes.empresa="null") then concat(clientes.apellido, ' ', clientes.nombre)
            ELSE concat(clientes.apellido, ' ', clientes.nombre, ' (', clientes.empresa, ')')
		END
	INTO razonSocial
	FROM clientes WHERE clientes.id_usuario = p_id_usuario AND clientes.id_cliente = p_id_cliente;
    
    SELECT factura.nroFactura, factura.fecha, tipofactura.tipofactura, clientes.id_cliente, razonSocial, clientes.direccion, clientes.telefono, tipocondicionventa.descripcion as condicionVenta, 
           tipocondicioniva.descripcion as condicionIVA, factura.total
		FROM factura
		INNER JOIN clientes on factura.id_cliente = clientes.id_cliente
		INNER JOIN tipocondicioniva on clientes.id_tipoCondicionIVA = tipocondicioniva.id_tipoCondicionIVA
		INNER JOIN tipocondicionventa on factura.id_condicionVenta = tipocondicionventa.idtipocondicionventa
		INNER JOIN tipofactura ON factura.id_tipoFactura = tipofactura.id_tipoFactura
		WHERE factura.id_usuario = p_id_usuario AND factura.id_cliente = p_id_cliente AND factura.nroFactura = p_nroFactura;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtenerFacturasByCliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_obtenerFacturasByCliente`(in p_id_usuario varchar(11), in p_id_cliente varchar(11))
BEGIN
	SELECT factura.nroFactura, factura.fecha, tipofactura.tipofactura, clientes.id_cliente,  IF ((clientes.nombre IS NULL OR clientes.nombre = "" OR clientes.nombre = "null") OR (clientes.apellido IS NULL OR clientes.apellido = "" OR clientes.apellido = "null"), clientes.empresa,
		IF ((clientes.empresa is NULL or clientes.empresa = "" or clientes.empresa="null"), concat(clientes.apellido, ' ', clientes.nombre), concat(clientes.apellido, ' ', clientes.nombre, ' (', clientes.empresa, ')'))) AS razonSocial, clientes.direccion, clientes.telefono, tipocondicionventa.descripcion as condicionVenta, 
           tipocondicioniva.descripcion as condicionIVA, factura.total
		FROM factura
		INNER JOIN clientes on factura.id_cliente = clientes.id_cliente
		INNER JOIN tipocondicioniva on clientes.id_tipoCondicionIVA = tipocondicioniva.id_tipoCondicionIVA
		INNER JOIN tipocondicionventa on factura.id_condicionVenta = tipocondicionventa.idtipocondicionventa
		INNER JOIN tipofactura ON factura.id_tipoFactura = tipofactura.id_tipoFactura
		WHERE factura.id_usuario = p_id_usuario AND factura.id_cliente = p_id_cliente;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtenerFacturasById_Usuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_obtenerFacturasById_Usuario`(in p_id_usuario varchar(11))
BEGIN
   SELECT factura.nroFactura, factura.fecha, tipofactura.tipofactura, clientes.id_cliente, 
	IF ((clientes.nombre IS NULL OR clientes.nombre = "" OR clientes.nombre = "null") OR (clientes.apellido IS NULL OR clientes.apellido = "" OR clientes.apellido = "null"), clientes.empresa,
		IF ((clientes.empresa is NULL or clientes.empresa = "" or clientes.empresa="null"), concat(clientes.apellido, ' ', clientes.nombre), concat(clientes.apellido, ' ', clientes.nombre, ' (', clientes.empresa, ')'))) AS razonSocial, 
		clientes.direccion, clientes.telefono, tipocondicionventa.descripcion as condicionVenta, 
		tipocondicioniva.descripcion as condicionIVA, factura.total
	FROM factura
	INNER JOIN clientes on factura.id_cliente = clientes.id_cliente
	INNER JOIN tipocondicioniva on clientes.id_tipoCondicionIVA = tipocondicioniva.id_tipoCondicionIVA
	INNER JOIN tipocondicionventa on factura.id_condicionVenta = tipocondicionventa.idtipocondicionventa
	INNER JOIN tipofactura ON factura.id_tipoFactura = tipofactura.id_tipoFactura
	WHERE factura.id_usuario = p_id_usuario;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtenerIDtipoCondicionIVAbyDescripcion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_obtenerIDtipoCondicionIVAbyDescripcion`(in p_descripcion varchar(45))
BEGIN
	SELECT id_tipoCondicionIVA FROM tipocondicioniva WHERE descripcion = p_descripcion;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtenerId_UsuarioById_Cliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_obtenerId_UsuarioById_Cliente`(in p_id_cliente varchar(11))
BEGIN
	SELECT id_usuario
    FROM clientes
    WHERE id_cliente = p_id_cliente;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtenerProductoByUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_obtenerProductoByUsuario`(in p_id_usuario varchar(11), in p_codigoProducto int)
BEGIN
	SELECT *
    FROM productos 
    WHERE id_usuario = p_id_usuario and codigoProducto = p_codigoProducto;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtenerProductosByUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_obtenerProductosByUsuario`(in p_id_usuario varchar(11))
BEGIN
	SELECT productos.id_producto,
		   productos.codigoProducto,
		   productos.producto, 
           productos.descripcion, 
           productos.precio, 
           productos.stock, 
           tipoproducto.tipoproducto
    FROM productos 
    INNER JOIN tipoproducto 
    ON productos.id_tipoProducto = tipoproducto.id_tipoProducto
    WHERE productos.id_usuario = p_id_usuario 
    AND productos.id_tipoEstado = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtenerPWDByUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_obtenerPWDByUsuario`(in p_usuario varchar(50))
BEGIN
	SELECT contraseña
    FROM usuarios
    WHERE usuario = p_usuario;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtenerStockPorProducto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`proyecto`@`%` PROCEDURE `sp_obtenerStockPorProducto`(in p_id_usuario varchar(11), in p_id_producto int)
BEGIN
	SELECT stock, id_tipoProducto
    FROM productos
    WHERE id_producto = p_id_producto and id_usuario = p_id_usuario and id_tipoProducto = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-26 23:12:39
