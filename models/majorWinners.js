const MajorWinners = (connection, Sequelize, Majors, Years) => {
  return connection.define('majorWinners', {
    MajorId: { type: Sequelize.INTEGER, references: { models: Majors, key: 'id' } },
    YearId: { type: Sequelize.INTEGER, references: { models: Years, key: 'id' } },
  }, { paranoid: true })
}

module.exports = MajorWinners