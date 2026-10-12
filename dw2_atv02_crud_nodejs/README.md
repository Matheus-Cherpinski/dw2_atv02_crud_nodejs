# DW2 — Atividade 02: CRUD K-Wave

Sistema CRUD para administrar grupos, integrantes e músicas usando Node.js, Express, EJS, Sequelize e MySQL. O projeto utiliza os nomes de colunas da base K-Wave da Atividade 01.

## Requisitos
- Node.js e npm instalados
- MySQL em execução (por exemplo, MySQL Server com MySQL Workbench)

## Configuração
1. Abra esta pasta no VS Code.
2. Copie `.env.example` para um arquivo chamado `.env`.
3. Edite `.env` e informe o usuário e a senha do seu MySQL. Não publique o arquivo `.env` no GitHub.
4. Se o banco `kwave` já foi criado e preenchido na Atividade 01, mantenha-o. O código chama `sequelize.sync()` sem a opção `force`, portanto não pede para apagar as tabelas.
5. Se o banco estiver vazio e precisar criar as tabelas, abra `database/crud_setup.sql` no MySQL Workbench e execute-o. Esse script usa `CREATE TABLE IF NOT EXISTS` e não contém `DROP TABLE`.
6. No terminal dentro da pasta do projeto, rode:

```bash
npm install
npm start
```

7. Abra http://localhost:3000.

## Operações disponíveis

Para cada área (`/grupos`, `/integrantes` e `/musicas`) estão disponíveis:
- **Create:** botão “Novo cadastro” e envio do formulário.
- **Read:** listagem dos registros armazenados no MySQL.
- **Update:** botão “Editar” em cada cartão.
- **Delete:** botão “Excluir” em cada cartão, com confirmação.

Nos formulários de integrantes e músicas, selecione um grupo existente. O campo de imagem é um caminho relativo para um arquivo dentro de `public/imagens/`; não é um upload de arquivo.

## Imagens

Para manter as imagens que você já usava, copie a pasta `public/imagens` do projeto anterior para este projeto. Os caminhos usados no banco são como `grupos/aespa.jpg`, `integrantes/karina.jpg` e `albuns/armageddon.jpg`.

## Enviar para o GitHub

Crie no GitHub um repositório chamado `dw2_atv02_crud_nodejs`. Depois, no terminal desta pasta, use os comandos mostrados pelo próprio GitHub para conectar o repositório remoto. Um exemplo (substitua `SEU_USUARIO` pelo usuário da sua conta):

```bash
git init
git add .
git commit -m "Implementa CRUD do catálogo K-Wave"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/dw2_atv02_crud_nodejs.git
git push -u origin main
```

Se `git init` já tiver sido executado, não precisa repetir. Confira antes de enviar se `.env` e `node_modules` não aparecem no que será publicado.
