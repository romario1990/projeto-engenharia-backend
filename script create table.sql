-- fase definition

CREATE TABLE fase (
	id INTEGER NOT NULL PRIMARY KEY,
	descricao INTEGER NOT NULL
);


-- frase_motivacional definition

CREATE TABLE frase_motivacional (
	id INTEGER NOT NULL PRIMARY KEY,
	descricao boolean NOT NULL
);


-- historico_fase definition

CREATE TABLE historico_fase (
	id INTEGER NOT NULL PRIMARY KEY,
	descricao TEXT NOT NULL
);


-- historico_pergunta definition

CREATE TABLE historico_pergunta (
	id INTEGER NOT NULL PRIMARY KEY,
	descricao boolean NOT NULL
);


-- historico_resposta definition

CREATE TABLE historico_resposta (
	id INTEGER NOT NULL PRIMARY KEY,
	descricao boolean NOT NULL,
	verdadeiro INTEGER NOT NULL
);


-- modulo definition

CREATE TABLE modulo (
	id INTEGER NOT NULL PRIMARY KEY,
	nome TEXT NOT NULL
);


-- nivel_dificuldade definition

CREATE TABLE nivel_dificuldade (
	id INTEGER NOT NULL PRIMARY KEY,
	descricao TEXT NOT NULL
);


-- perfil definition

CREATE TABLE perfil (
	id INTEGER NOT NULL PRIMARY KEY,
	nome TEXT NOT NULL,
	nivel_permissao INTEGER NOT NULL
);


-- pergunta definition

CREATE TABLE pergunta (
	id INTEGER NOT NULL PRIMARY KEY,
	pergunta boolean NOT NULL
);


-- resposta definition

CREATE TABLE resposta (
	id INTEGER NOT NULL PRIMARY KEY,
	descricao boolean NOT NULL,
	verdade BOOL NOT NULL
);


-- fase_pergunta definition

CREATE TABLE fase_pergunta (
	id INTEGER NOT NULL PRIMARY KEY,
	id_fase INTEGER NOT NULL,
	id_pergunta INTEGER NOT NULL,
	CONSTRAINT fase_pergunta_FK FOREIGN KEY (id_fase) REFERENCES fase(id),
	CONSTRAINT fase_pergunta_FK_1 FOREIGN KEY (id_pergunta) REFERENCES pergunta(id)
);


-- historico_fase_pergunta definition

CREATE TABLE historico_fase_pergunta (
	id INTEGER NOT NULL PRIMARY KEY,
	id_historico_fase INTEGER NOT NULL,
	id_historico_pergunta INTEGER NOT NULL,
	CONSTRAINT historico_fase_pergunta_FK FOREIGN KEY (id_historico_fase) REFERENCES historico_fase(id),
	CONSTRAINT historico_fase_pergunta_FK_1 FOREIGN KEY (id_historico_pergunta) REFERENCES historico_pergunta(id)
);


-- historico_pergunta_resposta definition

CREATE TABLE historico_pergunta_resposta (
	id INTEGER NOT NULL PRIMARY KEY,
	id_historico_pergunta INTEGER NOT NULL,
	id_historico_resposta INTEGER NOT NULL,
	CONSTRAINT historico_pergunta_resposta_FK FOREIGN KEY (id_historico_pergunta) REFERENCES historico_pergunta(id),
	CONSTRAINT historico_pergunta_resposta_FK_1 FOREIGN KEY (id_historico_resposta) REFERENCES historico_resposta(id)
);


-- perfil_modulo definition

CREATE TABLE perfil_modulo (
	id INTEGER NOT NULL PRIMARY KEY,
	id_perfil INTEGER NOT NULL,
	id_modulo INTEGER NOT NULL,
	CONSTRAINT perfil_modulo_FK FOREIGN KEY (id_perfil) REFERENCES perfil(id),
	CONSTRAINT perfil_modulo_FK_1 FOREIGN KEY (id_modulo) REFERENCES modulo(id)
);


-- pergunta_resposta definition

