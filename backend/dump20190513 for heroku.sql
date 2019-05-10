-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: dev
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attachment`
--

DROP TABLE IF EXISTS `attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `attachment` (
  `ID` int(11) NOT NULL,
  `PostID` int(11) NOT NULL,
  `FileName` varchar(200) NOT NULL,
  `Extension` varchar(10) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_Attachment_Post_ID_idx` (`PostID`),
  CONSTRAINT `FK_Attachment_Post_ID` FOREIGN KEY (`PostID`) REFERENCES `post` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attachment`
--

LOCK TABLES `attachment` WRITE;
/*!40000 ALTER TABLE `attachment` DISABLE KEYS */;
/*!40000 ALTER TABLE `attachment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `board` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `GroupID` int(11) DEFAULT NULL COMMENT 'null is for global (company)',
  `Name` varchar(45) NOT NULL,
  `Date_Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Name_UNIQUE` (`Name`),
  KEY `FK_Board_Circle_ID_idx` (`GroupID`),
  CONSTRAINT `FK_Board_Circle_ID` FOREIGN KEY (`GroupID`) REFERENCES `circle` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (1,NULL,'Company Board 1','2019-04-26 09:22:41'),(2,NULL,'Company Board 2','2019-04-26 09:33:43'),(3,1,'Circle Board','2019-04-26 09:33:43');
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `circle`
--

DROP TABLE IF EXISTS `circle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `circle` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `Date_Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Name_UNIQUE` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `circle`
--

LOCK TABLES `circle` WRITE;
/*!40000 ALTER TABLE `circle` DISABLE KEYS */;
INSERT INTO `circle` VALUES (1,'Game','2019-04-26 09:18:07');
/*!40000 ALTER TABLE `circle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `comment` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PostID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `GroupID` int(11) DEFAULT NULL,
  `Content` tinytext NOT NULL,
  `Date_Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `FK_Comment_Post_ID_idx` (`PostID`) /*!80000 INVISIBLE */,
  KEY `FK_Comment_Comment_ID_idx` (`GroupID`),
  KEY `FK_Comment_User_ID` (`UserID`),
  CONSTRAINT `FK_Comment_Comment_ID` FOREIGN KEY (`GroupID`) REFERENCES `comment` (`ID`) ON UPDATE CASCADE,
  CONSTRAINT `FK_Comment_Post_ID` FOREIGN KEY (`PostID`) REFERENCES `post` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Comment_User_ID` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (11,18,3,NULL,'Global Comment 1','2019-05-10 10:02:36'),(12,18,16,11,'Subcomment 1-1','2019-05-10 10:02:36'),(13,18,4,NULL,'Global Comment 2','2019-05-10 10:02:36'),(15,18,16,13,'Subcomment 2-1-1','2019-05-10 10:03:53'),(16,18,3,13,'Subcomment 2-1','2019-05-10 10:06:53');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `company` (
  `ID` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Logo` varchar(2000) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (0,'TEST','');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `department` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ParentID` int(11) DEFAULT NULL,
  `CompanyID` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Name_UNIQUE` (`Name`),
  KEY `FK_Dept_Company_idx` (`CompanyID`),
  KEY `FK_Dept_Dept_idx` (`ParentID`),
  CONSTRAINT `FK_Dept_Company` FOREIGN KEY (`CompanyID`) REFERENCES `company` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_Dept_Dept` FOREIGN KEY (`ParentID`) REFERENCES `department` (`ID`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (2,NULL,0,'Dept 1'),(5,2,0,'Dept 1-A'),(6,2,0,'Dept 1-B'),(7,NULL,0,'Dept 2');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mailbox`
--

DROP TABLE IF EXISTS `mailbox`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `mailbox` (
  `SenderID` int(11) NOT NULL,
  `ReceiverID` int(11) NOT NULL,
  `NoteID` int(11) NOT NULL,
  PRIMARY KEY (`SenderID`,`ReceiverID`,`NoteID`),
  KEY `FK_Mailbox_Note_ID_idx` (`NoteID`) /*!80000 INVISIBLE */,
  KEY `FK_Mailbox_Receiver_ID` (`ReceiverID`),
  CONSTRAINT `FK_Mailbox_Note_ID` FOREIGN KEY (`NoteID`) REFERENCES `note` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `FK_Mailbox_Receiver_ID` FOREIGN KEY (`ReceiverID`) REFERENCES `user` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `FK_Mailbox_Sender_ID` FOREIGN KEY (`SenderID`) REFERENCES `user` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mailbox`
--

LOCK TABLES `mailbox` WRITE;
/*!40000 ALTER TABLE `mailbox` DISABLE KEYS */;
/*!40000 ALTER TABLE `mailbox` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membership`
--

DROP TABLE IF EXISTS `membership`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `membership` (
  `UserID` int(11) NOT NULL,
  `CircleID` int(11) NOT NULL,
  `Date_Registered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`UserID`,`CircleID`),
  KEY `FK_Membership_Circle_ID_idx` (`CircleID`) /*!80000 INVISIBLE */,
  KEY `FK_Membership_User_ID_idx` (`UserID`),
  CONSTRAINT `FK_Membership_Circle_ID` FOREIGN KEY (`CircleID`) REFERENCES `circle` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Membership_User_ID` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membership`
--

LOCK TABLES `membership` WRITE;
/*!40000 ALTER TABLE `membership` DISABLE KEYS */;
INSERT INTO `membership` VALUES (3,1,'2019-04-26 09:22:41');
/*!40000 ALTER TABLE `membership` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `note`
--

DROP TABLE IF EXISTS `note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `note` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` tinytext NOT NULL,
  `Content` text NOT NULL,
  `Date_Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note`
--

LOCK TABLES `note` WRITE;
/*!40000 ALTER TABLE `note` DISABLE KEYS */;
/*!40000 ALTER TABLE `note` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_0`
--

DROP TABLE IF EXISTS `oauth2_0`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `oauth2_0` (
  `ID` int(11) NOT NULL,
  `SNS_ID` varchar(45) NOT NULL,
  `SNS_Type` varchar(45) DEFAULT NULL,
  `SNS_ConnectDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  CONSTRAINT `FK_oauth_user_id` FOREIGN KEY (`ID`) REFERENCES `user` (`ID`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_0`
--

LOCK TABLES `oauth2_0` WRITE;
/*!40000 ALTER TABLE `oauth2_0` DISABLE KEYS */;
INSERT INTO `oauth2_0` VALUES (18,'59189913','naver','2019-05-12 03:09:23'),(19,'1081793101','kakao','2019-05-12 03:09:59');
/*!40000 ALTER TABLE `oauth2_0` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `post` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `BoardID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Title` tinytext NOT NULL,
  `Content` text NOT NULL,
  `Date_Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `FK_Post_User_ID_idx` (`UserID`),
  KEY `FK_Post_Board_ID_idx` (`BoardID`),
  CONSTRAINT `FK_Post_Board_ID` FOREIGN KEY (`BoardID`) REFERENCES `board` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Post_User_ID` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (5,1,3,'Post 1-2','456 Hello','2019-04-26 09:32:31'),(7,2,3,'Post 2-1','Hello 789','2019-04-26 09:33:43'),(8,2,3,'Post 2-2','ABC Hello','2019-04-26 09:33:43'),(10,3,3,'Post C-2','CCC Hello','2019-04-26 09:33:43'),(11,1,3,'Sample','New text','2019-04-28 12:29:41'),(12,1,3,'Just a post','2019-04-28 21:25, by Postman','2019-04-28 12:30:31'),(18,2,16,'Rework on backend','+new: OAuth2.0 via PassportJS\n-delete: JWT','2019-05-10 09:59:45'),(19,1,4,'notice!','just a post','2019-05-12 07:07:40');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `user` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DeptID` int(11) DEFAULT NULL,
  `Account` varchar(45) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `Nickname` varchar(45) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Name` varchar(16) DEFAULT NULL,
  `Gender` char(1) DEFAULT NULL COMMENT '1 = Male, 0 = Female',
  `Age` decimal(3,0) DEFAULT NULL,
  `Config` text DEFAULT NULL,
  `Salt` varchar(100) DEFAULT NULL,
  `IsDisabled` tinyint(1) NOT NULL DEFAULT '0',
  `Date_Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Date_Disabled` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Account_UNIQUE` (`Account`),
  UNIQUE KEY `Nickname_UNIQUE` (`Nickname`),
  KEY `FK_User_Dept_ID_idx` (`DeptID`),
  CONSTRAINT `FK_User_Dept_ID` FOREIGN KEY (`DeptID`) REFERENCES `department` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (3,NULL,'Knossos','XhZZ//iFq37EpBTn/R7OSRkkXmsHadfTyoEadgecRFBZ9zpiRwxcxioUhcvzRtUotuOxHlUK0ZNxPQNRtoyTLA==',NULL,'dldbcks95@naver.com','이유찬','M',25,NULL,'P/yj/kKLzydfnRmi41PPTEZnP7CPoJxJ+dpLfwt1DIkLGIwZah7ghkkoPPq61Ubmrimc7mQrtZaQLg79jm0tKg==',0,'2019-04-15 08:35:58',NULL),(4,NULL,'Lanesto','eve2Ck68OGEzs1oGjhPkYBjhqeh4KB+tZMqt0yU8cDmcIGpLZpJgUCt9X8VNfIBdgDaoy3F/hteZD/D/bUhJog==',NULL,'dldbcks95@naver.com','이유찬','M',25,NULL,'/CwNnKsahhf15HqAc4EpmK55tRbl+TZaSdN507U4x40NBIc1e4l8ySW+eIt4bQXZCyaD21LNNVjBQR58YQO+Lg==',0,'2019-05-05 06:39:40',NULL),(16,NULL,'Nuex','uP7yD1zIkJ6RsheOR7ln03DSqJ35yxOFLMBD1xPs99wN97dDTpAja+WsJEDWVgBxxyliGtBIm8/CBBPtoVnabA==',NULL,'nuex@nuex.nuex','JUC','1',25,NULL,'ZvAMHH/NhHFI+oE2C/DcBCXaapK4ckOjOqjHQDZzkASllDs9/1FDC7nQYse5YbceRjcIfXVJaGGXL2gX3PvFMg==',0,'2019-05-10 09:42:53',NULL),(18,NULL,NULL,NULL,'Knossos',NULL,NULL,NULL,NULL,NULL,NULL,0,'2019-05-12 03:09:23',NULL),(19,NULL,NULL,NULL,'이유찬',NULL,NULL,NULL,NULL,NULL,NULL,0,'2019-05-12 03:09:59',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `widget`
--

DROP TABLE IF EXISTS `widget`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8 ;
CREATE TABLE `widget` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `WidgetName` varchar(45) NOT NULL,
  `Icon` varchar(2000) NOT NULL,
  `Tags` text NOT NULL,
  `FileName` varchar(200) NOT NULL,
  `Extension` varchar(10) NOT NULL,
  `Integrity` varchar(1000) NOT NULL,
  `Date_Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `FileName_UNIQUE` (`FileName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `widget`
--

LOCK TABLES `widget` WRITE;
/*!40000 ALTER TABLE `widget` DISABLE KEYS */;
/*!40000 ALTER TABLE `widget` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-13 20:50:34
