export default (connection, Sequelize) => connection.define('majors', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  major: {
    type: Sequelize.STRING, allowNull: false,
  },
}, { paranoid: true })
