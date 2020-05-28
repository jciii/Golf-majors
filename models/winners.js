const Winners = (connection, Sequelize) => {
  return connection.define('winners', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    nameFirst: { type: Sequelize.STRING, allowNull: false },
    nameLast: { type: Sequelize.STRING, allowNull: false },
  })
}

module.exports = Winners
