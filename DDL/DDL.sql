--
-- 테이블 구조 `game_character`
--

CREATE TABLE `game_character` (
  `no` int(11) UNSIGNED NOT NULL,
  `game_no` int(11) UNSIGNED NOT NULL DEFAULT 0,
  `user_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `char_name` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `char_sex` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `char_icon` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `char_dept` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `char_field` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `char_life_min` smallint(3) NOT NULL DEFAULT 0,
  `char_life_max` smallint(3) NOT NULL DEFAULT 0,
  `char_sta_min` smallint(3) NOT NULL DEFAULT 0,
  `char_sta_max` smallint(3) NOT NULL DEFAULT 0,
  `char_attack` smallint(3) NOT NULL DEFAULT 0,
  `char_defense` smallint(3) NOT NULL DEFAULT 0,
  `reg_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 테이블 구조 `game_list`
--

CREATE TABLE `game_list` (
  `no` int(11) UNSIGNED NOT NULL,
  `start_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `end_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `status` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `reg_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 테이블 구조 `game_member`
--

CREATE TABLE `game_member` (
  `no` int(11) UNSIGNED NOT NULL,
  `user_id` varchar(100) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `user_pass` varchar(255) CHARACTER SET utf8 NOT NULL,
  `user_name` varchar(30) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `user_image` varchar(255) CHARACTER SET utf8 NOT NULL,
  `user_joindate` datetime NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `game_character`
--
ALTER TABLE `game_character`
  ADD PRIMARY KEY (`no`),
  ADD UNIQUE KEY `game_no` (`game_no`,`user_id`);

--
-- 테이블의 인덱스 `game_list`
--
ALTER TABLE `game_list`
  ADD PRIMARY KEY (`no`);

--
-- 테이블의 인덱스 `game_member`
--
ALTER TABLE `game_member`
  ADD PRIMARY KEY (`no`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `user_id_2` (`user_id`,`user_pass`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `game_character`
--
ALTER TABLE `game_character`
  MODIFY `no` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- 테이블의 AUTO_INCREMENT `game_list`
--
ALTER TABLE `game_list`
  MODIFY `no` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 테이블의 AUTO_INCREMENT `game_member`
--
ALTER TABLE `game_member`
  MODIFY `no` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;