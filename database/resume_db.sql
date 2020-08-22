-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 22, 2020 at 08:26 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `resume_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `educations`
--

CREATE TABLE `educations` (
  `EducationId` varchar(20) NOT NULL COMMENT 'รหัสการศึกษา',
  `EducationsName` varchar(300) NOT NULL COMMENT 'ชื่อการศึกษา',
  `EductionYear` varchar(15) NOT NULL COMMENT 'ปีที่จบ',
  `EducationRef` varchar(20) NOT NULL COMMENT 'อ้างอิงรหัสผู้ใช้',
  `EducationAt` varchar(100) NOT NULL COMMENT 'สถานที่จบการศึกษา'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `experiences`
--

CREATE TABLE `experiences` (
  `ExperienceId` varchar(30) NOT NULL COMMENT 'รหัสประสบการณ์',
  `ExperienceName` varchar(150) NOT NULL COMMENT 'ชื่อประสบการณ์',
  `ExperienceDate` varchar(20) NOT NULL COMMENT 'วันที่ประสบการณ์',
  `ExperienceDisciption` varchar(400) NOT NULL COMMENT 'คำอธิบาย',
  `ExperienceUrl` varchar(200) NOT NULL COMMENT 'URL ดาวโหลดน์เอกสาร',
  `ExperienceStatus` bit(2) NOT NULL COMMENT 'สถานะ',
  `ExperienceImageRef` varchar(30) NOT NULL COMMENT 'อ้างอิงรูปภาพประสบกรณ์'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `imagexperinces`
--

CREATE TABLE `imagexperinces` (
  `ImageExperinId` varchar(30) NOT NULL COMMENT 'รหัสรูปภาพประสบการณ์',
  `ImageExperinName` varchar(100) NOT NULL COMMENT 'ชื่อรูปภาพประสบการณ์',
  `ImageExperinPath` varchar(200) NOT NULL COMMENT 'ที่อยู่',
  `ExperienceImageRef` varchar(30) NOT NULL COMMENT 'อ้างอิงประสบการณ์'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `PhotoId` varchar(40) NOT NULL,
  `PhotoName` varchar(200) NOT NULL,
  `PhotoPath` varchar(200) NOT NULL,
  `UserId` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `SkillId` varchar(40) NOT NULL COMMENT 'รหัสความสามารถ',
  `SkillName` varchar(100) NOT NULL COMMENT 'ชื่อความสามารถ',
  `SkillValue` int(10) NOT NULL COMMENT 'ค่าความสามารถ',
  `SkillRef` varchar(40) NOT NULL COMMENT 'อ้างอิงผู้ใช้'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserId` varchar(30) NOT NULL COMMENT 'รหัสผู้ใช้',
  `UserEmail` varchar(100) NOT NULL COMMENT 'อีเมลล์ผู้ใช้',
  `UserPassword` varchar(50) NOT NULL COMMENT 'รหัสผ่าน',
  `UserFristnane` varchar(100) NOT NULL COMMENT 'ชื่อ',
  `UserLastname` varchar(100) NOT NULL COMMENT 'นามสกุล',
  `UserAge` varchar(3) DEFAULT NULL COMMENT 'อายุ',
  `UserPhoto` varchar(300) DEFAULT NULL COMMENT 'อ้างอิงภาพ',
  `UserTel` varchar(15) DEFAULT NULL COMMENT 'เบอร์โทร',
  `UserFacebook` varchar(50) DEFAULT NULL COMMENT 'เฟสบุ๊ค',
  `UserAbout` varchar(500) DEFAULT NULL COMMENT 'เกี่ยวกับคุณ',
  `EducationRef` varchar(30) NOT NULL COMMENT 'รหัสอ้างอิง',
  `ExperienceRef` varchar(30) NOT NULL COMMENT 'อ้างอิงประสอบการณ์',
  `SkillsRef` varchar(30) NOT NULL COMMENT 'อ้างอิงเทคนิค'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserId`, `UserEmail`, `UserPassword`, `UserFristnane`, `UserLastname`, `UserAge`, `UserPhoto`, `UserTel`, `UserFacebook`, `UserAbout`, `EducationRef`, `ExperienceRef`, `SkillsRef`) VALUES
('20200711144230566ACCJD', 'deltaforce19436@gmail.com', 'asdfgl125.', 'Deltaforce', 'Tankforce', NULL, NULL, NULL, NULL, NULL, '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `educations`
--
ALTER TABLE `educations`
  ADD PRIMARY KEY (`EducationId`);

--
-- Indexes for table `imagexperinces`
--
ALTER TABLE `imagexperinces`
  ADD PRIMARY KEY (`ImageExperinId`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`PhotoId`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`SkillId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserId`),
  ADD UNIQUE KEY `EducationRef` (`EducationRef`),
  ADD UNIQUE KEY `ExperienceRef` (`ExperienceRef`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
