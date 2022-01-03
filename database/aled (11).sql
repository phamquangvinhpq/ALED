-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
<<<<<<< HEAD:database/aled.sql
-- Thời gian đã tạo: Th12 21, 2021 lúc 04:41 PM
=======
-- Thời gian đã tạo: Th12 21, 2021 lúc 10:27 AM
>>>>>>> ffb8feabab218661cc7d4761e584de5beedbebe1:database/aled (11).sql
-- Phiên bản máy phục vụ: 10.4.22-MariaDB
-- Phiên bản PHP: 7.4.26

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
(112, 'thaygiao1', 'hoc gioi', 'https://2sao.vietnamnetjsc.vn/images/2020/10/26/16/01/thay-giao-01.jpg', 'fpt');

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
(2, 'full chí mạng', 112);

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
<<<<<<< HEAD:database/aled.sql
(1, 'lập trình'),
=======
(1, 'iphone'),
>>>>>>> ffb8feabab218661cc7d4761e584de5beedbebe1:database/aled (11).sql
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
<<<<<<< HEAD:database/aled.sql
=======

--
-- Đang đổ dữ liệu cho bảng `contentqa`
--

INSERT INTO `contentqa` (`id`, `qa_id`, `people`, `content`, `create_date`) VALUES
(31, 17, 0, 'ok em', '2021-12-21 07:30:33'),
(32, 17, 1, 'vâng', '2021-12-21 08:28:26');
>>>>>>> ffb8feabab218661cc7d4761e584de5beedbebe1:database/aled (11).sql

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `course_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `image` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(2555) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

<<<<<<< HEAD:database/aled.sql
=======
--
-- Đang đổ dữ liệu cho bảng `course`
--

INSERT INTO `course` (`id`, `course_name`, `price`, `image`, `description`, `status`, `users_id`, `author_id`, `category_id`, `type`) VALUES
(28, 'jav1', 12334, 'http://localhost:8080/api/file/image?videoName=1640061744984.png', 'fd', 0, 112, 112, 1, 'image/png');

>>>>>>> ffb8feabab218661cc7d4761e584de5beedbebe1:database/aled (11).sql
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
(114);

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
(94, 'video ', 'http://localhost:8080/api/file/video?videoName=1640070699993.mp4', 27, 'video/mp4', 0);

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
(106, 112, 28);

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

-- --------------------------------------------------------

<<<<<<< HEAD:database/aled.sql
--
-- Cấu trúc bảng cho bảng `qa`
--

CREATE TABLE `qa` (
  `id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
=======
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
(17, 112, 28, 1);
>>>>>>> ffb8feabab218661cc7d4761e584de5beedbebe1:database/aled (11).sql

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
(12, 28, 112, 5, 'ok hay');

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

<<<<<<< HEAD:database/aled.sql
=======
--
-- Đang đổ dữ liệu cho bảng `section`
--

INSERT INTO `section` (`id`, `name`, `course_id`) VALUES
(27, 'chương mot', 28);

>>>>>>> ffb8feabab218661cc7d4761e584de5beedbebe1:database/aled (11).sql
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
(23, 112, 3),
(24, 113, 2),
(29, 114, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
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
(112, 'thaygiao1@gmail.com', 'thaygiao1', '$2a$10$rJw6F9z9RxKmAoLhLqa8Wuu5UrIF.DRN5WtYSPb/fhGloJx0eYj5a', 'https://2sao.vietnamnetjsc.vn/images/2020/10/26/16/01/thay-giao-01.jpg', 'hà nam', '098765431', 1, b'1', 'giangvien', 'image'),
(113, 'student@gmail.com', 'student', '$2a$10$rJw6F9z9RxKmAoLhLqa8Wuu5UrIF.DRN5WtYSPb/fhGloJx0eYj5a', 'anh', 'hà nam', '0987654321', 1, b'1', 'student', 'image\r\n'),
(114, 'admin@gmail.com', 'admin', '$2a$10$rJw6F9z9RxKmAoLhLqa8Wuu5UrIF.DRN5WtYSPb/fhGloJx0eYj5a', 'anh', 'hà nam', '098765432', 1, b'1', 'admin', 'image'),
(119, 'tranphong804801@gmail.com', 'quang vinh hy', '$2a$10$1BHDfRIGhefpYEr8jBR1N.ife92U92SEz7nSI6GGoesor21NfP25O', ' ', ' ', ' ', 1, b'1', 'admin1111', NULL);

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
<<<<<<< HEAD:database/aled.sql
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;
=======
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;
>>>>>>> ffb8feabab218661cc7d4761e584de5beedbebe1:database/aled (11).sql

--
-- AUTO_INCREMENT cho bảng `author_skill`
--
ALTER TABLE `author_skill`
<<<<<<< HEAD:database/aled.sql
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;
=======
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
>>>>>>> ffb8feabab218661cc7d4761e584de5beedbebe1:database/aled (11).sql

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `contentqa`
--
ALTER TABLE `contentqa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT cho bảng `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT cho bảng `favorite`
--
ALTER TABLE `favorite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT cho bảng `lession`
--
ALTER TABLE `lession`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT cho bảng `mycourse`
--
ALTER TABLE `mycourse`
<<<<<<< HEAD:database/aled.sql
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;
=======
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;
>>>>>>> ffb8feabab218661cc7d4761e584de5beedbebe1:database/aled (11).sql

--
-- AUTO_INCREMENT cho bảng `note`
--
ALTER TABLE `note`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `qa`
--
ALTER TABLE `qa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT cho bảng `rate`
--
ALTER TABLE `rate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `section`
--
ALTER TABLE `section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT cho bảng `userrole`
--
ALTER TABLE `userrole`
<<<<<<< HEAD:database/aled.sql
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
=======
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
>>>>>>> ffb8feabab218661cc7d4761e584de5beedbebe1:database/aled (11).sql

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
<<<<<<< HEAD:database/aled.sql
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;
=======
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;
>>>>>>> ffb8feabab218661cc7d4761e584de5beedbebe1:database/aled (11).sql

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
