-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 20, 2021 lúc 02:55 AM
-- Phiên bản máy phục vụ: 10.4.22-MariaDB
-- Phiên bản PHP: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `aled`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `author`
--

CREATE TABLE `author` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `education` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `author`
--

INSERT INTO `author` (`id`, `name`, `description`, `image`, `education`) VALUES
(1, 'quang vinh', 'ssassa', 'https://i.imgur.com/UaGrkn3.jpg', 'ssasasa'),
(106, 'Thầy tùng', 'FPT', 'https://i.imgur.com/UaGrkn3.jpg', 'FPT');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `author_skill`
--

CREATE TABLE `author_skill` (
  `id` int(11) NOT NULL,
  `skill` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `author_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `image` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'iphone'),
(3, 'xiaomi');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `contentqa`
--

CREATE TABLE `contentqa` (
  `id` int(11) NOT NULL,
  `qa_id` int(11) NOT NULL,
  `people` int(11) NOT NULL,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `contentqa`
--

INSERT INTO `contentqa` (`id`, `qa_id`, `people`, `content`, `create_date`) VALUES
(25, 15, 0, 'hoc sinh user_id 106 nhan lan 1', '2021-12-20 01:52:39'),
(26, 16, 0, 'hoc sinh user_id 1 nhan lan 1', '2021-12-20 01:53:11'),
(27, 15, 1, 'thay giao rep user_id 106 nhan lan 1', '2021-12-20 01:54:26'),
(28, 15, 1, 'thay giao rep user_id 106 nhan lan 2', '2021-12-20 01:54:29');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `course_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `image` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `course`
--

INSERT INTO `course` (`id`, `course_name`, `price`, `image`, `description`, `status`, `users_id`, `author_id`, `category_id`, `type`) VALUES
(1, 'sâsaas', 211221, 'https://i.imgur.com/AutFUMt.jpg', 'học chuẩn 1', 1, 1, 1, 1, 'image/png'),
(2, 'ok', 1234, 'https://i.imgur.com/AutFUMt.jpg', 'okla', 1, 1, 1, 1, 'image/png'),
(5, 'test11', 12, 'https://i.imgur.com/AutFUMt.jpg', 'hay hay', 1, 1, 1, 1, 'image/jpeg'),
(6, 'vinh ok', 1, 'https://i.imgur.com/AutFUMt.jpg', '11', 1, 2, 1, 3, 'image/jpeg'),
(7, 'Course', 1, 'https://i.imgur.com/AutFUMt.jpg', 'Course ', 1, 106, 1, 1, 'image/jpeg'),
(14, 'test price', 123, 'http://localhost:8080/api/file/image?videoName=1639630605948.jpg', 'a', 1, 106, 106, 3, 'image/jpeg'),
(19, '1', 0, 'http://localhost:8080/api/file/image?videoName=1639740856070.jpg', '1', 0, 106, 106, 1, 'image/jpeg'),
(20, 'test', 0, 'http://localhost:8080/api/file/image?videoName=1639740912883.jpg', 'test', 0, 106, 106, 1, 'image/jpeg'),
(21, 'a', 123, 'http://localhost:8080/api/file/image?videoName=1639740933175.jpg', 'a', 0, 106, 106, 1, 'image/jpeg'),
(22, '123', 0, 'http://localhost:8080/api/file/image?videoName=1639740946706.jpg', ' 123', 0, 106, 106, 1, 'image/jpeg'),
(23, '123', 123, 'http://localhost:8080/api/file/image?videoName=1639740963499.jpg', 'a', 0, 106, 106, 1, 'image/jpeg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `favorite`
--

CREATE TABLE `favorite` (
  `id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `favorite`
--

INSERT INTO `favorite` (`id`, `status`, `user_id`, `course_id`) VALUES
(31, 1, 106, 7),
(32, 1, 106, 6),
(33, 1, 106, 14);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(112);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lession`
--

CREATE TABLE `lession` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `link_video` varchar(2555) NOT NULL,
  `section_id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `lession`
--

INSERT INTO `lession` (`id`, `name`, `link_video`, `section_id`, `type`, `status`) VALUES
(79, 'video 2', 'http://localhost:8080/api/file/video?videoName=1636213992629.webm', 24, 'video/webm', 1),
(80, 'test', 'http://localhost:8080/api/file/video?videoName=1636035270719.mp4', 10, 'video/webm', 0),
(81, 'video 2', 'http://localhost:8080/api/file/video?videoName=1636362697384.mp4', 8, 'video/mp4', 0),
(82, 'video 22', 'http://localhost:8080/api/file/video?videoName=1636362727667.webm', 10, 'video/webm', 0),
(84, 'video 1', 'http://localhost:8080/api/file/video?videoName=1638455299614.mp4', 5, 'video/mp4', 1),
(85, 'video 1', 'http://localhost:8080/api/file/video?videoName=1638455310046.mp4', 6, 'video/mp4', 0),
(86, 'video 1.1', 'http://localhost:8080/api/file/video?videoName=1638455348305.mp4', 11, 'video/mp4', 0),
(91, 'ok1', 'http://localhost:8080/api/file/video?videoName=1639061152048.mp4', 25, 'video/mp4', 0),
(92, 'video 2', 'http://localhost:8080/api/file/video?videoName=1639063530404.mp4', 5, 'video/mp4', 0),
(93, 'Lesson 1', 'http://localhost:8080/api/file/video?videoName=1639537023161.mp4', 26, 'video/mp4', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `mycourse`
--

CREATE TABLE `mycourse` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `mycourse`
--

INSERT INTO `mycourse` (`id`, `user_id`, `course_id`) VALUES
(95, 1, 1),
(96, 1, 2),
(97, 106, 1),
(99, 2, 1),
(100, 1, 1),
(101, 104, 2),
(102, 104, 6),
(103, 104, 5),
(104, 104, 7);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `note`
--

CREATE TABLE `note` (
  `id` int(11) NOT NULL,
  `lession_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `note` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `monny` int(255) NOT NULL,
  `bank` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `mota` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `create_date`, `monny`, `bank`, `mota`, `status`) VALUES
(4, 1, '2021-11-10 00:00:00', 19920000, 'NCB', 'mua hang vippro', 0),
(5, 1, '2021-11-19 00:00:00', 199320000, 'NCB', 'thanh toan khoa hoc', 0),
(6, 1, '2021-11-19 00:00:00', 25000000, 'NCB', 'thanh toan khoa hoc', 0),
(7, 1, '2021-11-19 00:00:00', 25000000, 'VNPAY', 'thanh toan khoa hoc', 24),
(8, 1, '2021-11-19 00:00:00', 99000000, 'NCB', 'mua kh?a h?c ok vinh', 0),
(9, 1, '2021-11-19 00:00:00', 99000000, 'NCB', 'mua kh?a h?c ok vinh', 0),
(10, 106, '2021-12-14 00:00:00', 21122100, 'NCB', 'mua khóa học', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `qa`
--

CREATE TABLE `qa` (
  `id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `qa`
--

INSERT INTO `qa` (`id`, `users_id`, `course_id`, `status`) VALUES
(15, 106, 1, 1),
(16, 1, 1, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rate`
--

CREATE TABLE `rate` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rate` float NOT NULL,
  `comment` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `rate`
--

INSERT INTO `rate` (`id`, `course_id`, `user_id`, `rate`, `comment`) VALUES
(1, 2, 1, 5, 'hay ok'),
(2, 2, 2, 1.5, 'hơi hay'),
(3, 2, 3, 4.5, 'ok'),
(4, 1, 2, 4, 'ok'),
(5, 1, 2, 2, 'hay hay'),
(7, 2, 1, 4.5, 'tạm ổn'),
(8, 2, 1, 3.5, 'hay'),
(10, 1, 106, 5, 'tung danh gia');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `role_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `role`
--

INSERT INTO `role` (`id`, `role_name`) VALUES
(1, 'ROLE_ADMIN'),
(2, 'ROLE_STUDENT'),
(3, 'ROLE_GIANGVIEN');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `section`
--

CREATE TABLE `section` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `section`
--

INSERT INTO `section` (`id`, `name`, `course_id`) VALUES
(5, 'chương 1', 1),
(6, 'chương 6', 1),
(8, 'chương 3', 2),
(9, 'chương 4', 2),
(10, 'chương 5 ', 2),
(11, 'chương 3', 1),
(21, 'test', 2),
(22, 'vinh test', 5),
(24, 'chương1', 5),
(25, 'chương 4', 1),
(26, 'Chapter 1', 7);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `userrole`
--

CREATE TABLE `userrole` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `userrole`
--

INSERT INTO `userrole` (`id`, `user_id`, `role_id`) VALUES
(1, 1, 1),
(3, 3, 1),
(14, 96, 1),
(18, 106, 3),
(19, 105, 2),
(20, 108, 2),
(21, 109, 2),
(22, 111, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `is_enable` bit(1) DEFAULT NULL,
  `username` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `password`, `image`, `address`, `phone`, `status`, `is_enable`, `username`, `Type`) VALUES
(1, 'pqv806@gmail.com', 'quang vinh', '$2a$10$udID77HAIbX3NrC.CeWA..WZu9A0TYUro2/xGkrZqMWXNQIqSsRO6', 'dsd', 'hà nam', '0987654323', 1, b'1', 'vinhpq', NULL),
(2, 'giangfpt@gmail.com', 'giang', '$2a$10$hhPWGGPmcjWZyOOL2akWse42rjv9pSoRDtIqDFtWli/nRxrT07QtO', 'nsns', 'hà nam', '0869324951', 1, b'1', 'vinh12', NULL),
(3, 'test@gmail.com', 'vinh', '$2a$10$Q5rgVytUBVeJ/A20xazfEurwDbhQ3B/zRxs2LB5jF9DKwwP6ptG1C', '2', 'qưe', '0987654', 1, b'0', 'vinh123', NULL),
(96, 'pbv20543@cuoly.com', 'hihi', '$2a$10$003iGhWTHFTkwqLrZL9HJutLJRwRtYBDRNmoci4i3QrMLz.BRy6q2', 'anh', 'ha noi', NULL, 1, b'1', 'pqv88', NULL),
(104, 'xcv31789@boofx.com', 'quang vinh', '123', '123', '123', '123', 1, b'1', 'okla', NULL),
(105, 'abc', 'a', '$2a$10$kmtF6q4oCdrGDYqzAvHH4eEldFv6TlmNLRcenkYXExNIIZPQKx3oy', ' ', ' ', ' ', 1, b'1', 'akkakaka', NULL),
(106, 'testtung@gmail.com', 'a', '$2a$10$VBghAZREwnK5LVH1kZrff.sq5tzuvRxf5etVB6FSpBEjyVXOop2OS', 'testtung', 'c', 'd', 1, b'1', 'testtung', NULL),
(108, 'tytung63a@gmail.com', 'Bố Tùng', '$2a$10$scucmUOhNG.X0P22xBodm.AYW536NlzZhCGedfp/6dIX6NIr4Ca2u', ' ', ' ', ' ', 1, b'1', 'tytung63a', NULL),
(109, 'cccc@cccccc', 'ccccc', '$2a$10$kAyk2sCkBhOySd3FpT3qvufo8qAxPD8peYjWodnzTV8BqJZZFQQ72', ' ', ' ', ' ', 1, b'1', 'ccc', NULL),
(111, 'tytung63a', 'tung', '$2a$10$4JWREqAorwX9wgGjbFvrCeilFfY.wuXGgWxfgphvXFqK2fGQLDxym', ' ', ' ', ' ', 1, b'1', 'tytung63', NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `author_skill`
--
ALTER TABLE `author_skill`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`);

--
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `contentqa`
--
ALTER TABLE `contentqa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `qa_id` (`qa_id`);

--
-- Chỉ mục cho bảng `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `author_id` (`author_id`),
  ADD KEY `users_id` (`users_id`);

--
-- Chỉ mục cho bảng `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `section_id` (`course_id`);

--
-- Chỉ mục cho bảng `lession`
--
ALTER TABLE `lession`
  ADD PRIMARY KEY (`id`),
  ADD KEY `section_id` (`section_id`);

--
-- Chỉ mục cho bảng `mycourse`
--
ALTER TABLE `mycourse`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Chỉ mục cho bảng `note`
--
ALTER TABLE `note`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lession_id` (`lession_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `qa`
--
ALTER TABLE `qa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_qa_users` (`users_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Chỉ mục cho bảng `rate`
--
ALTER TABLE `rate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_id` (`course_id`);

--
-- Chỉ mục cho bảng `userrole`
--
ALTER TABLE `userrole`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `UK_r43af9ap4edm43mmtq01oddj6` (`username`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `author`
--
ALTER TABLE `author`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT cho bảng `author_skill`
--
ALTER TABLE `author_skill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `contentqa`
--
ALTER TABLE `contentqa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT cho bảng `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `favorite`
--
ALTER TABLE `favorite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT cho bảng `lession`
--
ALTER TABLE `lession`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT cho bảng `mycourse`
--
ALTER TABLE `mycourse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `qa`
--
ALTER TABLE `qa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `rate`
--
ALTER TABLE `rate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `section`
--
ALTER TABLE `section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT cho bảng `userrole`
--
ALTER TABLE `userrole`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `author_skill`
--
ALTER TABLE `author_skill`
  ADD CONSTRAINT `author_skill_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`);

--
-- Các ràng buộc cho bảng `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`);

--
-- Các ràng buộc cho bảng `contentqa`
--
ALTER TABLE `contentqa`
  ADD CONSTRAINT `contentqa_ibfk_1` FOREIGN KEY (`qa_id`) REFERENCES `qa` (`id`);

--
-- Các ràng buộc cho bảng `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `course_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`),
  ADD CONSTRAINT `course_ibfk_3` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `favorite`
--
ALTER TABLE `favorite`
  ADD CONSTRAINT `favorite_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `favorite_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`);

--
-- Các ràng buộc cho bảng `lession`
--
ALTER TABLE `lession`
  ADD CONSTRAINT `lession_ibfk_1` FOREIGN KEY (`section_id`) REFERENCES `section` (`id`);

--
-- Các ràng buộc cho bảng `mycourse`
--
ALTER TABLE `mycourse`
  ADD CONSTRAINT `mycourse_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `mycourse_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`);

--
-- Các ràng buộc cho bảng `note`
--
ALTER TABLE `note`
  ADD CONSTRAINT `note_ibfk_1` FOREIGN KEY (`lession_id`) REFERENCES `lession` (`id`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `qa`
--
ALTER TABLE `qa`
  ADD CONSTRAINT `fk_qa_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `qa_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`);

--
-- Các ràng buộc cho bảng `rate`
--
ALTER TABLE `rate`
  ADD CONSTRAINT `rate_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  ADD CONSTRAINT `rate_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `section`
--
ALTER TABLE `section`
  ADD CONSTRAINT `section_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`);

--
-- Các ràng buộc cho bảng `userrole`
--
ALTER TABLE `userrole`
  ADD CONSTRAINT `userrole_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `userrole_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
