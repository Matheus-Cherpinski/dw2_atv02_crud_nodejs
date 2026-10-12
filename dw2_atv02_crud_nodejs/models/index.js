const sequelize = require('../config/sequelize-config');
const Grupo = require('./Grupo');
const Integrante = require('./Integrante');
const Musica = require('./Musica');

Grupo.hasMany(Integrante, {
  as: 'integrantes',
  foreignKey: 'grupoId',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});
Integrante.belongsTo(Grupo, { as: 'grupo', foreignKey: 'grupoId' });

Grupo.hasMany(Musica, {
  as: 'musicas',
  foreignKey: 'grupoId',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});
Musica.belongsTo(Grupo, { as: 'grupo', foreignKey: 'grupoId' });

module.exports = { sequelize, Grupo, Integrante, Musica };
