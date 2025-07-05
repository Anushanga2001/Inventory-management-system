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
-- Table structure for table `items01`
--

DROP TABLE IF EXISTS `items01`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items01` (
  `itemNo` int NOT NULL AUTO_INCREMENT,
  `batchNo` int NOT NULL,
  `itemName` varchar(50) NOT NULL,
  `unitPrice` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  `expireDate` date NOT NULL,
  `itemImage` varchar(255) NOT NULL,
  `noOfQuantity` int DEFAULT NULL,
  PRIMARY KEY (`itemNo`,`batchNo`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items01`
--

LOCK TABLES `items01` WRITE;
/*!40000 ALTER TABLE `items01` DISABLE KEYS */;
INSERT INTO `items01` VALUES (24,1,'Cream cracker-400g',300.00,0,'2025-06-02','1717187753573.png',5),(24,2,'Cream cracker-400g',150.00,80,'2024-08-15','1717605858060.png',10),(24,3,'Cream cracker-400g',340.00,0,'2024-07-13','1717616017908.png',5),(25,1,'Chocolate puff-400g',230.00,0,'2024-06-27','1717364295729.png',3),(25,2,'Chocolate puff-400g',230.50,0,'2024-12-25','1717606071485.png',5),(25,3,'Chocolate puff-400g',240.00,35,'2024-10-15','1718209515546.png',10),(28,2,'Tikiri maari-1kg',250.50,0,'2024-11-27','1717436271837.png',5),(28,3,'Tikiri maari-1kg',125.00,15,'2025-01-25','1717537606799.png',5),(28,4,'Tikiri maari-1kg',230.00,3,'2024-06-11','1717578472208.png',5),(37,1,'Manchee nice-400g',330.00,30,'2024-11-07','1718209607212.png',5),(37,2,'Manchee nice-400g',350.00,50,'2024-06-19','1718283165153.png',5),(38,1,'Chocolate biscuit-400g',330.00,40,'2024-11-13','1718212813460.png',10),(38,2,'Chocolate biscuit-400g',350.00,70,'2024-12-14','1718212856166.png',5),(39,1,'Manchee komee-400g',230.00,0,'2024-11-14','1718304909774.jpg',5),(40,1,'Hawayan cookies-400g',230.00,30,'2024-11-21','1718353578732.png',5);
/*!40000 ALTER TABLE `items01` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-05 10:23:44
