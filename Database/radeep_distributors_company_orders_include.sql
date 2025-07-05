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
-- Table structure for table `company_orders_include`
--

DROP TABLE IF EXISTS `company_orders_include`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_orders_include` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderNo` int NOT NULL,
  `itemId` int NOT NULL,
  `itemName` varchar(50) NOT NULL,
  `unitPrice` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  `userID` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_orders_include`
--

LOCK TABLES `company_orders_include` WRITE;
/*!40000 ALTER TABLE `company_orders_include` DISABLE KEYS */;
INSERT INTO `company_orders_include` VALUES (40,41,1,'Hawayan cookies-400g',120.00,1,2),(41,41,2,'Hawayan cookies-800g',250.00,1,2),(42,42,3,'Chocolate biscuit-400g',250.00,1,2),(43,42,4,'Chocolate biscuit-800g',380.00,1,2),(44,43,1,'Hawayan cookies-400g',120.00,2,2),(45,43,4,'Chocolate biscuit-800g',380.00,1,2),(46,44,1,'Hawayan cookies-400g',120.00,10,2),(47,44,8,'Chocolate puff-800g',470.00,7,2),(48,45,1,'Hawayan cookies-400g',120.00,1,2),(49,45,2,'Hawayan cookies-800g',250.00,1,2),(50,45,3,'Chocolate biscuit-400g',250.00,1,2),(51,45,4,'Chocolate biscuit-800g',380.00,1,2),(52,45,5,'Manchee nice-400g',210.00,1,2),(53,45,6,'Manchee nice-800g',350.00,1,2),(54,45,7,'Chocolate puff-400g',290.00,1,2),(55,45,8,'Chocolate puff-800g',470.00,1,2),(56,45,9,'Manchee creame cracker-400g',210.00,1,2),(57,45,10,'Manchee creame cracker-800g',400.00,1,2),(58,46,1,'Hawayan cookies-400g',120.00,23,2),(59,46,3,'Chocolate biscuit-400g',250.00,23,2),(60,47,1,'Hawayan cookies-400g',120.00,10,2),(61,47,4,'Chocolate biscuit-800g',380.00,10,2),(62,48,1,'Hawayan cookies-400g',120.00,1,2),(63,48,9,'Manchee creame cracker-400g',210.00,1,2),(64,49,1,'Hawayan cookies-400g',120.00,2,2),(65,49,3,'Chocolate biscuit-400g',250.00,2,2),(66,50,1,'Hawayan cookies-400g',120.00,2,2),(67,51,1,'Hawayan cookies-400g',120.00,20,2),(68,51,4,'Chocolate biscuit-800g',380.00,12,2),(69,51,9,'Manchee creame cracker-400g',210.00,12,2),(70,52,1,'Hawayan cookies-400g',120.00,120,2),(71,52,3,'Chocolate biscuit-400g',250.00,230,2),(72,52,5,'Manchee nice-400g',210.00,500,2),(73,53,1,'Hawayan cookies-400g',120.00,23,2),(74,53,2,'Hawayan cookies-800g',250.00,1,2),(75,53,4,'Chocolate biscuit-800g',380.00,1,2),(76,54,1,'Hawayan cookies-400g',120.00,10,2),(77,54,3,'Chocolate biscuit-400g',250.00,5,2),(78,55,9,'Manchee creame cracker-400g',210.00,34,2),(79,56,3,'Chocolate biscuit-400g',250.00,23,2),(80,57,1,'Hawayan cookies-400g',120.00,350,2),(81,57,4,'Chocolate biscuit-800g',380.00,340,2),(82,57,8,'Chocolate puff-800g',470.00,400,2),(83,57,10,'Manchee creame cracker-800g',400.00,50,2),(84,58,1,'Hawayan cookies-400g',120.00,20,2),(85,58,3,'Chocolate biscuit-400g',250.00,10,2),(86,58,4,'Chocolate biscuit-800g',380.00,100,2),(87,58,7,'Chocolate puff-400g',290.00,340,2),(88,58,9,'Manchee creame cracker-400g',210.00,10,2),(89,59,1,'Hawayan cookies-400g',120.00,120,2),(90,59,3,'Chocolate biscuit-400g',250.00,300,2),(91,59,7,'Chocolate puff-400g',290.00,400,2),(92,60,1,'Hawayan cookies-400g',120.00,45,2),(93,60,5,'Manchee nice-400g',210.00,50,2),(94,61,1,'Hawayan cookies-400g',120.00,300,2),(95,61,4,'Chocolate biscuit-800g',380.00,500,2),(96,62,1,'Hawayan cookies-400g',120.00,200,2),(97,62,4,'Chocolate biscuit-800g',380.00,150,2);
/*!40000 ALTER TABLE `company_orders_include` ENABLE KEYS */;
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
