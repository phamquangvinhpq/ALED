-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 17, 2021 lúc 05:48 AM
-- Phiên bản máy phục vụ: 10.4.21-MariaDB
-- Phiên bản PHP: 7.3.31

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
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `education` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `author`
--

INSERT INTO `author` (`id`, `name`, `description`, `image`, `education`) VALUES
(115, NULL, 'pqv806@gmail.com', NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `author_skill`
--

CREATE TABLE `author_skill` (
  `id` int(11) NOT NULL,
  `skill` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `author_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `author_skill`
--

INSERT INTO `author_skill` (`id`, `skill`, `author_id`) VALUES
(115, 'okluon', 115);

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
(1, 'lập trình'),
(3, 'thiết kế');

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
(13, 'hoc java', 5673, 'http://localhost:8080/api/file/image?videoName=1639712591988.png', 'học tot', 0, 115, 115, 1, 'image/png'),
(16, '', 123, 'http://localhost:8080/api/file/image?videoName=1639714251204.png', 'mota', 1, 115, 115, 1, 'image/png'),
(17, '', 123, 'http://localhost:8080/api/file/image?videoName=1639714317433.png', 'mota', 1, 115, 115, 1, 'image/png');

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
(116);

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

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `mycourse`
--

CREATE TABLE `mycourse` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(9, 1, '2021-11-19 00:00:00', 99000000, 'NCB', 'mua kh?a h?c ok vinh', 0);

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
(26, 'chương 2', 6);

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
(21, 115, 3);

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
(115, 'pqv806@gmail.com', 'quang', '$2a$10$EyCYIXMCjkICLIuzu3wTZ.AZZARZ1y22RdVbKibGi.Nrjkmy2LluW', 'http://localhost:8080/api/file/imageuser?videoName=1639712190224.png', '', '0788025056', 1, b'1', 'vinhpq', 'image/png');

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
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT cho bảng `favorite`
--
ALTER TABLE `favorite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `lession`
--
ALTER TABLE `lession`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT cho bảng `mycourse`
--
ALTER TABLE `mycourse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `rate`
--
ALTER TABLE `rate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

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
