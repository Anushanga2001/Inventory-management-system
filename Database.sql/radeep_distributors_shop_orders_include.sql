-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: radeep_distributors
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `shop_orders_include`
--

DROP TABLE IF EXISTS `shop_orders_include`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shop_orders_include` (
  `orderNo` int NOT NULL,
  `itemNo` int NOT NULL,
  `itemName` varchar(50) NOT NULL,
  `unitPrice` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `batchNo` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orderNo` (`orderNo`,`itemNo`,`id`),
  KEY `itemNo` (`itemNo`),
  CONSTRAINT `shop_orders_include_ibfk_1` FOREIGN KEY (`orderNo`) REFERENCES `shop_orders1` (`orderNo`) ON DELETE CASCADE,
  CONSTRAINT `shop_orders_include_ibfk_2` FOREIGN KEY (`itemNo`) REFERENCES `items01` (`itemNo`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=227 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop_orders_include`
--

LOCK TABLES `shop_orders_include` WRITE;
/*!40000 ALTER TABLE `shop_orders_include` DISABLE KEYS */;
INSERT INTO `shop_orders_include` VALUES (135,25,'Chocolate puff-400g',230.50,1,127,2),(136,25,'Chocolate puff-400g',230.50,9,130,2),(137,25,'Chocolate puff-400g',230.50,10,133,2),(143,25,'Chocolate puff-400g',230.50,20,145,2),(148,25,'Chocolate puff-400g',230.50,1,158,2),(150,25,'Chocolate puff-400g',230.50,9,165,2),(162,24,'Cream cracker-400g',300.00,23,185,1),(162,25,'Chocolate puff-400g',230.00,12,186,1),(162,37,'Manchee nice-400g',330.00,10,187,1),(163,24,'Cream cracker-400g',300.00,7,188,1),(163,28,'Tikiri maari-1kg',250.50,3,189,2),(163,28,'Tikiri maari-1kg',125.00,5,190,3),(163,37,'Manchee nice-400g',330.00,10,191,1),(163,38,'Chocolate biscuit-400g',330.00,30,192,1),(164,24,'Cream cracker-400g',300.00,20,193,1),(164,25,'Chocolate puff-400g',230.00,8,194,1),(164,38,'Chocolate biscuit-400g',330.00,5,195,1),(165,24,'Cream cracker-400g',300.00,10,196,1),(165,28,'Tikiri maari-1kg',125.00,15,197,3),(165,37,'Manchee nice-400g',330.00,10,198,1),(165,38,'Chocolate biscuit-400g',330.00,5,199,1),(166,24,'Cream cracker-400g',300.00,10,200,1),(166,25,'Chocolate puff-400g',230.00,5,201,1),(166,28,'Tikiri maari-1kg',125.00,50,202,3),(166,37,'Manchee nice-400g',330.00,10,203,1),(166,38,'Chocolate biscuit-400g',330.00,10,204,1),(167,24,'Cream cracker-400g',300.00,75,205,1),(167,25,'Chocolate puff-400g',230.00,10,206,1),(167,28,'Tikiri maari-1kg',125.00,30,207,3),(167,38,'Chocolate biscuit-400g',330.00,40,208,1),(168,24,'Cream cracker-400g',300.00,15,209,1),(168,25,'Chocolate puff-400g',230.00,15,210,1),(168,28,'Tikiri maari-1kg',125.00,30,211,3),(168,37,'Manchee nice-400g',330.00,25,212,1),(168,40,'Hawayan cookies-400g',230.00,20,213,1),(169,24,'Cream cracker-400g',300.00,50,214,1),(169,25,'Chocolate puff-400g',240.00,20,215,3),(169,28,'Tikiri maari-1kg',125.00,5,216,3),(169,37,'Manchee nice-400g',330.00,35,217,1),(169,38,'Chocolate biscuit-400g',330.00,50,218,1),(170,24,'Cream cracker-400g',300.00,30,219,1),(170,25,'Chocolate puff-400g',240.00,40,220,3),(170,38,'Chocolate biscuit-400g',330.00,60,221,1),(171,24,'Cream cracker-400g',300.00,10,222,1),(171,24,'Cream cracker-400g',150.00,10,223,2),(172,24,'Cream cracker-400g',150.00,10,224,2),(172,25,'Chocolate puff-400g',240.00,5,225,3),(172,37,'Manchee nice-400g',330.00,20,226,1);
/*!40000 ALTER TABLE `shop_orders_include` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-05 10:23:43
