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
INSERT INTO `clientes` VALUES ('20110336209','Antonio','Montaña','','antonio@gmail.com','2932454545','ATEPAM 1 CASA 44',1,1,'23302022739'),('20139570910','Walter Rubén','Bozzo','','wrbozzo@gmail.com','2932444555','Uriburu 1357',3,2,'24302022737'),('23183214579','Rosa','Gonzalez',NULL,'no posee','2932447788','Bº CENTENARIO CASA 44',5,1,'20302022731'),('23491199983','Laura','Gonzalez','Panadería Anocheciendo','panaderiaamanacer@gmail.com','2932556677','Paso 2044',2,2,'23302022739'),('23551234563','Rodrigo','Forte','STI S.R.L COMPUTACIÓN','stisrlpa@gmail.com','2932119944','paso 321',4,1,'23302022739'),('23668931023','Carla','Rueda','Fashion Nails','fnails@gmail.com','2195566778','Colón 123, Bahía Blanca',2,1,'24302022737'),('24123654889','Norma','Martínez',NULL,'normamartinez@gmail.com','2932455444','Uriburu 758',5,1,'23302022739'),('24367894360','','','La Carlota Rectificaciones','carlotarect@gmail.com','011288371098','Florida 443',1,1,'24302022737'),('25789457891',NULL,NULL,'Clínica Salud Mental','saludmentalpa@gmail.com','2932457897','Murature 688',1,1,'20302022731'),('30627393713','','','Dirección de Cultura y Educación (Bajo Hondo)','essa1coronesrosales@abc.gob.ar','2392491114','C. 8 - Victoria Llanos, Bajo Hondo',4,1,'23302022739'),('30681157375',NULL,NULL,'Hospital Eva Perón','evaperon@gmail.com','2932422955','Uriburu 650',1,1,'20302022731'),('30999018447','','','Ministerio de Seguridad (Punta Alta)','estacionpuntaalta@gmail.com','2932421444','Murature 572',3,1,'23302022739');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detallefactura`
--

LOCK TABLES `detallefactura` WRITE;
/*!40000 ALTER TABLE `detallefactura` DISABLE KEYS */;
INSERT INTO `detallefactura` VALUES (1,1,'20110336209','23302022739',1,1,500.00,500.00),(2,1,'20110336209','23302022739',1,1,500.00,500.00),(3,1,'20110336209','23302022739',1,3,300.00,900.00),(4,2,'20110336209','23302022739',1,1,750.00,1500.00),(6,1,'25789457891','20302022731',7,1,750.00,750.00),(7,1,'25789457891','20302022731',7,1,750.00,750.00);
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
INSERT INTO `factura` VALUES (1,'20110336209','23302022739','2023-10-30',1000.00,1,3),(1,'25789457891','20302022731','2023-11-01',1500.00,1,1),(2,'20110336209','23302022739','2023-10-31',1500.00,1,1);
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
  `producto` varchar(100) NOT NULL,
  `descripcion` text,
  `precio` decimal(10,2) NOT NULL,
  `stock` int NOT NULL,
  `id_tipoProducto` int NOT NULL,
  `id_tipoEstado` int NOT NULL DEFAULT '1',
  `id_usuario` varchar(11) NOT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_tipoproducto` (`id_tipoProducto`),
  KEY `tipoestado_ibfk_1_idx` (`id_tipoEstado`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `tipoestado_ibfk_1` FOREIGN KEY (`id_tipoEstado`) REFERENCES `tipoestado` (`id_tipoestado`),
  CONSTRAINT `tipoproducto_ibfk_1` FOREIGN KEY (`id_tipoProducto`) REFERENCES `tipoproducto` (`id_tipoProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'PASTILLA DE FRENO','PASTILLA DE FRENO',7887.00,50,1,1,'23302022739'),(2,'BUJÍA NAFTERA','BUJÍA ',6500.00,50,1,1,'23302022739'),(3,'BUJÍA DIESEL','BUJÍA ',7988.00,50,1,1,'23302022739'),(4,'ACEITE MOTOR 10W40','ACEITE',35000.00,16,1,1,'23302022739'),(5,'SERVICE AUTOMOTOR','SERVICE QUE SE REALIZA CADA 10.000 KM',18000.00,0,2,1,'23302022739'),(6,'AFINACION','AFINACION',15000.00,0,2,1,'23302022739'),(7,'GASAS',NULL,3000.00,50,1,2,'20302022731'),(8,'JERINGA X 10ml',NULL,175.00,100,1,1,'20302022731'),(9,'NEBULIZADOR',NULL,7800.00,3,1,1,'20302022731'),(10,'VACUNACION A DOMICILIO',NULL,3000.00,0,2,1,'20302022731'),(11,'MEDICION PRESION','',500.00,0,2,1,'20302022731');
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
INSERT INTO `usuarios` VALUES ('20302022731','Cristian','Lich','clich','scrypt:32768:8:1$GLb3yZMp5oehEr9t$8a1b2f3bcc9de44b142df1fca15deeec34dee1d594b6a6d007e98c7cda4a791dc4869c3dbec1310cdfde2d43fad942f2324357ee784f67fd9ebc1d8892a4f735','cris.joel.lich@gmail.com','+5492932613757',1),('21302022735','Gerónimo','Sanchez','gsanchez','1234','sanchezgeronimo01@gmail.com','+5492932495043',1),('23302022739','Martín','Montaña','mmontana','1234','martin.miguel.montana@gmail.com','+5492932614608',2),('24302022737','Eduardo','Weinzettel','eweinz','1234','eduardoweinz@hotmail.com','+5492932540008',1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-07 20:34:28
