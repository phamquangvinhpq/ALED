-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 21, 2021 lúc 07:18 AM
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
(56, 17, 0, 'Tôi là học sinh hỏi lần 1', '2021-12-20 11:22:58'),
(57, 17, 1, 'Tôi là giảng viên trả lời lần 1', '2021-12-20 11:23:29'),
(58, 18, 0, 'Học sinh mới nhắn 1', '2021-12-20 11:30:52'),
(59, 18, 1, 'Thầy giáo nhắn cho học sinh mới lần 1', '2021-12-20 11:31:24'),
(60, 18, 1, 'Thầy giáo rep tiếp lần 2', '2021-12-20 11:31:41'),
(61, 19, 0, 'Học sinh nhắn tin vào khóa học 14 (1)', '2021-12-20 11:42:42'),
(62, 19, 0, 'Học sinh nhắn tin vào khóa học 14 (2))', '2021-12-20 17:20:07'),
(63, 19, 1, 'Thầy giáo trả lời vào khóa học 14(1)', '2021-12-20 17:22:41'),
(64, 19, 1, 'Thầy giáo trả lời vào khóa học 14(2)', '2021-12-20 17:27:19'),
(65, 19, 0, 'Học sinh nhắn tin vào khóa học 14 (3)', '2021-12-20 17:27:37'),
(66, 18, 0, 'Học sinh mới nhắn course 1 lần (2)', '2021-12-20 17:35:50'),
(67, 18, 1, 'Tôi đây ạ', '2021-12-20 17:36:05'),
(68, 18, 1, 'Tôi đây ạ lần 2', '2021-12-21 02:12:04'),
(69, 17, 1, 'Tôi là giảng viên trả lời lần 2', '2021-12-21 02:12:19'),
(70, 18, 1, 'Tôi đây ạ lần 3', '2021-12-21 02:15:23'),
(71, 18, 0, 'Học sinh mới nhắn course 1 lần (3)', '2021-12-21 02:15:42'),
(72, 18, 1, 'Tôi đây ạ lần 4', '2021-12-21 02:15:51'),
(73, 18, 1, 'Tôi đây ạ lần 5', '2021-12-21 02:20:12'),
(74, 18, 0, 'Học sinh mới nhắn course 1 lần (4)', '2021-12-21 02:20:24'),
(75, 18, 1, 'Tôi đây ạ lần 6', '2021-12-21 02:20:34'),
(76, 18, 0, 'hi thầy', '2021-12-21 06:08:09'),
(77, 18, 0, 'hi thầy ơi', '2021-12-21 06:09:02'),
(78, 19, 1, 'Thầy đây nhé', '2021-12-21 06:09:17');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `contentqa`
--
ALTER TABLE `contentqa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `qa_id` (`qa_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `contentqa`
--
ALTER TABLE `contentqa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `contentqa`
--
ALTER TABLE `contentqa`
  ADD CONSTRAINT `contentqa_ibfk_1` FOREIGN KEY (`qa_id`) REFERENCES `qa` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
