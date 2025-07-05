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
-- Table structure for table `shop_orders1`
--

DROP TABLE IF EXISTS `shop_orders1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shop_orders1` (
  `orderNo` int NOT NULL AUTO_INCREMENT,
  `orderDate` date NOT NULL,
  `shopName` varchar(20) NOT NULL,
  `address` varchar(50) NOT NULL,
  `userID` int DEFAULT NULL,
  PRIMARY KEY (`orderNo`)
) ENGINE=InnoDB AUTO_INCREMENT=173 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop_orders1`
--

LOCK TABLES `shop_orders1` WRITE;
/*!40000 ALTER TABLE `shop_orders1` DISABLE KEYS */;
INSERT INTO `shop_orders1` VALUES (135,'2024-06-05','gg stores','kandy',3),(136,'2024-06-05','sadani stores','kandy',3),(137,'2024-06-05','HG stores','akd',3),(143,'2024-06-05','55','55',3),(148,'2024-06-06','ffff','fff',3),(150,'2024-06-06','test2','test2',3),(162,'2024-06-12','Arawwala stores','Yatiyantota',3),(163,'2024-06-12','JK stores','Yatiyantota',3),(164,'2024-06-13','Purna stores','Kelaniya',3),(165,'2024-06-13','JJ stores','Yatiyantota',3),(166,'2024-06-14','Saman stores','Kandy',3),(167,'2024-07-18','Saman stores','Kegalle',3),(168,'2024-07-18','Gamini stores','Ruwanwella',3),(169,'2024-07-31','NEW TJ stores','Hamanda',3),(170,'2024-07-31','TIK stores','yatiyantota',3),(171,'2024-08-27','Kaml stores','dehowita',3),(172,'2024-09-18','Ak stores','kandy',3);
/*!40000 ALTER TABLE `shop_orders1` ENABLE KEYS */;
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
