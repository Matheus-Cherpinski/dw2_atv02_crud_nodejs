
CREATE DATABASE IF NOT EXISTS kwave
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE kwave;

CREATE TABLE IF NOT EXISTS grupos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  agencia VARCHAR(100) NOT NULL,
  anoDebut INT NOT NULL,
  geracao VARCHAR(30) NOT NULL,
  tipo VARCHAR(30) NOT NULL,
  imagem VARCHAR(255) NULL
) 

CREATE TABLE IF NOT EXISTS integrantes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  grupoId INT NOT NULL,
  posicao VARCHAR(100) NOT NULL,
  nacionalidade VARCHAR(50) NOT NULL,
  anoNascimento INT NOT NULL,
  imagem VARCHAR(255) NULL,
  CONSTRAINT fk_integrante_grupo
    FOREIGN KEY (grupoId) REFERENCES grupos(id)
    ON UPDATE CASCADE ON DELETE CASCADE
) 

CREATE TABLE IF NOT EXISTS musicas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  grupoId INT NOT NULL,
  ano INT NOT NULL,
  album VARCHAR(150) NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  imagem VARCHAR(255) NULL,
  CONSTRAINT fk_musica_grupo
    FOREIGN KEY (grupoId) REFERENCES grupos(id)
    ON UPDATE CASCADE ON DELETE CASCADE
) 
INSERT INTO grupos (nome, agencia, anoDebut, geracao, tipo, imagem) VALUES
('aespa', 'SM Entertainment', 2020, '4ª geração', 'Girl Group', 'grupos/aespa.jpg'),
('ILLIT', 'BELIFT LAB', 2024, '5ª geração', 'Girl Group', 'grupos/illit.jpg'),
('CORTIS', 'BIGHIT MUSIC', 2025, '5ª geração', 'Boy Group', 'grupos/cortis.jpg'),
('BLACKPINK', 'YG Entertainment', 2016, '3ª geração', 'Girl Group', 'grupos/blackpink.jpg'),
('TWICE', 'JYP Entertainment', 2015, '3ª geração', 'Girl Group', 'grupos/twice.jpg'),
('LE SSERAFIM', 'Source Music', 2022, '4ª geração', 'Girl Group', 'grupos/le-sserafim.jpg'),
('IVE', 'Starship Entertainment', 2021, '4ª geração', 'Girl Group', 'grupos/ive.jpg'),
('BTS', 'BIGHIT MUSIC', 2013, '3ª geração', 'Boy Group', 'grupos/bts.jpg');

INSERT INTO integrantes (nome, grupoId, posicao, nacionalidade, anoNascimento, imagem) VALUES
('Karina', 1, 'Líder / Rapper / Vocalista', 'Sul-coreana', 2000, 'integrantes/karina.jpg'),
('Winter', 1, 'Vocalista / Dançarina', 'Sul-coreana', 2001, 'integrantes/winter.jpg'),
('Wonhee', 2, 'Vocalista', 'Sul-coreana', 2007, 'integrantes/wonhee.jpg'),
('Minju', 2, 'Vocalista', 'Sul-coreana', 2004, 'integrantes/minju.jpg'),
('Martin', 3, 'Vocalista / Rapper', 'Sul-coreano', 2008, 'integrantes/martin.jpg'),
('Jisoo', 4, 'Vocalista', 'Sul-coreana', 1995, 'integrantes/jisoo.jpg'),
('Nayeon', 5, 'Vocalista', 'Sul-coreana', 1995, 'integrantes/nayeon.jpg'),
('Sakura', 6, 'Vocalista', 'Japonesa', 1998, 'integrantes/sakura.jpg'),
('Wonyoung', 7, 'Vocalista', 'Sul-coreana', 2004, 'integrantes/wonyoung.jpg'),
('Jungkook', 8, 'Vocalista', 'Sul-coreano', 1997, 'integrantes/jungkook.jpg');

INSERT INTO musicas (titulo, grupoId, ano, album, tipo, imagem) VALUES
('Supernova', 1, 2024, 'Armageddon', 'Title Track', 'albuns/armageddon.jpg'),
('Magnetic', 2, 2024, 'SUPER REAL ME', 'Title Track', 'albuns/super-real-me.jpg'),
('GO!', 3, 2025, 'COLOR OUTSIDE THE LINES', 'Single', 'albuns/color-outside-the-lines.jpg'),
('DDU-DU DDU-DU', 4, 2018, 'SQUARE UP', 'Title Track', 'albuns/square-up.jpg'),
('What Is Love?', 5, 2018, 'What Is Love?', 'Title Track', 'albuns/what-is-love.jpg'),
('ANTIFRAGILE', 6, 2022, 'ANTIFRAGILE', 'Title Track', 'albuns/antifragile.jpg'),
('LOVE DIVE', 7, 2022, 'LOVE DIVE', 'Title Track', 'albuns/love-dive.jpg'),
('Dynamite', 8, 2020, 'BE', 'Single', 'albuns/dynamite.jpg');
