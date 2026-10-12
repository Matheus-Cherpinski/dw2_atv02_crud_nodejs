const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

const Musica = sequelize.define('Musica', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  titulo: { type: DataTypes.STRING(150), allowNull: false },
  grupoId: { type: DataTypes.INTEGER, allowNull: false },
  ano: { type: DataTypes.INTEGER, allowNull: false },
  album: { type: DataTypes.STRING(150), allowNull: false },
  tipo: { type: DataTypes.STRING(50), allowNull: false },
  imagem: { type: DataTypes.STRING(255), allowNull: true }
}, {
  tableName: 'musicas',
  timestamps: false
});

module.exports = Musica;
