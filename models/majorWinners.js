export default (connection, Sequelize, Years, Majors) => connection.define('majorWinners', {
  majorId: { type: Sequelize.INTEGER, references: { models: Majors, key: 'id' } },
  yearId: { type: Sequelize.INTEGER, references: { models: Years, key: 'id' } },
}, { paranoid: true })
