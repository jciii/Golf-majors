const Years = (connection, Sequelize, Winners) => {
  return connection.define('years', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    year: { type: Sequelize.INTEGER, allowNull: false },
    course: { type: Sequelize.STRING, allowNull: false },
    score: { type: Sequelize.INTEGER, allowNull: false },
    winnerId: { type: Sequelize.INTEGER, references: { model: Winners, key: 'id' } },
  }, { paranoid: true })
}

module.exports = Years