CREATE TABLE pergunta_resposta (
	id INTEGER NOT NULL PRIMARY KEY,
	id_pergunta INTEGER NOT NULL,
	id_resposta INTEGER NOT NULL,
	id_nivel_dificuldade INTEGER NOT NULL,
	CONSTRAINT pergunta_resposta_FK FOREIGN KEY (id_pergunta) REFERENCES pergunta(id),
	CONSTRAINT pergunta_resposta_FK_1 FOREIGN KEY (id_resposta) REFERENCES resposta(id),
	CONSTRAINT pergunta_resposta_FK_2 FOREIGN KEY (id_nivel_dificuldade) REFERENCES nivel_dificuldade(id)
);


-- pessoa definition

CREATE TABLE pessoa (
	id INTEGER NOT NULL PRIMARY KEY,
	nome TEXT NOT NULL,
	email TEXT NOT NULL,
	cpf TEXT NOT NULL,
	id_perfil INTEGER NOT NULL,
	senha TEXT NOT NULL,
	CONSTRAINT pessoa_FK FOREIGN KEY (id_perfil) REFERENCES perfil(id)
);


-- professor definition

CREATE TABLE "professor" (
	id INTEGER NOT NULL PRIMARY KEY,
	id_pessoa INTEGER NOT NULL,
	CONSTRAINT NewTable_FK FOREIGN KEY (id_pessoa) REFERENCES pessoa(id)
);


-- trilha definition

CREATE TABLE trilha (
	id INTEGER NOT NULL PRIMARY KEY,
	descricao TEXT NOT NULL,
	id_nivel_dificuldade INTEGER NOT NULL,
	CONSTRAINT trilha_FK FOREIGN KEY (id_nivel_dificuldade) REFERENCES nivel_dificuldade(id)
);


-- trilha_fase definition

CREATE TABLE trilha_fase (
	id INTEGER NOT NULL PRIMARY KEY,
	id_trilha INTEGER NOT NULL,
	id_fase INTEGER NOT NULL,
	CONSTRAINT trilha_fase_FK FOREIGN KEY (id_trilha) REFERENCES trilha(id),
	CONSTRAINT trilha_fase_FK_1 FOREIGN KEY (id_fase) REFERENCES fase(id)
);


-- aluno definition

CREATE TABLE aluno (
	id INTEGER NOT NULL PRIMARY KEY,
	matricula INTEGER NOT NULL,
	id_pessoa INTEGER NOT NULL,
	CONSTRAINT aluno_FK FOREIGN KEY (id_pessoa) REFERENCES pessoa(id)
);


-- historico_trilha definition

CREATE TABLE historico_trilha (
	id INTEGER NOT NULL PRIMARY KEY,
	descricao TEXT NOT NULL,
	id_nivel_dificuldade INTEGER NOT NULL,
	id_aluno INTEGER NOT NULL,
	CONSTRAINT historico_trilha_FK FOREIGN KEY (id_aluno) REFERENCES aluno(id),
	CONSTRAINT historico_trilha_FK_1 FOREIGN KEY (id_nivel_dificuldade) REFERENCES nivel_dificuldade(id)
);


-- historico_trilha_fase definition

CREATE TABLE historico_trilha_fase (
	id INTEGER NOT NULL PRIMARY KEY,
	id_historico_trilha INTEGER NOT NULL,
	id_historico_fase INTEGER NOT NULL,
	CONSTRAINT historico_trilha_fase_FK FOREIGN KEY (id_historico_trilha) REFERENCES historico_trilha(id),
	CONSTRAINT historico_trilha_fase_FK_1 FOREIGN KEY (id_historico_fase) REFERENCES historico_fase(id)
);


-- pontuacao definition

CREATE TABLE pontuacao (
	id INTEGER NOT NULL PRIMARY KEY,
	id_aluno INTEGER NOT NULL,
	valor INTEGER,
	CONSTRAINT pontuacao_FK FOREIGN KEY (id_aluno) REFERENCES aluno(id)
);