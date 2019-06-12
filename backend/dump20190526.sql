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
 SET character_set_client = utf8mb4 ;
CREATE TABLE `attachment` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `filename` varchar(200) NOT NULL,
  `extension` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_attachment_post_id_IDX` (`post_id`),
  CONSTRAINT `fk_attachment_post_id` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
 SET character_set_client = utf8mb4 ;
CREATE TABLE `board` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) DEFAULT NULL COMMENT 'null is for global (company)',
  `name` varchar(45) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `FK_board_circle_id_IDX` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (1,NULL,'company board 1','2019-04-26 09:22:41',NULL),(2,NULL,'company board 2','2019-04-26 09:33:43',NULL),(3,1,'Circle board','2019-04-26 09:33:43',NULL);
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `circle`
--

DROP TABLE IF EXISTS `circle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `circle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `logo` varchar(2000) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `is_exposed` tinyint(4) DEFAULT '1',
  `is_open` tinyint(4) DEFAULT '1',
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `circle`
--

LOCK TABLES `circle` WRITE;
/*!40000 ALTER TABLE `circle` DISABLE KEYS */;
INSERT INTO `circle` VALUES (1,'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png','Game',1,1,'2019-04-26 09:18:07','2019-05-23 09:37:37'),(2,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyerJDza02hybjwJ-XVQq8SM3EtpGgYd9eGkUXEP2kL-8edIsvsQ','Soccer',1,1,'2019-05-23 09:44:49',NULL),(3,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBnRR5vsQGHplEZXeYhhhwE1nqb8rkSjF9LXtCrFojoqQUVyMQRQ','Baseball',1,1,'2019-05-23 09:44:49',NULL),(4,'https://www.designevo.com/res/templates/thumb_small/brown-woman-head-and-pink-leaf.png','Golf',1,1,'2019-05-23 09:44:49',NULL),(5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjKLtvtbUxE61JYnAEarXpOLu9JPpqqeRtq3_Q1DK4VS3GluYqeA','Movie',1,1,'2019-05-23 09:44:49',NULL),(6,'https://about.canva.com/wp-content/uploads/sites/3/2016/08/Beauty-Logo.png','Reading',1,1,'2019-05-23 09:44:49',NULL),(7,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDTHuWEt18wjrzI_e2Jf7UM-RX_pAdWIqUVgPXaCun7Pzchwc2','Band',1,1,'2019-05-23 09:44:49',NULL),(8,'https://static.toiimg.com/thumb/msid-65299403,imgsize-52460,width-400,resizemode-4/65299403.jpg','Extra',1,1,'2019-05-23 09:44:49',NULL);
/*!40000 ALTER TABLE `circle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `content` tinytext NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_comment_post_id_IDX` (`post_id`) /*!80000 INVISIBLE */,
  KEY `FK_comment_comment_id_IDX` (`group_id`),
  KEY `FK_comment_user_id` (`user_id`),
  CONSTRAINT `FK_comment_comment_id` FOREIGN KEY (`group_id`) REFERENCES `comment` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_comment_post_id` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_comment_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (11,18,3,NULL,'Global comment 1','2019-05-10 10:02:36',NULL),(12,18,16,11,'Subcomment 1-1','2019-05-10 10:02:36',NULL),(13,18,4,NULL,'Global comment 2','2019-05-10 10:02:36',NULL),(15,18,16,13,'Subcomment 2-1-1','2019-05-10 10:03:53',NULL),(16,18,3,13,'Subcomment 2-1','2019-05-10 10:06:53',NULL),(17,18,18,NULL,'Global Test','2019-05-21 07:51:58',NULL),(19,18,18,NULL,'Hel','2019-05-21 07:53:19',NULL),(22,18,18,12,'Sub1-1-1','2019-05-21 07:54:16',NULL),(23,18,18,NULL,'NEW','2019-05-21 08:05:04',NULL),(25,18,18,13,'G2-1','2019-05-23 06:17:07',NULL),(35,18,18,NULL,'1234','2019-05-23 08:54:31',NULL),(36,18,18,NULL,'444','2019-05-23 08:55:28',NULL),(37,18,18,NULL,'44415','2019-05-23 08:55:59',NULL),(38,18,18,NULL,'415','2019-05-23 08:56:22',NULL),(39,18,18,NULL,'555555','2019-05-23 08:57:11',NULL),(40,18,18,NULL,'77','2019-05-23 08:59:40',NULL),(46,18,18,NULL,'555','2019-05-23 09:18:07',NULL);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `logo` varchar(2000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (0,'TEST','https://www.freelogodesign.org/Content/img/logo-ex-7.png');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `company_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `FK_dept_company_IDX` (`company_id`),
  KEY `FK_dept_dept_IDX` (`parent_id`),
  CONSTRAINT `FK_dept_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_dept_dept` FOREIGN KEY (`parent_id`) REFERENCES `department` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (2,NULL,0,'dept 1'),(5,2,0,'dept 1-A'),(6,2,0,'dept 1-B'),(7,NULL,0,'dept 2');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mailbox`
--

DROP TABLE IF EXISTS `mailbox`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `mailbox` (
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `note_id` int(11) NOT NULL,
  PRIMARY KEY (`sender_id`,`receiver_id`,`note_id`),
  KEY `FK_mailbox_Note_id_IDX` (`note_id`) /*!80000 INVISIBLE */,
  KEY `FK_mailbox_Receiver_id` (`receiver_id`),
  CONSTRAINT `FK_mailbox_Note_id` FOREIGN KEY (`note_id`) REFERENCES `note` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_mailbox_Receiver_id` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_mailbox_Sender_id` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
 SET character_set_client = utf8mb4 ;
CREATE TABLE `membership` (
  `user_id` int(11) NOT NULL,
  `circle_id` int(11) NOT NULL,
  `role` int(11) DEFAULT NULL,
  `date_registered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`circle_id`),
  KEY `FK_membership_circle_id_IDX` (`circle_id`) /*!80000 INVISIBLE */,
  KEY `FK_membership_user_id_IDX` (`user_id`),
  CONSTRAINT `FK_Membership_Circle_id` FOREIGN KEY (`circle_id`) REFERENCES `circle` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Membership_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membership`
--

LOCK TABLES `membership` WRITE;
/*!40000 ALTER TABLE `membership` DISABLE KEYS */;
INSERT INTO `membership` VALUES (3,1,NULL,'2019-04-26 09:22:41'),(18,1,NULL,'2019-05-25 16:22:36'),(18,7,NULL,'2019-05-25 16:25:17');
/*!40000 ALTER TABLE `membership` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `note`
--

DROP TABLE IF EXISTS `note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` tinytext NOT NULL,
  `content` text NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
 SET character_set_client = utf8mb4 ;
CREATE TABLE `oauth2_0` (
  `id` int(11) NOT NULL,
  `sns_id` varchar(45) NOT NULL,
  `sns_type` varchar(45) DEFAULT NULL,
  `sns_date_connected` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_oauth_user_id` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
 SET character_set_client = utf8mb4 ;
CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `board_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` tinytext NOT NULL,
  `content` text NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_post_user_id_IDX` (`user_id`),
  KEY `FK_post_board_id_IDX` (`board_id`),
  CONSTRAINT `FK_post_board_id` FOREIGN KEY (`board_id`) REFERENCES `board` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_post_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (5,1,3,'post 1-2','456 Hello','2019-04-26 09:32:31',NULL),(7,2,3,'post 2-1','Hello 789','2019-04-26 09:33:43',NULL),(8,2,3,'post 2-2','ABC Hello','2019-04-26 09:33:43',NULL),(10,3,3,'post C-2','CCC Hello','2019-04-26 09:33:43',NULL),(11,1,3,'Sample','New text','2019-04-28 12:29:41',NULL),(12,1,3,'Just a post','2019-04-28 21:25, by postman','2019-04-28 12:30:31',NULL),(18,2,16,'Rework on backend','+new: OAuth2.0 via PassportJS\n-delete: JWT','2019-05-10 09:59:45',NULL),(19,1,4,'notice!','just a post','2019-05-12 07:07:40',NULL),(20,1,3,'soft-reload','test','2019-05-17 13:30:28',NULL),(21,1,16,'soft-reload 2','test 2','2019-05-17 13:37:00',NULL),(22,1,16,'soft-reload 3-update','test 3','2019-05-17 13:45:10','2019-05-17 14:19:19'),(23,1,4,'bbb','a','2019-05-17 14:21:09','2019-05-17 14:21:24');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dept_id` int(11) DEFAULT NULL,
  `profile` varchar(500) DEFAULT NULL,
  `position` varchar(45) DEFAULT NULL,
  `account` varchar(45) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `nickname` varchar(45) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(16) DEFAULT NULL,
  `gender` char(1) DEFAULT NULL COMMENT '1 = Male, 0 = Female',
  `age` decimal(3,0) DEFAULT NULL,
  `config` json DEFAULT NULL,
  `salt` varchar(100) DEFAULT NULL,
  `is_disabled` tinyint(1) NOT NULL DEFAULT '0',
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_disabled` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account_UNIQUE` (`account`),
  UNIQUE KEY `nickname_UNIQUE` (`nickname`),
  KEY `FK_user_dept_id_IDX` (`dept_id`),
  CONSTRAINT `FK_user_dept_id` FOREIGN KEY (`dept_id`) REFERENCES `department` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (3,2,'https://image.shutterstock.com/image-photo/glitter-vintage-lights-background-gold-260nw-226746934.jpg','Pos-1','Knossos','XhZZ//iFq37EpBTn/R7OSRkkXmsHadfTyoEadgecRFBZ9zpiRwxcxioUhcvzRtUotuOxHlUK0ZNxPQNRtoyTLA==',NULL,'dldbcks95@naver.com','이유찬','M',25,NULL,'P/yj/kKLzydfnRmi41PPTEZnP7CPoJxJ+dpLfwt1DIkLGIwZah7ghkkoPPq61Ubmrimc7mQrtZaQLg79jm0tKg==',0,'2019-04-15 08:35:58',NULL),(4,5,'https://image.shutterstock.com/image-photo/glitter-vintage-lights-background-gold-260nw-226746934.jpg','Pos-2','Lanesto','eve2Ck68OGEzs1oGjhPkYBjhqeh4KB+tZMqt0yU8cDmcIGpLZpJgUCt9X8VNfIBdgDaoy3F/hteZD/D/bUhJog==',NULL,'dldbcks95@naver.com','이유찬','M',25,NULL,'/CwNnKsahhf15HqAc4EpmK55tRbl+TZaSdN507U4x40NBIc1e4l8ySW+eIt4bQXZCyaD21LNNVjBQR58YQO+Lg==',0,'2019-05-05 06:39:40',NULL),(16,2,NULL,NULL,'Nuex','uP7yD1zIkJ6RsheOR7ln03DSqJ35yxOFLMBD1xPs99wN97dDTpAja+WsJEDWVgBxxyliGtBIm8/CBBPtoVnabA==',NULL,'nuex@nuex.nuex','JUC','1',25,NULL,'ZvAMHH/NhHFI+oE2C/DcBCXaapK4ckOjOqjHQDZzkASllDs9/1FDC7nQYse5YbceRjcIfXVJaGGXL2gX3PvFMg==',0,'2019-05-10 09:42:53',NULL),(18,2,NULL,NULL,NULL,NULL,'Knossos',NULL,NULL,NULL,NULL,NULL,NULL,0,'2019-05-12 03:09:23',NULL),(19,2,NULL,NULL,NULL,NULL,'이유찬',NULL,NULL,NULL,NULL,NULL,NULL,0,'2019-05-12 03:09:59',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `widget`
--

DROP TABLE IF EXISTS `widget`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `widget` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `icon` varchar(2000) NOT NULL,
  `filename` varchar(200) NOT NULL,
  `extension` varchar(10) NOT NULL,
  `integrity` varchar(1000) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `filename_UNIQUE` (`filename`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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

-- Dump completed on 2019-05-26  1:40:13
