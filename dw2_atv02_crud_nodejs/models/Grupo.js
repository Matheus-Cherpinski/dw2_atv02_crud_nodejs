const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

const Grupo = sequelize.define('Grupo', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  agencia: { type: DataTypes.STRING(100), allowNull: false },
  anoDebut: { type: DataTypes.INTEGER, allowNull: false },
  geracao: { type: DataTypes.STRING(30), allowNull: false },
  tipo: { type: DataTypes.STRING(30), allowNull: false },
  imagem: { type: DataTypes.STRING(255), allowNull: true }
}, {
  tableName: 'grupos',
  timestamps: false
});

module.exports = Grupo;
