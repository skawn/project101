-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2020 at 05:47 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gestionart`
--

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

CREATE TABLE `article` (
  `IDArticle` int(11) NOT NULL,
  `Libele` varchar(100) NOT NULL,
  `Echeance` date DEFAULT NULL,
  `Qte` int(11) NOT NULL,
  `NomCategorie` varchar(100) NOT NULL,
  `NomCompagne` varchar(100) NOT NULL,
  `Prix` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `article`
--

INSERT INTO `article` (`IDArticle`, `Libele`, `Echeance`, `Qte`, `NomCategorie`, `NomCompagne`, `Prix`) VALUES
(1, 'Computer1', '2000-01-01', 1, 'Hardware', 'DELL', 1),
(3, 'Computer3', '2000-01-01', 1, 'Hardware', 'DELL', 1),
(5, 'Computer5', '2000-01-01', 1, 'Hardware', 'DELL', 1),
(6, 'Computer6', '2000-01-01', 1, 'Hardware', 'DELL', 1),
(40, 'Computer15', '2000-01-01', 1, 'Hardware', 'DELL', 1),
(9, 'Computer9', '2000-01-01', 1, 'Hardware', 'DELL', 1),
(10, 'Computer10', '2000-01-01', 1, 'Hardware', 'DELL', 1),
(11, 'Computer11', '2000-01-01', 1, 'Hardware', 'DELL', 1),
(12, 'Computer12', '2000-01-01', 1, 'Hardware', 'DELL', 1),
(14, 'Computer14', '2000-01-01', 1, 'Hardware', 'DELL', 1),
(41, 'Computer16', '2000-01-01', 1, 'Hardware', 'DELL', 1),
(42, 'Computer17', '2000-01-01', 1, 'Hardware', 'DELL', 1),
(43, 'Computer18', '2000-01-01', 1, 'Hardware', 'DELL', 1),
(63, 'Computer22', '2000-01-01', 1, 'Hardware', 'DELL', 1),
(52, 'Computer20', '2000-01-01', 1, 'Hardware', 'DELL', 1);

-- --------------------------------------------------------

--
-- Table structure for table `categorie`
--

CREATE TABLE `categorie` (
  `NomCategorie` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categorie`
--

INSERT INTO `categorie` (`NomCategorie`) VALUES
('Hardware'),
('Software');

-- --------------------------------------------------------

--
-- Table structure for table `compagne`
--

CREATE TABLE `compagne` (
  `NomCompagne` varchar(100) NOT NULL,
  `NomCategorie` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `compagne`
--

INSERT INTO `compagne` (`NomCompagne`, `NomCategorie`) VALUES
('Machintosh', 'Hardware'),
('Lenovo', 'Hardware'),
('Windows', 'Software'),
('DELL', 'Hardware'),
('Hp', 'Hardware'),
('Asus', 'Hardware');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(1, 'admin@gmail.com', '8cb2237d0679ca88db6464eac60da96345513964');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`IDArticle`),
  ADD KEY `NomCompagne` (`NomCompagne`),
  ADD KEY `NomCategorie` (`NomCategorie`);

--
-- Indexes for table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`NomCategorie`);

--
-- Indexes for table `compagne`
--
ALTER TABLE `compagne`
  ADD PRIMARY KEY (`NomCompagne`),
  ADD KEY `NomCategorie` (`NomCategorie`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `article`
--
ALTER TABLE `article`
  MODIFY `IDArticle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
