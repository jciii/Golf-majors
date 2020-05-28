const Majors = (connection, Sequelize) => {
  return connection.define('majors', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    major: {
      type: Sequelize.STRING, allowNull: false
    }
  }, { paranoid: true })
}

module.exports = Majors
