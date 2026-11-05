CREATE TABLE funcionarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100),
    senha VARCHAR(255),
    tipo VARCHAR(20),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    nome VARCHAR(100)
);

CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    nome VARCHAR(100),
    cpf VARCHAR(14),
    telefone VARCHAR(20),
    termo_aceite BOOLEAN
);

CREATE TABLE veiculos (
    id_veiculo INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    placa VARCHAR(10),
    modelo VARCHAR(50),
    marca VARCHAR(50),
    ano INT,
    cor VARCHAR(20)
);

CREATE TABLE agendamento (
    id_agendamento INT AUTO_INCREMENT PRIMARY KEY,
    id_veiculo INT NOT NULL,
    id_usuario INT,
    data_horario DATETIME,
    status VARCHAR(20),
    observacoes VARCHAR(255)
);

-- 2. CHAVES ESTRANGEIRAS (ALTER TABLE)

-- Ligacao entre Clientes e Funcionarios/Usuarios
ALTER TABLE clientes ADD CONSTRAINT FK_clientes_funcionarios
    FOREIGN KEY (id_usuario) REFERENCES funcionarios (id_usuario);

-- Ligacao entre Veiculos e Clientes
ALTER TABLE veiculos ADD CONSTRAINT FK_veiculos_clientes
    FOREIGN KEY (id_cliente) REFERENCES clientes (id_cliente);

-- Ligacao entre Agendamento e Veiculos
ALTER TABLE agendamento ADD CONSTRAINT FK_agendamento_veiculos
    FOREIGN KEY (id_veiculo) REFERENCES veiculos (id_veiculo);

-- Ligacao entre Agendamento e Funcionarios/Usuarios (conforme seu diagrama)
ALTER TABLE agendamento ADD CONSTRAINT FK_agendamento_funcionarios
    FOREIGN KEY (id_usuario) REFERENCES funcionarios (id_usuario);

-- 3. INSERCAO DE DADOS INICIAIS (Exigencia da SAEP - Minimo 3 registros)

INSERT INTO clientes (nome, cpf, telefone, termo_aceite) VALUES
('Carlos Eduardo Silva', '111.222.333-44', '(11) 98765-4321', TRUE),
('Ana Maria Oliveira', '555.666.777-88', '(11) 91234-5678', TRUE),
('Roberto Santos', '999.888.777-66', '(11) 97777-8888', TRUE);

INSERT INTO veiculos (id_cliente, placa, modelo, marca, ano, cor) VALUES
(1, 'ABC1D23', 'Civic', 'Honda', 2020, 'Preto'),
(2, 'XYZ9K88', 'Onix', 'Chevrolet', 2022, 'Branco'),
(3, 'FGH4J55', 'Corolla', 'Toyota', 2021, 'Prata');

INSERT INTO agendamento (id_veiculo, data_horario, status, observacoes) VALUES
(1, '2026-11-10 09:00:00', 'PENDENTE', 'Troca de oleo e revisao geral'),
(2, '2026-11-10 14:00:00', 'PENDENTE', 'Alinhamento e balanceamento'),
(3, '2026-11-11 10:30:00', 'PENDENTE', 'Barulho na suspensao dianteira');