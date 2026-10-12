require('dotenv').config();

const express = require('express');
const path = require('path');
const { sequelize } = require('./models');

const indexRoutes = require('./routes/index');
const gruposRoutes = require('./routes/grupos');
const integrantesRoutes = require('./routes/integrantes');
const musicasRoutes = require('./routes/musicas');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes);
app.use('/grupos', gruposRoutes);
app.use('/integrantes', integrantesRoutes);
app.use('/musicas', musicasRoutes);

app.use((req, res) => {
  res.status(404).render('404', { titulo: 'Página não encontrada' });
});

async function iniciarServidor() {
  try {
    await sequelize.authenticate();
    console.log('MySQL conectado com sucesso.');

    // Cria tabelas que ainda não existirem; não apaga os registros existentes.
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`K-Wave CRUD: http://localhost:${PORT}`);
    });
  } catch (erro) {
    console.error('Erro ao iniciar:', erro.message);
    console.error('Confira o MySQL, o banco kwave e as configurações do arquivo .env.');
    process.exitCode = 1;
  }
}

iniciarServidor();
