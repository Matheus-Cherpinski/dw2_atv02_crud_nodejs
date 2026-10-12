const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

const Integrante = sequelize.define('Integrante', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  grupoId: { type: DataTypes.INTEGER, allowNull: false },
  posicao: { type: DataTypes.STRING(100), allowNull: false },
  nacionalidade: { type: DataTypes.STRING(50), allowNull: false },
  anoNascimento: { type: DataTypes.INTEGER, allowNull: false },
  imagem: { type: DataTypes.STRING(255), allowNull: true }
}, {
  tableName: 'integrantes',
  timestamps: false
});

module.exports = Integrante;
