-- phpMyAdmin SQL Dump
-- version 4.6.6deb1+deb.cihar.com~xenial.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Czas generowania: 24 Wrz 2017, 12:49
-- Wersja serwera: 5.7.19-0ubuntu0.16.04.1
-- Wersja PHP: 7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `bookstore`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `authors`
--

CREATE TABLE `authors` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_polish_ci NOT NULL,
  `surname` varchar(50) COLLATE utf8mb4_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `authors`
--

INSERT INTO `authors` (`id`, `name`, `surname`) VALUES
(1, 'Suzanne', 'Collins'),
(2, 'J.K.', 'Rowling'),
(3, 'Harper', 'Lee'),
(4, 'Jane', 'Austen'),
(5, 'Stephenie', 'Meyer'),
(8, ' George R. R.', 'Martin');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `books`
--

CREATE TABLE `books` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(50) COLLATE utf8mb4_polish_ci NOT NULL,
  `author_id` int(10) UNSIGNED NOT NULL,
  `description` text COLLATE utf8mb4_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `books`
--

INSERT INTO `books` (`id`, `title`, `author_id`, `description`) VALUES
(2, 'Harry Potter and the Order of the Phoenix', 2, 'Harry Potter is due to start his fifth year at Hogwarts School of Witchcraft and Wizardry. His best friends Ron and Hermione have been very secretive all summer and he is desperate to get back to school and find out what has been going on. However, what Harry discovers is far more devastating than he could ever have expected...\r\n\r\nSuspense, secrets and thrilling action from the pen of J.K. Rowling ensure an electrifying adventure that is impossible to put down'),
(4, 'Pride and Prejudice', 4, '\"It is a truth universally acknowledged, that a single man in possession of a good fortune must be in want of a wife.\" So begins Pride and Prejudice, Jane Austen’s witty comedy of manners—one of the most popular novels of all time—that features splendidly civilized sparring between the proud Mr. Darcy and the prejudiced Elizabeth Bennet as they play out their spirited courtship in a series of eighteenth-century drawing-room intrigues. Renowned literary critic and historian George Saintsbury in 1894 declared it the \"most perfect, the most characteristic, the most eminently quintessential of its author’s works,\" and Eudora Welty in the twentieth century described it as \"irresistible and as nearly flawless as any fiction could be.\"\r\n--penguinrandomhouse.com'),
(5, 'Twilight', 5, 'About three things I was absolutely positive.\r\n\r\nFirst, Edward was a vampire.\r\n\r\nSecond, there was a part of him—and I didn\'t know how dominant that part might be—that thirsted for my blood.\r\n\r\nAnd third, I was unconditionally and irrevocably in love with him.\r\n\r\nIn the first book of the Twilight Saga, internationally bestselling author Stephenie Meyer introduces Bella Swan and Edward Cullen, a pair of star-crossed lovers whose forbidden relationship ripens against the backdrop of small-town suspicion and a mysterious coven of vampires. This is a love story with bite.'),
(18, 'The Hunger Games', 1, 'The Hunger Games follows 16-year-old Katniss Everdeen, a girl from District 12 who volunteers for the 74th Hunger Games in place of her younger sister Primrose Everdeen. Also selected from District 12 is Peeta Mellark. They are mentored by their district\'s only living victor, Haymitch Abernathy, who won 24 years earlier and has since led a solitary life of alcoholism.\n\nPeeta confesses his longtime secret love for Katniss in a televised interview prior to the Games. This revelation stuns Katniss, who harbors feelings for Gale Hawthorne, her friend and hunting partner. Haymitch advises her to feign feelings for Peeta in order to gain wealthy sponsors who can provide crucial supplies to the \"star-crossed lovers\" during the Games.\n\nIn the arena, Katniss allies with Rue, a young tribute from District 11 who reminds Katniss of her kid sister. When Rue is killed, Katniss places flowers around her body as an act of defiance toward the Capitol. Then the remaining tributes are alerted to a rule change that allows tributes from the same district to win as a team. Katniss finds a seriously wounded Peeta and nurses him back to health. When all of the other tributes are dead, the rule change is abruptly revoked. With neither willing to kill the other, Katniss comes up with a solution: a double suicide by eating poisonous berries. This forces the authorities to concede just in time to save their lives. During and after the Games, Katniss develops genuine feelings for Peeta and struggles to reconcile them with what she feels for Gale.\n\nHaymitch warns her that the danger is far from over. The authorities are furious at being made fools of, and the only way to try to allay their anger is to pretend that her actions were because of her love for Peeta. On the journey home, Peeta is dismayed to learn of the deception.\n\n'),
(19, 'To Kill a Mockingbird', 3, 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic.\\r\\n\\r\\nCompassionate, dramatic, and deeply moving, To Kill A Mockingbird takes readers to the roots of human behavior - to innocence and experience, kindness and cruelty, love and hatred, humor and pathos. Now with over 18 million copies in print and translated into forty languages, this regional story by a young Alabama woman claims universal appeal. Harper Lee always considered her book to be a simple love story. Today it is regarded as a masterpiece of American literature.'),
(20, 'Game of Thrones', 8, 'A Dance with Dragons'),
(21, 'A Song of Ice and Fire', 8, 'pieśń lodu i ognia');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT dla tabeli `books`
--
ALTER TABLE `books`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `book_author` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
